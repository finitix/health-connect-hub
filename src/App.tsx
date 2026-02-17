import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import HospitalDetailsPage from "./pages/HospitalDetailsPage";
import InsurancePage from "./pages/InsurancePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LegalPage from "./pages/LegalPage";
import HospitalRegistrationPage from "./pages/HospitalRegistrationPage";
import HospitalSignupPage from "./pages/HospitalSignupPage";
import AboutPage from "./pages/AboutPage";
import ForHospitalsPage from "./pages/ForHospitalsPage";
import NotFound from "./pages/NotFound";

import UserDashboardLayout from "./pages/dashboard/UserDashboardLayout";
import UserDashboardHome from "./pages/dashboard/UserDashboardHome";
import BookAppointmentPage from "./pages/dashboard/BookAppointmentPage";
import RecommendationsPage from "./pages/dashboard/RecommendationsPage";
import AppointmentHistoryPage from "./pages/dashboard/AppointmentHistoryPage";
import ProfilePage from "./pages/dashboard/ProfilePage";

import HospitalAdminLayout from "./pages/hospital-admin/HospitalAdminLayout";
import HospitalAdminHome from "./pages/hospital-admin/HospitalAdminHome";
import DoctorManagement from "./pages/hospital-admin/DoctorManagement";
import AppointmentManagement from "./pages/hospital-admin/AppointmentManagement";
import BookingFormBuilder from "./pages/hospital-admin/BookingFormBuilder";
import HospitalInsuranceManagement from "./pages/hospital-admin/HospitalInsuranceManagement";
import HospitalAnalytics from "./pages/hospital-admin/HospitalAnalytics";

import InsuranceAdminLayout from "./pages/insurance-admin/InsuranceAdminLayout";
import InsuranceAdminHome from "./pages/insurance-admin/InsuranceAdminHome";
import PlanManagement from "./pages/insurance-admin/PlanManagement";
import LeadsManagement from "./pages/insurance-admin/LeadsManagement";
import InsuranceAnalytics from "./pages/insurance-admin/InsuranceAnalytics";

import SuperAdminLayout from "./pages/super-admin/SuperAdminLayout";
import SuperAdminHome from "./pages/super-admin/SuperAdminHome";
import HospitalVerification from "./pages/super-admin/HospitalVerification";
import InsurancePartnerControl from "./pages/super-admin/InsurancePartnerControl";
import UserManagement from "./pages/super-admin/UserManagement";
import SecurityPanel from "./pages/super-admin/SecurityPanel";
import RevenuePanel from "./pages/super-admin/RevenuePanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/hospital/:id" element={<HospitalDetailsPage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/for-hospitals" element={<ForHospitalsPage />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/disclaimer" element={<LegalPage type="disclaimer" />} />
            <Route path="/hospital-registration" element={<HospitalRegistrationPage />} />
            <Route path="/hospital-signup" element={<HospitalSignupPage />} />

            {/* User Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboardLayout /></ProtectedRoute>}>
              <Route index element={<UserDashboardHome />} />
              <Route path="book" element={<BookAppointmentPage />} />
              <Route path="recommendations" element={<RecommendationsPage />} />
              <Route path="history" element={<AppointmentHistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Hospital Admin */}
            <Route path="/hospital-admin" element={<ProtectedRoute requiredRole="hospital_admin"><HospitalAdminLayout /></ProtectedRoute>}>
              <Route index element={<HospitalAdminHome />} />
              <Route path="doctors" element={<DoctorManagement />} />
              <Route path="appointments" element={<AppointmentManagement />} />
              <Route path="booking-form" element={<BookingFormBuilder />} />
              <Route path="insurance" element={<HospitalInsuranceManagement />} />
              <Route path="analytics" element={<HospitalAnalytics />} />
            </Route>

            {/* Insurance Admin */}
            <Route path="/insurance-admin" element={<ProtectedRoute requiredRole="insurance_admin"><InsuranceAdminLayout /></ProtectedRoute>}>
              <Route index element={<InsuranceAdminHome />} />
              <Route path="plans" element={<PlanManagement />} />
              <Route path="leads" element={<LeadsManagement />} />
              <Route path="analytics" element={<InsuranceAnalytics />} />
            </Route>

            {/* Super Admin */}
            <Route path="/super-admin" element={<ProtectedRoute requiredRole="super_admin"><SuperAdminLayout /></ProtectedRoute>}>
              <Route index element={<SuperAdminHome />} />
              <Route path="hospitals" element={<HospitalVerification />} />
              <Route path="insurance" element={<InsurancePartnerControl />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="security" element={<SecurityPanel />} />
              <Route path="revenue" element={<RevenuePanel />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
