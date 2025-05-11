-- Create profiles table to store user plans
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'starter',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table profiles enable row level security;

create policy if not exists "Users can view their own profile" on profiles
  for select using (auth.uid() = id);

create policy if not exists "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

-- Create shop_data table with plan-based access
create table if not exists shop_data (
  id serial primary key,
  owner uuid references auth.users(id),
  data text,
  pro_only boolean default false
);

alter table shop_data enable row level security;

create policy if not exists "Starter users see only non-pro data" on shop_data
  for select using (
    (select plan from profiles where id = auth.uid()) = 'starter'
    and pro_only = false
  );

create policy if not exists "Pro users see all their data" on shop_data
  for select using (
    (select plan from profiles where id = auth.uid()) = 'pro'
  );

-- RPC function to return user data based on plan
create or replace function get_user_data()
returns table(id int, data text, pro_only boolean)
language sql
security definer
as $$
  select id, data, pro_only
  from shop_data
  where owner = auth.uid()
    and (
      (select plan from profiles where id = auth.uid()) = 'pro'
      or pro_only = false
    );
$$; 