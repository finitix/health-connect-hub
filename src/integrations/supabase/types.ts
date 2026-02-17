export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          admin_notes: string | null
          appointment_date: string
          appointment_time: string | null
          assigned_time: string | null
          created_at: string
          custom_fields: Json | null
          doctor_id: string | null
          hospital_id: string
          id: string
          notes: string | null
          patient_email: string | null
          patient_name: string
          patient_phone: string | null
          status: Database["public"]["Enums"]["appointment_status"]
          symptoms: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          appointment_date: string
          appointment_time?: string | null
          assigned_time?: string | null
          created_at?: string
          custom_fields?: Json | null
          doctor_id?: string | null
          hospital_id: string
          id?: string
          notes?: string | null
          patient_email?: string | null
          patient_name: string
          patient_phone?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          symptoms?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          appointment_date?: string
          appointment_time?: string | null
          assigned_time?: string | null
          created_at?: string
          custom_fields?: Json | null
          doctor_id?: string | null
          hospital_id?: string
          id?: string
          notes?: string | null
          patient_email?: string | null
          patient_name?: string
          patient_phone?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          symptoms?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_form_fields: {
        Row: {
          created_at: string
          field_label: string
          field_name: string
          field_type: Database["public"]["Enums"]["form_field_type"]
          hospital_id: string
          id: string
          is_required: boolean
          options: string[] | null
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          field_label: string
          field_name: string
          field_type?: Database["public"]["Enums"]["form_field_type"]
          hospital_id: string
          id?: string
          is_required?: boolean
          options?: string[] | null
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          field_label?: string
          field_name?: string
          field_type?: Database["public"]["Enums"]["form_field_type"]
          hospital_id?: string
          id?: string
          is_required?: boolean
          options?: string[] | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_form_fields_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          available_days: string[] | null
          available_from: string | null
          available_to: string | null
          bio: string | null
          consultation_fee: number | null
          created_at: string
          email: string | null
          experience_years: number | null
          hospital_id: string
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          phone: string | null
          qualification: string | null
          specialization: string
          updated_at: string
        }
        Insert: {
          available_days?: string[] | null
          available_from?: string | null
          available_to?: string | null
          bio?: string | null
          consultation_fee?: number | null
          created_at?: string
          email?: string | null
          experience_years?: number | null
          hospital_id: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          phone?: string | null
          qualification?: string | null
          specialization: string
          updated_at?: string
        }
        Update: {
          available_days?: string[] | null
          available_from?: string | null
          available_to?: string | null
          bio?: string | null
          consultation_fee?: number | null
          created_at?: string
          email?: string | null
          experience_years?: number | null
          hospital_id?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          phone?: string | null
          qualification?: string | null
          specialization?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctors_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_admins: {
        Row: {
          hospital_id: string
          id: string
          user_id: string
        }
        Insert: {
          hospital_id: string
          id?: string
          user_id: string
        }
        Update: {
          hospital_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_admins_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_insurance: {
        Row: {
          hospital_id: string
          id: string
          insurance_plan_id: string
        }
        Insert: {
          hospital_id: string
          id?: string
          insurance_plan_id: string
        }
        Update: {
          hospital_id?: string
          id?: string
          insurance_plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_insurance_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospital_insurance_insurance_plan_id_fkey"
            columns: ["insurance_plan_id"]
            isOneToOne: false
            referencedRelation: "insurance_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string
          amenities: string[] | null
          approved_at: string | null
          approved_by: string | null
          bed_count: number | null
          city: string
          created_at: string
          description: string | null
          district: string | null
          email: string
          gallery_urls: string[] | null
          hospital_type: string
          id: string
          image_url: string | null
          name: string
          phone: string
          pincode: string | null
          rating: number | null
          registered_by: string | null
          registration_number: string | null
          rejection_reason: string | null
          review_count: number | null
          specializations: string[] | null
          state: string
          status: Database["public"]["Enums"]["hospital_status"]
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          amenities?: string[] | null
          approved_at?: string | null
          approved_by?: string | null
          bed_count?: number | null
          city: string
          created_at?: string
          description?: string | null
          district?: string | null
          email: string
          gallery_urls?: string[] | null
          hospital_type?: string
          id?: string
          image_url?: string | null
          name: string
          phone: string
          pincode?: string | null
          rating?: number | null
          registered_by?: string | null
          registration_number?: string | null
          rejection_reason?: string | null
          review_count?: number | null
          specializations?: string[] | null
          state: string
          status?: Database["public"]["Enums"]["hospital_status"]
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          amenities?: string[] | null
          approved_at?: string | null
          approved_by?: string | null
          bed_count?: number | null
          city?: string
          created_at?: string
          description?: string | null
          district?: string | null
          email?: string
          gallery_urls?: string[] | null
          hospital_type?: string
          id?: string
          image_url?: string | null
          name?: string
          phone?: string
          pincode?: string | null
          rating?: number | null
          registered_by?: string | null
          registration_number?: string | null
          rejection_reason?: string | null
          review_count?: number | null
          specializations?: string[] | null
          state?: string
          status?: Database["public"]["Enums"]["hospital_status"]
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      insurance_plans: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          claim_process: string | null
          coverage_amount: number | null
          created_at: string
          description: string | null
          exclusions: string[] | null
          features: string[] | null
          id: string
          is_approved: boolean
          name: string
          network_hospitals: number | null
          plan_type: string
          premium_monthly: number | null
          premium_yearly: number | null
          provider_name: string
          updated_at: string
          uploaded_by: string | null
          uploaded_by_type: string | null
          waiting_period: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          claim_process?: string | null
          coverage_amount?: number | null
          created_at?: string
          description?: string | null
          exclusions?: string[] | null
          features?: string[] | null
          id?: string
          is_approved?: boolean
          name: string
          network_hospitals?: number | null
          plan_type?: string
          premium_monthly?: number | null
          premium_yearly?: number | null
          provider_name: string
          updated_at?: string
          uploaded_by?: string | null
          uploaded_by_type?: string | null
          waiting_period?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          claim_process?: string | null
          coverage_amount?: number | null
          created_at?: string
          description?: string | null
          exclusions?: string[] | null
          features?: string[] | null
          id?: string
          is_approved?: boolean
          name?: string
          network_hospitals?: number | null
          plan_type?: string
          premium_monthly?: number | null
          premium_yearly?: number | null
          provider_name?: string
          updated_at?: string
          uploaded_by?: string | null
          uploaded_by_type?: string | null
          waiting_period?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_hospital_admin_of: {
        Args: { _hospital_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "hospital_admin" | "insurance_admin" | "super_admin"
      appointment_status:
        | "pending"
        | "confirmed"
        | "rejected"
        | "completed"
        | "cancelled"
      form_field_type:
        | "text"
        | "number"
        | "email"
        | "phone"
        | "date"
        | "select"
        | "textarea"
        | "checkbox"
      hospital_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "hospital_admin", "insurance_admin", "super_admin"],
      appointment_status: [
        "pending",
        "confirmed",
        "rejected",
        "completed",
        "cancelled",
      ],
      form_field_type: [
        "text",
        "number",
        "email",
        "phone",
        "date",
        "select",
        "textarea",
        "checkbox",
      ],
      hospital_status: ["pending", "approved", "rejected"],
    },
  },
} as const
