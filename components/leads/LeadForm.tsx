"use client";

import { useFormStatus } from "react-dom";
import { Lead, ALL_STATUSES, STATUS_LABELS } from "@/types/lead";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface LeadFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Partial<Lead>;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : label}
    </Button>
  );
}

export default function LeadForm({ action, defaultValues = {} }: LeadFormProps) {
  return (
    <form action={action} className="space-y-5 max-w-lg">
      <Input
        id="name"
        name="name"
        label="Nome *"
        placeholder="João Silva"
        defaultValue={defaultValues.name ?? ""}
        required
      />
      <Input
        id="email"
        name="email"
        type="email"
        label="E-mail *"
        placeholder="joao@empresa.com"
        defaultValue={defaultValues.email ?? ""}
        required
      />
      <Input
        id="phone"
        name="phone"
        label="Telefone"
        placeholder="(11) 91234-5678"
        defaultValue={defaultValues.phone ?? ""}
      />
      <Input
        id="company"
        name="company"
        label="Empresa"
        placeholder="Empresa Ltda."
        defaultValue={defaultValues.company ?? ""}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-medium text-gray-700">
          Status *
        </label>
        <select
          id="status"
          name="status"
          defaultValue={defaultValues.status ?? "novo"}
          required
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-sm font-medium text-gray-700">
          Observações
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Informações adicionais sobre o lead..."
          defaultValue={defaultValues.notes ?? ""}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={defaultValues.id ? "Salvar alterações" : "Criar lead"} />
        <Link href="/leads">
          <Button variant="secondary" type="button">
            Cancelar
          </Button>
        </Link>
      </div>
    </form>
  );
}
