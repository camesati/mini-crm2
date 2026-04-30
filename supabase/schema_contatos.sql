-- Tabela de contatos para o mini-crm
-- Execute este script no SQL Editor do Supabase
-- Atenção: a função update_updated_at() já deve existir (criada pelo schema_leads.sql).
-- Se rodar este script isolado, inclua também a criação da função abaixo.

-- create or replace function update_updated_at()
-- returns trigger as $$
-- begin
--   new.updated_at = now();
--   return new;
-- end;
-- $$ language plpgsql;

create table if not exists contatos (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null default '',
  phone       text        not null default '',
  company     text        not null default '',
  position    text        not null default '',
  notes       text        not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger contatos_updated_at
  before update on contatos
  for each row execute function update_updated_at();
