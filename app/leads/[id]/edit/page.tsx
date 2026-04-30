import { notFound } from "next/navigation";
import Link from "next/link";
import { getLeadById } from "@/lib/data";
import { updateLead } from "@/lib/actions";
import LeadForm from "@/components/leads/LeadForm";

interface EditLeadPageProps {
  params: { id: string };
}

export default async function EditLeadPage({ params }: EditLeadPageProps) {
  const lead = await getLeadById(params.id);
  if (!lead) notFound();

  const action = updateLead.bind(null, lead.id);

  return (
    <div>
      <div className="mb-6">
        <Link href="/leads" className="text-sm text-blue-600 hover:underline">
          ← Voltar para Leads
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar Lead</h1>
        <p className="text-sm text-gray-500 mt-1">{lead.name}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <LeadForm action={action} defaultValues={lead} />
      </div>
    </div>
  );
}
