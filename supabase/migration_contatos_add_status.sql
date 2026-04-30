-- Migration: adiciona coluna status à tabela contatos
-- Execute no SQL Editor do Supabase

alter table contatos
  add column if not exists status text not null default 'novo'
    check (status in ('novo', 'contatado', 'qualificado', 'fechado', 'perdido'));
