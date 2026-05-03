import Link from "next/link";
import { getContatos } from "@/lib/contatos";
import { deleteContato } from "@/lib/contatos-actions";
import {
  Contato,
  ContatoStatus,
  ALL_CONTATO_STATUSES,
  CONTATO_STATUS_LABELS,
  CONTATO_STATUS_COLORS,
} from "@/types/contato";
import ErrorState from "@/components/ui/ErrorState";

interface SearchParams {
  search?: string;
  status?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-brand-blue",
  "bg-brand-pink",
  "bg-violet-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-indigo-500",
];

function avatarColor(id: string) {
  const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function StatusPill({
  status,
  active,
  count,
}: {
  status: ContatoStatus | "todos";
  active: boolean;
  count: number;
}) {
  const label = status === "todos" ? "Todos" : CONTATO_STATUS_LABELS[status];
  const href = status === "todos" ? "/" : `/?status=${status}`;

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
        active
          ? "bg-brand-blue text-white"
          : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
      }`}
    >
      {label}
      <span
        className={`inline-flex items-center justify-center rounded-full text-[10px] font-bold w-4 h-4 ${
          active ? "bg-white text-gray-900" : "bg-gray-100 text-gray-600"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}

function StatusBadge({ status }: { status: ContatoStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CONTATO_STATUS_COLORS[status]}`}
    >
      {CONTATO_STATUS_LABELS[status]}
    </span>
  );
}

function LeadRow({ c }: { c: Contato }) {
  const deleteAction = deleteContato.bind(null, c.id);

  return (
    <tr className="group hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColor(c.id)}`}
          >
            {initials(c.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
            {c.position && (
              <p className="text-xs text-gray-400 truncate">{c.position}</p>
            )}
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm text-gray-700 truncate max-w-[160px]">
          {c.company || <span className="text-gray-300">—</span>}
        </p>
      </td>

      <td className="px-6 py-4">
        <div className="space-y-1">
          {c.email ? (
            <a
              href={`mailto:${c.email}`}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-brand-pink transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate max-w-[160px]">{c.email}</span>
            </a>
          ) : null}
          {c.phone ? (
            <a
              href={`tel:${c.phone}`}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-brand-pink transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{c.phone}</span>
            </a>
          ) : null}
          {!c.email && !c.phone && (
            <span className="text-xs text-gray-300">—</span>
          )}
        </div>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={c.status} />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/contatos/${c.id}/edit`}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Editar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>
          <form action={deleteAction}>
            <button
              type="submit"
              className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Excluir"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  let allContatos: Contato[];
  try {
    allContatos = await getContatos();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return (
      <div className="max-w-2xl mx-auto py-8">
        <ErrorState
          message={message}
          hint="Verifique se a tabela 'contatos' existe no Supabase, se o RLS está desabilitado (ou tem políticas para anon), e se as variáveis NEXT_PUBLIC_SUPABASE_URL/ANON_KEY estão configuradas corretamente."
        />
      </div>
    );
  }

  const search = searchParams.search?.toLowerCase() ?? "";
  const statusFilter = searchParams.status as ContatoStatus | undefined;

  const filtered = allContatos.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search) ||
      c.email.toLowerCase().includes(search) ||
      c.company.toLowerCase().includes(search) ||
      c.position.toLowerCase().includes(search);
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const countByStatus = ALL_CONTATO_STATUSES.reduce(
    (acc, s) => ({ ...acc, [s]: allContatos.filter((c) => c.status === s).length }),
    {} as Record<ContatoStatus, number>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-400 mt-1">
            {allContatos.length} contato{allContatos.length !== 1 ? "s" : ""} cadastrado{allContatos.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/contatos/new"
          className="inline-flex items-center gap-2 bg-brand-blue text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-blue-dark transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Novo Contato
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <StatusPill status="todos" active={!statusFilter} count={allContatos.length} />
          {ALL_CONTATO_STATUSES.map((s) => (
            <StatusPill key={s} status={s} active={statusFilter === s} count={countByStatus[s]} />
          ))}
        </div>

        <form method="GET" className="ml-auto flex items-center gap-2">
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Buscar..."
              className="pl-9 pr-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-52"
            />
          </div>
          {search && (
            <Link href={statusFilter ? `/?status=${statusFilter}` : "/"} className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
              Limpar
            </Link>
          )}
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Nenhum contato encontrado</p>
            <p className="text-xs text-gray-400 mt-1">
              {search || statusFilter ? "Tente ajustar os filtros." : "Comece criando o primeiro contato."}
            </p>
            {!search && !statusFilter && (
              <Link href="/contatos/new" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-pink hover:underline">
                Criar primeiro contato
              </Link>
            )}
          </div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Info de contato</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((c) => (
                <LeadRow key={c.id} c={c} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-gray-400 mt-3 text-right">
          Exibindo {filtered.length} de {allContatos.length} contato{allContatos.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
