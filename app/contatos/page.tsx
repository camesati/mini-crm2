import Link from "next/link";
import { getContatos } from "@/lib/contatos";
import { Contato } from "@/types/contato";
import ContatoTable from "@/components/contatos/ContatoTable";
import ErrorState from "@/components/ui/ErrorState";

interface SearchParams {
  search?: string;
}

export default async function ContatosPage({ searchParams }: { searchParams: SearchParams }) {
  let allContatos: Contato[];
  try {
    allContatos = await getContatos();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return (
      <div className="max-w-2xl mx-auto py-8">
        <ErrorState
          message={message}
          hint="Verifique se a tabela 'contatos' existe no Supabase e se o RLS está configurado para permitir acesso anônimo."
        />
      </div>
    );
  }

  const search = searchParams.search?.toLowerCase() ?? "";

  const contatos = search
    ? allContatos.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search) ||
          c.company.toLowerCase().includes(search) ||
          c.position.toLowerCase().includes(search)
      )
    : allContatos;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contatos</h1>
          <p className="text-sm text-gray-500 mt-1">
            {contatos.length} de {allContatos.length} contato{allContatos.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/contatos/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Novo Contato
        </Link>
      </div>

      <form method="GET" className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Buscar por nome, e-mail, empresa ou cargo..."
          className="flex-1 min-w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Buscar
        </button>
        {search && (
          <Link
            href="/contatos"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Limpar
          </Link>
        )}
      </form>

      <ContatoTable contatos={contatos} />
    </div>
  );
}
