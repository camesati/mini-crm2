import Link from "next/link";
import { createLead } from "@/lib/actions";
import LeadForm from "@/components/leads/LeadForm";

export default function NewLeadPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/leads" className="text-sm text-blue-600 hover:underline">
          ← Voltar para Leads
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Novo Lead</h1>
        <p className="text-sm text-gray-500 mt-1">Preencha os dados do novo lead.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <LeadForm action={createLead} />
      </div>
    </div>
  );
}
