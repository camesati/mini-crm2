import Link from "next/link";
import { getLeads } from "@/lib/data";
import { ALL_STATUSES, STATUS_LABELS, LeadStatus } from "@/types/lead";
import { Lead } from "@/types/lead";
import LeadTable from "@/components/leads/LeadTable";
import ErrorState from "@/components/ui/ErrorState";

interface SearchParams {
  search?: string;
  status?: string;
}

export default async function LeadsPage({ searchParams }: { searchParams: SearchParams }) {
  let allLeads: Lead[];
  try {
    allLeads = await getLeads();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return (
      <div className="max-w-2xl mx-auto py-8">
        <ErrorState
          message={message}
          hint="Verifique se a tabela 'leads' existe no Supabase e se o RLS está configurado para permitir acesso anônimo."
        />
      </div>
    );
  }

  const search = searchParams.search?.toLowerCase() ?? "";
  const statusFilter = searchParams.status as LeadStatus | undefined;

  const leads = allLeads.filter((lead) => {
    const matchesSearch =
      !search ||
      lead.name.toLowerCase().includes(search) ||
      lead.email.toLowerCase().includes(search) ||
      (lead.company?.toLowerCase().includes(search) ?? false);

    const matchesStatus = !statusFilter || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-1">
            {leads.length} de {allLeads.length} lead{allLeads.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/leads/new"
          className="inline-flex items-center gap-2 bg-brand-blue text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-blue-dark transition-colors"
        >
          + Novo Lead
        </Link>
      </div>

      <form method="GET" className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Buscar por nome, e-mail ou empresa..."
          className="flex-1 min-w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
        />
        <select
          name="status"
          defaultValue={statusFilter ?? ""}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
        >
          <option value="">Todos os status</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue-dark transition-colors"
        >
          Filtrar
        </button>
        {(search || statusFilter) && (
          <Link
            href="/leads"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Limpar
          </Link>
        )}
      </form>

      <LeadTable leads={leads} />
    </div>
  );
}
