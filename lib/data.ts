import { supabase } from "@/lib/supabase";
import { Lead } from "@/types/lead";

// Supabase returns snake_case columns; map to camelCase Lead type
function mapRow(row: any): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    company: row.company ?? "",
    status: row.status,
    notes: row.notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getLeads] Supabase error:", error);
    throw new Error(`Falha ao buscar leads: ${error.message}`);
  }
  return (data ?? []).map(mapRow);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[getLeadById] Supabase error:", error);
    return null;
  }
  return mapRow(data);
}
