export type UserRole = "client" | "technician" | "admin";

export type TicketStatus =
  | "open"
  | "in_progress"
  | "waiting_customer"
  | "resolved"
  | "closed";

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type TicketCategory =
  | "hardware"
  | "software"
  | "network"
  | "account_access"
  | "other";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  company: string | null;
  role: UserRole;
  created_at: string;
};

export type Ticket = {
  id: string;
  ticket_number: number;
  reference: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  created_by: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
};

export type TicketMessage = {
  id: string;
  ticket_id: string;
  author_id: string;
  body: string;
  is_internal_note: boolean;
  created_at: string;
};

export type TicketAttachment = {
  id: string;
  ticket_id: string;
  message_id: string | null;
  uploaded_by: string;
  file_path: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
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
      tickets: {
        Row: Ticket;
        Insert: Partial<Ticket> & {
          title: string;
          description: string;
          created_by: string;
        };
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
      ticket_attachments: {
        Row: TicketAttachment;
        Insert: Partial<TicketAttachment> & {
          ticket_id: string;
          uploaded_by: string;
          file_path: string;
          filename: string;
          mime_type: string;
          size_bytes: number;
        };
        Update: Partial<TicketAttachment>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
