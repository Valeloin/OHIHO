export type UserRole = "client" | "technician" | "admin";

export type ProjectStatus = "nouveau" | "en_cours" | "en_revision" | "livre";
export type InvoiceStatus = "brouillon" | "envoyee" | "payee";
export type TicketStatus = "recue" | "en_cours" | "corrigee" | "fermee";
export type TicketPriority = "basse" | "normale" | "haute" | "urgente";

export type ProjectStep = { label: string; done: boolean };

export type Project = {
  id: string;
  client_id: string;
  name: string;
  status: ProjectStatus;
  steps: ProjectStep[];
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Invoice = {
  id: string;
  client_id: string;
  project_id: string | null;
  number: string;
  description: string;
  amount_cents: number;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Ticket = {
  id: string;
  client_id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  updated_at: string;
};

export type TicketMessage = {
  id: string;
  ticket_id: string;
  author_id: string;
  body: string;
  created_at: string;
};

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

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; email: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      site_content: {
        Row: { id: string; data: unknown; updated_at: string };
        Insert: { id: string; data: unknown; updated_at?: string };
        Update: { id?: string; data?: unknown; updated_at?: string };
        Relationships: [];
      };
      projects: {
        Row: Project;
        Insert: Partial<Project> & { client_id: string; name: string };
        Update: Partial<Project>;
        Relationships: [];
      };
      invoices: {
        Row: Invoice;
        Insert: Partial<Invoice> & {
          client_id: string;
          number: string;
          description: string;
          amount_cents: number;
        };
        Update: Partial<Invoice>;
        Relationships: [];
      };
      tickets: {
        Row: Ticket;
        Insert: Partial<Ticket> & { client_id: string; subject: string };
        Update: Partial<Ticket>;
        Relationships: [];
      };
      ticket_messages: {
        Row: TicketMessage;
        Insert: Partial<TicketMessage> & {
          ticket_id: string;
          author_id: string;
          body: string;
        };
        Update: Partial<TicketMessage>;
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
      reopen_ticket_if_closed: {
        Args: { p_ticket_id: string };
        Returns: void;
      };
    };
  };
};
