begin;
create extension if not exists btree_gist;
create table public.administrators(user_id uuid primary key references auth.users(id) on delete cascade);
create function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from administrators where user_id=auth.uid()) $$;
create table public.professionals(id uuid primary key default gen_random_uuid(),name text not null,active boolean not null default true);
create table public.services(id text primary key,name text not null,duration integer not null check(duration between 15 and 240),price numeric not null check(price>=0),active boolean not null default true);
create table public.working_hours(id uuid primary key default gen_random_uuid(),professional_id uuid not null references professionals(id),weekday int not null check(weekday between 0 and 6),opens time not null,closes time not null,check(closes>opens),unique(professional_id,weekday));
create table public.blocked_periods(id uuid primary key default gen_random_uuid(),professional_id uuid not null references professionals(id),period tstzrange not null);
create table public.appointments(id uuid primary key default gen_random_uuid(),professional_id uuid not null references professionals(id),service_id text not null references services(id),customer_name text not null,customer_email text not null,customer_phone text not null,starts_at timestamptz not null,ends_at timestamptz not null,price numeric not null,status text not null default 'confirmed' check(status in ('confirmed','cancelled')),created_at timestamptz not null default now(),check(ends_at>starts_at),exclude using gist(professional_id with =,tstzrange(starts_at,ends_at,'[)') with &&) where(status='confirmed'));
create index appointments_email_created on appointments(customer_email,created_at);
alter table administrators enable row level security;
alter table professionals enable row level security;
alter table services enable row level security;
alter table working_hours enable row level security;
alter table blocked_periods enable row level security;
alter table appointments enable row level security;
create policy own_admin on administrators for select to authenticated using(user_id=auth.uid());
create policy public_professionals on professionals for select using(active or is_admin());
create policy public_services on services for select using(active or is_admin());
create policy manage_professionals on professionals for all to authenticated using(is_admin()) with check(is_admin());
create policy manage_services on services for all to authenticated using(is_admin()) with check(is_admin());
create policy manage_hours on working_hours for all to authenticated using(is_admin()) with check(is_admin());
create policy manage_blocks on blocked_periods for all to authenticated using(is_admin()) with check(is_admin());
create policy manage_appointments on appointments for all to authenticated using(is_admin()) with check(is_admin());
create function public.available_slots(p_professional uuid,p_date date,p_service text) returns table(slot timestamptz) language sql stable security definer set search_path=public as $$
 select t from working_hours w join professionals p on p.id=w.professional_id and p.active join services s on s.id=p_service and s.active cross join lateral generate_series((p_date+w.opens) at time zone 'America/Sao_Paulo', ((p_date+w.closes) at time zone 'America/Sao_Paulo')-make_interval(mins=>s.duration),interval '15 minutes') t
 where w.professional_id=p_professional and w.weekday=extract(dow from p_date) and t>now()+interval '1 hour' and t<now()+interval '90 days'
 and not exists(select 1 from appointments a where a.professional_id=p_professional and a.status='confirmed' and tstzrange(a.starts_at,a.ends_at,'[)') && tstzrange(t,t+make_interval(mins=>s.duration+15),'[)'))
 and not exists(select 1 from blocked_periods b where b.professional_id=p_professional and b.period && tstzrange(t,t+make_interval(mins=>s.duration+15),'[)')) order by t;
$$;
create function public.reserve_appointment(p_service text,p_professional uuid,p_start timestamptz,p_name text,p_email text,p_phone text) returns uuid language plpgsql security definer set search_path=public as $$
declare v_service services; v_id uuid;
begin
 if length(trim(p_name)) not between 3 and 120 or length(p_email)>254 or p_email !~ '^[^@ ]+@[^@ ]+\.[^@ ]+$' or p_phone !~ '^[+0-9 ()-]{10,22}$' then raise exception 'Invalid data'; end if;
 perform pg_advisory_xact_lock(hashtext(p_professional::text));
 if (select count(*) from appointments where customer_email=lower(trim(p_email)) and created_at>now()-interval '1 hour')>=3 then raise exception 'Rate limit'; end if;
 if not exists(select 1 from available_slots(p_professional,(p_start at time zone 'America/Sao_Paulo')::date,p_service) where slot=p_start) then raise exception 'Unavailable slot'; end if;
 select * into strict v_service from services where id=p_service and active;
 insert into appointments(professional_id,service_id,customer_name,customer_email,customer_phone,starts_at,ends_at,price) values(p_professional,p_service,trim(p_name),lower(trim(p_email)),p_phone,p_start,p_start+make_interval(mins=>v_service.duration+15),v_service.price) returning id into v_id;
 return v_id;
end $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon,authenticated;
revoke all on function public.available_slots(uuid,date,text) from public;
grant execute on function public.available_slots(uuid,date,text) to anon,authenticated;
revoke all on function public.reserve_appointment(text,uuid,timestamptz,text,text,text) from public;
grant execute on function public.reserve_appointment(text,uuid,timestamptz,text,text,text) to anon,authenticated;
insert into services(id,name,duration,price) values ('corte','Corte de assinatura',45,90),('degrade','Degradê',45,90),('barba','Barba tradicional',30,65),('premium','Barba premium',45,85),('combo','Corte & barba',75,145),('sobrancelha','Sobrancelha',15,25),('pigmentacao','Pigmentação',45,80),('tratamento','Tratamento capilar',30,70);
commit;
