import { createClient, SupabaseClient } from "@supabase/supabase-js";

function createSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error(
      "Variável de ambiente NEXT_PUBLIC_SUPABASE_URL não está definida. " +
        "Verifique o arquivo .env localmente ou as Environment Variables na Vercel."
    );
  }
  if (!key) {
    throw new Error(
      "Variável de ambiente NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida. " +
        "Verifique o arquivo .env localmente ou as Environment Variables na Vercel."
    );
  }

  return createClient(url, key);
}

export const supabase = createSupabaseClient();
