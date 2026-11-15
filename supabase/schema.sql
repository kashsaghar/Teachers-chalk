-- Teacher's Chalk — private video portal schema
-- Run this once in Supabase Dashboard → SQL Editor → New query → Run.

-- One row per user, extending Supabase's built-in auth.users.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'student' check (role in ('student', 'admin')),
  -- A student can see a private video if any of their tags matches that
  -- video's required_tag, e.g. "physics-o-level". Admin assigns these.
  access_tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Everyone can read only their own profile row via the anon/authenticated key.
-- All admin reads/writes on this table happen server-side with the service
-- role key, which bypasses RLS entirely, so no admin policy is needed here.
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Auto-create a profiles row whenever a new auth user is created
-- (e.g. by the admin panel via supabase.auth.admin.createUser).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Private (non-YouTube) videos, hosted on Bunny Stream.
create table if not exists public.private_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  bunny_video_id text not null,
  subject text,
  level text,
  required_tag text not null,
  created_at timestamptz not null default now()
);

alter table public.private_videos enable row level security;
-- No select policy: this table is only ever queried server-side with the
-- service role key (which bypasses RLS), after checking the student's
-- access_tags in application code. The anon/authenticated key gets nothing.
