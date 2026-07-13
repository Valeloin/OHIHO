-- OHIHO — Migration initiale : tickets de support (type GLPI)
-- À exécuter dans Supabase : Project → SQL Editor → New query → coller ce fichier entier → Run

-- ============================================================
-- ENUMS
-- ============================================================

create type user_role as enum ('client', 'technician', 'admin');
create type ticket_status as enum ('open', 'in_progress', 'waiting_customer', 'resolved', 'closed');
create type ticket_priority as enum ('low', 'medium', 'high', 'urgent');
create type ticket_category as enum ('hardware', 'software', 'network', 'account_access', 'other');

-- ============================================================
-- TABLES
-- ============================================================

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  role user_role not null default 'client',
  created_at timestamptz not null default now()
);

create table tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number bigint generated always as identity,
  reference text generated always as ('OHIHO-' || lpad(ticket_number::text, 6, '0')) stored,
  title text not null,
  description text not null,
  status ticket_status not null default 'open',
  priority ticket_priority not null default 'medium',
  category ticket_category not null default 'other',
  created_by uuid not null references profiles(id),
  assigned_to uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references tickets(id) on delete cascade,
  author_id uuid not null references profiles(id),
  body text not null,
  is_internal_note boolean not null default false,
  created_at timestamptz not null default now()
);

create table ticket_attachments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references tickets(id) on delete cascade,
  message_id uuid references ticket_messages(id) on delete cascade,
  uploaded_by uuid not null references profiles(id),
  file_path text not null,
  filename text not null,
  mime_type text not null,
  size_bytes bigint not null,
  created_at timestamptz not null default now()
);

create index tickets_created_by_idx on tickets(created_by);
create index tickets_assigned_to_idx on tickets(assigned_to);
create index ticket_messages_ticket_id_idx on ticket_messages(ticket_id);
create index ticket_attachments_ticket_id_idx on ticket_attachments(ticket_id);

-- ============================================================
-- updated_at auto-refresh sur tickets
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tickets_set_updated_at
  before update on tickets
  for each row execute function public.set_updated_at();

-- ============================================================
-- Fonction utilitaire : rôle de l'utilisateur courant
-- (security definer pour éviter la récursion RLS sur profiles)
-- ============================================================

create or replace function public.current_role()
returns user_role
language sql
security definer
stable
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

-- ============================================================
-- Trigger : créer automatiquement un profil à l'inscription
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, company)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles enable row level security;
alter table tickets enable row level security;
alter table ticket_messages enable row level security;
alter table ticket_attachments enable row level security;

-- profiles
create policy profiles_select on profiles
  for select
  using (id = auth.uid() or public.current_role() in ('technician', 'admin'));

-- tickets
create policy tickets_select on tickets
  for select
  using (created_by = auth.uid() or public.current_role() in ('technician', 'admin'));

create policy tickets_insert on tickets
  for insert
  with check (created_by = auth.uid());

create policy tickets_update_staff on tickets
  for update
  using (public.current_role() in ('technician', 'admin'))
  with check (public.current_role() in ('technician', 'admin'));

-- ticket_messages
create policy messages_select on ticket_messages
  for select
  using (
    (
      is_internal_note = false
      and exists (
        select 1 from tickets t
        where t.id = ticket_messages.ticket_id
          and (t.created_by = auth.uid() or public.current_role() in ('technician', 'admin'))
      )
    )
    or (is_internal_note = true and public.current_role() in ('technician', 'admin'))
  );

create policy messages_insert on ticket_messages
  for insert
  with check (
    author_id = auth.uid()
    and exists (
      select 1 from tickets t
      where t.id = ticket_messages.ticket_id
        and (t.created_by = auth.uid() or public.current_role() in ('technician', 'admin'))
    )
    and (is_internal_note = false or public.current_role() in ('technician', 'admin'))
  );

-- ticket_attachments
create policy attachments_select on ticket_attachments
  for select
  using (
    exists (
      select 1 from tickets t
      where t.id = ticket_attachments.ticket_id
        and (t.created_by = auth.uid() or public.current_role() in ('technician', 'admin'))
    )
  );

create policy attachments_insert on ticket_attachments
  for insert
  with check (
    uploaded_by = auth.uid()
    and exists (
      select 1 from tickets t
      where t.id = ticket_attachments.ticket_id
        and (t.created_by = auth.uid() or public.current_role() in ('technician', 'admin'))
    )
  );

-- ============================================================
-- STORAGE : bucket privé pour les pièces jointes
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ticket-attachments',
  'ticket-attachments',
  false,
  10485760, -- 10 Mo
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf']
);

-- Le premier segment du chemin de fichier est l'id du ticket : {ticket_id}/{uuid}-{filename}
create policy storage_ticket_attachments_select on storage.objects
  for select
  using (
    bucket_id = 'ticket-attachments'
    and exists (
      select 1 from tickets t
      where t.id::text = (storage.foldername(name))[1]
        and (t.created_by = auth.uid() or public.current_role() in ('technician', 'admin'))
    )
  );

create policy storage_ticket_attachments_insert on storage.objects
  for insert
  with check (
    bucket_id = 'ticket-attachments'
    and exists (
      select 1 from tickets t
      where t.id::text = (storage.foldername(name))[1]
        and (t.created_by = auth.uid() or public.current_role() in ('technician', 'admin'))
    )
  );
