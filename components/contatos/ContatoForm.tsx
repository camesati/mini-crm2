"use client";

import { useFormStatus } from "react-dom";
import { Contato, ALL_CONTATO_STATUSES, CONTATO_STATUS_LABELS, CONTATO_STATUS_COLORS } from "@/types/contato";
import Link from "next/link";

interface ContatoFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Partial<Contato>;
}

const STATUS_DOT: Record<string, string> = {
  novo: "bg-brand-blue",
  em_contato: "bg-amber-500",
  fechado: "bg-green-500",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent";

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-brand-blue text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Salvando...
        </>
      ) : isEdit ? (
        "Salvar alterações"
      ) : (
        "Adicionar lead"
      )}
    </button>
  );
}

export default function ContatoForm({ action, defaultValues = {} }: ContatoFormProps) {
  const isEdit = !!defaultValues.id;

  return (
    <form action={action} className="space-y-6">
      {/* Linha 1: Nome + Empresa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nome" required>
          <input
            name="name"
            placeholder="Ex: João Silva"
            defaultValue={defaultValues.name ?? ""}
            required
            className={inputCls}
          />
        </Field>
        <Field label="Empresa">
          <input
            name="company"
            placeholder="Ex: Acme Ltda."
            defaultValue={defaultValues.company ?? ""}
            className={inputCls}
          />
        </Field>
      </div>

      {/* Linha 2: Contato (e-mail + telefone) */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1.5">Contato</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              name="email"
              type="email"
              placeholder="email@empresa.com"
              defaultValue={defaultValues.email ?? ""}
              className={`${inputCls} pl-9`}
            />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <input
              name="phone"
              type="tel"
              placeholder="(11) 91234-5678"
              defaultValue={defaultValues.phone ?? ""}
              className={`${inputCls} pl-9`}
            />
          </div>
        </div>
      </div>

      {/* Linha 3: Cargo + Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Cargo">
          <input
            name="position"
            placeholder="Ex: Gerente Comercial"
            defaultValue={defaultValues.position ?? ""}
            className={inputCls}
          />
        </Field>
        <Field label="Status" required>
          <div className="relative">
            <select
              name="status"
              defaultValue={defaultValues.status ?? "novo"}
              required
              className={`${inputCls} appearance-none pr-8 cursor-pointer`}
            >
              {ALL_CONTATO_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {CONTATO_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          {/* Badges de referência visual */}
          <div className="flex gap-2 mt-1.5">
            {ALL_CONTATO_STATUSES.map((s) => (
              <span
                key={s}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${CONTATO_STATUS_COLORS[s]}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[s]}`} />
                {CONTATO_STATUS_LABELS[s]}
              </span>
            ))}
          </div>
        </Field>
      </div>

      {/* Notas */}
      <Field label="Notas">
        <textarea
          name="notes"
          rows={4}
          placeholder="Observações sobre o lead, histórico de conversas, próximos passos..."
          defaultValue={defaultValues.notes ?? ""}
          className={`${inputCls} resize-none`}
        />
      </Field>

      {/* Ações */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <SubmitButton isEdit={isEdit} />
        <Link
          href="/"
          className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors px-2 py-2.5"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
