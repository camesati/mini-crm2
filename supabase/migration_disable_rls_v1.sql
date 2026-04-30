-- v1 sem autenticação: desabilita RLS na tabela contatos
-- Motivo: a aplicação usa anon key como única autenticação na v1.
-- Quando a v2 trouxer login via Supabase Auth, reabilitar com:
--   ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;
--   CREATE POLICY ... (definir conforme estratégia de autorização)

ALTER TABLE contatos DISABLE ROW LEVEL SECURITY;

-- Verificação — deve retornar rls_enabled = false
SELECT relname AS tabela, relrowsecurity AS rls_enabled
FROM pg_class
WHERE relname = 'contatos';
