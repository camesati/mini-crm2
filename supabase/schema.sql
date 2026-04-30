-- Tabela de leads para o mini-crm
-- Execute este script no SQL Editor do Supabase

create table if not exists leads (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null,
  phone       text        not null default '',
  company     text        not null default '',
  status      text        not null default 'novo'
                          check (status in ('novo', 'contatado', 'qualificado', 'fechado', 'perdido')),
  notes       text        not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Trigger para atualizar updated_at automaticamente
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger leads_updated_at
  before update on leads
  for each row execute function update_updated_at();

-- Row Level Security (opcional — habilite se usar autenticação)
-- alter table leads enable row level security;
