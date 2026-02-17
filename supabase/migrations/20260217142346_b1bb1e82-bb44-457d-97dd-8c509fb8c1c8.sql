
-- =============================================
-- MediConnect Healthcare Platform - Full Schema
-- =============================================

-- 1. ENUMS
CREATE TYPE public.app_role AS ENUM ('user', 'hospital_admin', 'insurance_admin', 'super_admin');
CREATE TYPE public.hospital_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'rejected', 'completed', 'cancelled');
CREATE TYPE public.form_field_type AS ENUM ('text', 'number', 'email', 'phone', 'date', 'select', 'textarea', 'checkbox');

-- 2. PROFILES TABLE
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. USER ROLES TABLE (separate from profiles per security requirements)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. HOSPITALS TABLE
CREATE TABLE public.hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  registration_number TEXT,
  hospital_type TEXT NOT NULL DEFAULT 'General Hospital',
  bed_count INTEGER DEFAULT 0,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  district TEXT,
  pincode TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  description TEXT,
  specializations TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  rating NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  status hospital_status NOT NULL DEFAULT 'pending',
  registered_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;

-- 5. HOSPITAL ADMINS LINKING TABLE
CREATE TABLE public.hospital_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(user_id, hospital_id)
);
ALTER TABLE public.hospital_admins ENABLE ROW LEVEL SECURITY;

-- 6. DOCTORS TABLE
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  qualification TEXT,
  experience_years INTEGER DEFAULT 0,
  consultation_fee NUMERIC(10,2) DEFAULT 0,
  phone TEXT,
  email TEXT,
  image_url TEXT,
  bio TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  available_days TEXT[] DEFAULT '{Monday,Tuesday,Wednesday,Thursday,Friday}',
  available_from TIME DEFAULT '09:00',
  available_to TIME DEFAULT '17:00',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- 7. CUSTOM BOOKING FORM FIELDS
CREATE TABLE public.booking_form_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  field_name TEXT NOT NULL,
  field_label TEXT NOT NULL,
  field_type form_field_type NOT NULL DEFAULT 'text',
  is_required BOOLEAN NOT NULL DEFAULT false,
  options TEXT[], -- for select fields
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.booking_form_fields ENABLE ROW LEVEL SECURITY;

-- 8. APPOINTMENTS TABLE
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME,
  assigned_time TIME, -- hospital admin assigns this
  status appointment_status NOT NULL DEFAULT 'pending',
  patient_name TEXT NOT NULL,
  patient_phone TEXT,
  patient_email TEXT,
  symptoms TEXT,
  notes TEXT,
  admin_notes TEXT,
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 9. INSURANCE PLANS TABLE
CREATE TABLE public.insurance_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'Individual',
  coverage_amount NUMERIC(12,2) DEFAULT 0,
  premium_monthly NUMERIC(10,2) DEFAULT 0,
  premium_yearly NUMERIC(10,2) DEFAULT 0,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  exclusions TEXT[] DEFAULT '{}',
  claim_process TEXT,
  waiting_period TEXT,
  network_hospitals INTEGER DEFAULT 0,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_by_type TEXT DEFAULT 'super_admin', -- 'super_admin' or 'hospital'
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.insurance_plans ENABLE ROW LEVEL SECURITY;

-- 10. HOSPITAL-INSURANCE LINKING
CREATE TABLE public.hospital_insurance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  insurance_plan_id UUID REFERENCES public.insurance_plans(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(hospital_id, insurance_plan_id)
);
ALTER TABLE public.hospital_insurance ENABLE ROW LEVEL SECURITY;

-- =============================================
-- SECURITY DEFINER FUNCTIONS
-- =============================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_hospital_admin_of(_user_id UUID, _hospital_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.hospital_admins
    WHERE user_id = _user_id AND hospital_id = _hospital_id
  )
$$;

-- =============================================
-- AUTO-CREATE PROFILE + DEFAULT ROLE ON SIGNUP
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_hospitals_updated_at BEFORE UPDATE ON public.hospitals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_insurance_plans_updated_at BEFORE UPDATE ON public.insurance_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =============================================
-- RLS POLICIES
-- =============================================

-- PROFILES
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "System inserts profiles" ON public.profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- USER ROLES
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Super admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins can manage roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- HOSPITALS
CREATE POLICY "Public can view approved hospitals" ON public.hospitals FOR SELECT USING (status = 'approved');
CREATE POLICY "Super admins can view all hospitals" ON public.hospitals FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Hospital admins can view own hospital" ON public.hospitals FOR SELECT TO authenticated USING (public.is_hospital_admin_of(auth.uid(), id));
CREATE POLICY "Authenticated users can register hospitals" ON public.hospitals FOR INSERT TO authenticated WITH CHECK (registered_by = auth.uid());
CREATE POLICY "Super admins can update hospitals" ON public.hospitals FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Hospital admins can update own hospital" ON public.hospitals FOR UPDATE TO authenticated USING (public.is_hospital_admin_of(auth.uid(), id));

-- HOSPITAL ADMINS
CREATE POLICY "Hospital admins can view own links" ON public.hospital_admins FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Super admins can manage hospital admins" ON public.hospital_admins FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- DOCTORS
CREATE POLICY "Public can view doctors of approved hospitals" ON public.doctors FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.hospitals WHERE id = hospital_id AND status = 'approved')
);
CREATE POLICY "Hospital admins can manage own doctors" ON public.doctors FOR ALL TO authenticated USING (public.is_hospital_admin_of(auth.uid(), hospital_id));
CREATE POLICY "Super admins can manage all doctors" ON public.doctors FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- BOOKING FORM FIELDS
CREATE POLICY "Public can view form fields of approved hospitals" ON public.booking_form_fields FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.hospitals WHERE id = hospital_id AND status = 'approved')
);
CREATE POLICY "Hospital admins can manage own form fields" ON public.booking_form_fields FOR ALL TO authenticated USING (public.is_hospital_admin_of(auth.uid(), hospital_id));
CREATE POLICY "Super admins can manage all form fields" ON public.booking_form_fields FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- APPOINTMENTS
CREATE POLICY "Users can view own appointments" ON public.appointments FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Hospital admins can view hospital appointments" ON public.appointments FOR SELECT TO authenticated USING (public.is_hospital_admin_of(auth.uid(), hospital_id));
CREATE POLICY "Super admins can view all appointments" ON public.appointments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Users can create appointments" ON public.appointments FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own appointments" ON public.appointments FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Hospital admins can update hospital appointments" ON public.appointments FOR UPDATE TO authenticated USING (public.is_hospital_admin_of(auth.uid(), hospital_id));

-- INSURANCE PLANS
CREATE POLICY "Public can view approved plans" ON public.insurance_plans FOR SELECT USING (is_approved = true);
CREATE POLICY "Super admins can manage all plans" ON public.insurance_plans FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Authenticated can upload plans" ON public.insurance_plans FOR INSERT TO authenticated WITH CHECK (uploaded_by = auth.uid());
CREATE POLICY "Uploaders can view own plans" ON public.insurance_plans FOR SELECT TO authenticated USING (uploaded_by = auth.uid());

-- HOSPITAL INSURANCE
CREATE POLICY "Public can view hospital insurance links" ON public.hospital_insurance FOR SELECT USING (true);
CREATE POLICY "Super admins can manage hospital insurance" ON public.hospital_insurance FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Hospital admins can manage own hospital insurance" ON public.hospital_insurance FOR ALL TO authenticated USING (public.is_hospital_admin_of(auth.uid(), hospital_id));
