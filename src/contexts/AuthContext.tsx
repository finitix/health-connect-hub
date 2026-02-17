import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type AppRole = "user" | "hospital_admin" | "insurance_admin" | "super_admin";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  roles: AppRole[];
  profile: { id: string; full_name: string; phone: string | null; avatar_url: string | null } | null;
  hospitalId: string | null; // for hospital admins
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [profile, setProfile] = useState<AuthContextType["profile"]>(null);
  const [hospitalId, setHospitalId] = useState<string | null>(null);

  const fetchUserData = async (userId: string) => {
    // Fetch roles
    const { data: rolesData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const userRoles = (rolesData?.map((r: any) => r.role) || ["user"]) as AppRole[];
    setRoles(userRoles);

    // Fetch profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, full_name, phone, avatar_url")
      .eq("user_id", userId)
      .single();
    setProfile(profileData);

    // Fetch hospital admin link
    if (userRoles.includes("hospital_admin")) {
      const { data: adminData } = await supabase
        .from("hospital_admins")
        .select("hospital_id")
        .eq("user_id", userId)
        .limit(1)
        .single();
      setHospitalId(adminData?.hospital_id || null);
    } else {
      setHospitalId(null);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => fetchUserData(session.user.id), 0);
        } else {
          setRoles([]);
          setProfile(null);
          setHospitalId(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRoles([]);
    setProfile(null);
    setHospitalId(null);
  };

  const refreshRoles = async () => {
    if (user) await fetchUserData(user.id);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, roles, profile, hospitalId, signOut, refreshRoles }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
