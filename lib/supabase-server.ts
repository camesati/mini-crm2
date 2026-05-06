// Cliente com service_role key — usar APENAS em Server Actions.
// Nunca importar em Client Components: a chave não tem prefixo NEXT_PUBLIC_ por segurança.
// Inicialização lazy: o cliente só é criado na primeira chamada, não no carregamento do módulo.
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL não definida. Verifique .env.local e as Environment Variables na Vercel."
    );
  }
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY não definida. Adicione ao .env.local (nunca ao NEXT_PUBLIC_) e à Vercel."
    );
  }

  _client = createClient(url, key);
  return _client;
}
