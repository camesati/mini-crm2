import Link from "next/link";
import { createContato } from "@/lib/contatos-actions";
import ContatoForm from "@/components/contatos/ContatoForm";

export default function NewContatoPage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Leads
        </Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">Novo Lead</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header do card */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-blue flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-white w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900">Novo Lead</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Preencha os campos abaixo e clique em Adicionar lead.
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="px-8 py-6">
          <ContatoForm action={createContato} />
        </div>
      </div>
    </div>
  );
}
