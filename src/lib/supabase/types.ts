export type UserRole = "client" | "technician" | "admin";

export type QuoteProjectType =
  | "landing"
  | "intermediaire"
  | "refonte"
  | "application";

export type QuoteStatus = "received" | "in_review" | "quoted" | "closed";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  phone: string | null;
  address: string | null;
  company_size: string | null;
  need: string | null;
  signup_message: string | null;
  role: UserRole;
  created_at: string;
};

export type QuoteRequest = {
  id: string;
  request_number: number;
  reference: string;
  created_by: string;
  project_type: QuoteProjectType;
  company: string | null;
  budget_range: string | null;
  timeline: string | null;
  description: string;
  options: string[];
  status: QuoteStatus;
  created_at: string;
  updated_at: string;
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
      quote_requests: {
        Row: QuoteRequest;
        Insert: {
          created_by: string;
          project_type: QuoteProjectType;
          description: string;
          company?: string | null;
          budget_range?: string | null;
          timeline?: string | null;
          options?: string[];
          status?: QuoteStatus;
        };
        Update: Partial<QuoteRequest>;
        Relationships: [];
      };
      site_content: {
        Row: { id: string; data: unknown; updated_at: string };
        Insert: { id: string; data: unknown; updated_at?: string };
        Update: { id?: string; data?: unknown; updated_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      update_own_profile: {
        Args: {
          p_first_name: string;
          p_last_name: string | null;
          p_phone: string | null;
          p_address: string | null;
          p_company: string | null;
        };
        Returns: void;
      };
    };
  };
};
