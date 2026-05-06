-- v2: habilita RLS em contatos com política de leitura pública
-- Contexto: escritas passam a exigir service_role key, usada exclusivamente
-- nas Server Actions do Next.js (nunca exposta ao browser).
-- A anon key (pública) fica limitada a SELECT.

ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leitura publica"
  ON contatos
  FOR SELECT
  USING (true);

-- Verificação — deve retornar rls_enabled = true
SELECT relname AS tabela, relrowsecurity AS rls_enabled
FROM pg_class
WHERE relname = 'contatos';
