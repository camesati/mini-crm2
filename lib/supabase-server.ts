// Cliente com service_role key — usar APENAS em Server Components e Server Actions.
// Nunca importar em Client Components: a chave não tem prefixo NEXT_PUBLIC_ por segurança.
import { createClient, SupabaseClient } from "@supabase/supabase-js";

function createServerClient(): SupabaseClient {
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

  return createClient(url, key);
}

export const supabaseServer = createServerClient();
