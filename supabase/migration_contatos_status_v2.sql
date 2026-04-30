-- Migration: simplifica status de contatos para novo / em_contato / fechado
-- Execute no SQL Editor do Supabase

-- 1. Remove constraint antiga
ALTER TABLE contatos DROP CONSTRAINT IF EXISTS contatos_status_check;

-- 2. Converte valores antigos que não existem mais
UPDATE contatos SET status = 'em_contato' WHERE status IN ('contatado', 'qualificado');
UPDATE contatos SET status = 'fechado'    WHERE status = 'perdido';

-- 3. Adiciona nova constraint
ALTER TABLE contatos
  ADD CONSTRAINT contatos_status_check
  CHECK (status IN ('novo', 'em_contato', 'fechado'));

-- 4. Garante o default correto
ALTER TABLE contatos ALTER COLUMN status SET DEFAULT 'novo';
