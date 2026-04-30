"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { LeadStatus, ALL_STATUSES } from "@/types/lead";

function parseFormData(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const company = (formData.get("company") as string)?.trim() ?? "";
  const status = (formData.get("status") as string)?.trim() as LeadStatus;
  const notes = (formData.get("notes") as string)?.trim() ?? "";
  return { name, email, phone, company, status, notes };
}

function validate(fields: ReturnType<typeof parseFormData>): string | null {
  if (!fields.name) return "Nome é obrigatório.";
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    return "E-mail inválido.";
  if (!fields.status || !ALL_STATUSES.includes(fields.status))
    return "Status inválido.";
  return null;
}

export async function createLead(formData: FormData) {
  const fields = parseFormData(formData);
  const error = validate(fields);
  if (error) throw new Error(error);

  const { error: dbError } = await supabase.from("leads").insert({
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    company: fields.company,
    status: fields.status,
    notes: fields.notes,
  });

  if (dbError) throw new Error(dbError.message);

  revalidatePath("/leads");
  revalidatePath("/");
  redirect("/leads");
}

export async function updateLead(id: string, formData: FormData) {
  const fields = parseFormData(formData);
  const error = validate(fields);
  if (error) throw new Error(error);

  const { error: dbError } = await supabase
    .from("leads")
    .update({
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      company: fields.company,
      status: fields.status,
      notes: fields.notes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (dbError) throw new Error(dbError.message);

  revalidatePath("/leads");
  revalidatePath("/");
  redirect("/leads");
}

export async function deleteLead(id: string) {
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/leads");
  revalidatePath("/");
}
