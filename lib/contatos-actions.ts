"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { ALL_CONTATO_STATUSES, ContatoStatus } from "@/types/contato";

function parseFormData(formData: FormData) {
  return {
    name: (formData.get("name") as string)?.trim(),
    email: (formData.get("email") as string)?.trim() ?? "",
    phone: (formData.get("phone") as string)?.trim() ?? "",
    company: (formData.get("company") as string)?.trim() ?? "",
    position: (formData.get("position") as string)?.trim() ?? "",
    status: ((formData.get("status") as string)?.trim() ?? "novo") as ContatoStatus,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  };
}

function validate(fields: ReturnType<typeof parseFormData>): string | null {
  if (!fields.name) return "Nome é obrigatório.";
  if (!ALL_CONTATO_STATUSES.includes(fields.status)) return "Status inválido.";
  return null;
}

export async function createContato(formData: FormData) {
  const fields = parseFormData(formData);
  const error = validate(fields);
  if (error) throw new Error(error);

  const { error: dbError } = await supabase.from("contatos").insert(fields);
  if (dbError) throw new Error(dbError.message);

  revalidatePath("/");
  redirect("/?success=contato_criado");
}

export async function updateContato(id: string, formData: FormData) {
  const fields = parseFormData(formData);
  const error = validate(fields);
  if (error) throw new Error(error);

  const { error: dbError } = await supabase
    .from("contatos")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (dbError) throw new Error(dbError.message);

  revalidatePath("/");
  redirect("/?success=contato_atualizado");
}

export async function deleteContato(id: string) {
  const { error } = await supabase.from("contatos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
}
