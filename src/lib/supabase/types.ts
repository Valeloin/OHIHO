export type UserRole = "client" | "technician" | "admin";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  company: string | null;
  phone: string | null;
  company_size: string | null;
  need: string | null;
  signup_message: string | null;
  role: UserRole;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; email: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      update_own_profile: {
        Args: { p_full_name: string; p_company: string | null };
        Returns: void;
      };
    };
  };
};
