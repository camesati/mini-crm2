import { supabase } from "@/lib/supabase";
import { Contato, ContatoStatus } from "@/types/contato";

function mapRow(row: any): Contato {
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

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRow);
}

export async function getContatoById(id: string): Promise<Contato | null> {
  const { data, error } = await supabase
    .from("contatos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return mapRow(data);
}
