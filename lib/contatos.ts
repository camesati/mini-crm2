import { supabase } from "@/lib/supabase";
import { Contato, ContatoStatus } from "@/types/contato";

interface RawContatoRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  position: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

function mapRow(row: RawContatoRow): Contato {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? "",
    phone: row.phone ?? "",
    company: row.company ?? "",
    position: row.position ?? "",
    status: (row.status ?? "novo") as ContatoStatus,
    notes: row.notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getContatos(): Promise<Contato[]> {
  const { data, error } = await supabase
    .from("contatos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getContatos] Supabase error:", error);
    throw new Error(`Falha ao buscar contatos: ${error.message}`);
  }
  return (data ?? []).map(mapRow);
}

export async function getContatoById(id: string): Promise<Contato | null> {
  const { data, error } = await supabase
    .from("contatos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[getContatoById] Supabase error:", error);
    return null;
  }
  return mapRow(data);
}
