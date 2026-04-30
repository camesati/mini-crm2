"use client";

import Link from "next/link";
import { Contato } from "@/types/contato";
import { formatDate } from "@/lib/utils";
import { deleteContato } from "@/lib/contatos-actions";
import Button from "@/components/ui/Button";

export default function ContatoTable({ contatos }: { contatos: Contato[] }) {
  if (contatos.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-sm font-medium">Nenhum contato encontrado.</p>
        <p className="text-xs mt-1">Tente ajustar a busca ou crie um novo contato.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {["Nome", "Cargo", "Empresa", "E-mail", "Telefone", "Criado em", "Ações"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {contatos.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                {c.name}
              </td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {c.position || "—"}
              </td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {c.company || "—"}
              </td>
              <td className="px-4 py-3 text-gray-600">{c.email || "—"}</td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {c.phone || "—"}
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {formatDate(c.createdAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link href={`/contatos/${c.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </Link>
                  <form
                    action={async () => {
                      if (confirm(`Excluir "${c.name}"?`)) {
                        await deleteContato(c.id);
                      }
                    }}
                  >
                    <Button variant="danger" size="sm" type="submit">
                      Excluir
                    </Button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
