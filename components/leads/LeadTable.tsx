"use client";

import { useState } from "react";
import Link from "next/link";
import { Lead } from "@/types/lead";
import { formatDate } from "@/lib/utils";
import { deleteLead } from "@/lib/actions";
import StatusBadge from "@/components/leads/StatusBadge";
import Button from "@/components/ui/Button";

interface LeadTableProps {
  leads: Lead[];
}

export default function LeadTable({ leads }: LeadTableProps) {
  const [confirming, setConfirming] = useState<string | null>(null);

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-sm font-medium">Nenhum lead encontrado.</p>
        <p className="text-xs mt-1">Tente ajustar os filtros ou crie um novo lead.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {["Nome", "Empresa", "E-mail", "Telefone", "Status", "Criado em", "Ações"].map(
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
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                {lead.name}
              </td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {lead.company || "—"}
              </td>
              <td className="px-4 py-3 text-gray-600">{lead.email}</td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {lead.phone || "—"}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {formatDate(lead.createdAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link href={`/leads/${lead.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </Link>
                  {confirming === lead.id ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-red-500 font-medium whitespace-nowrap">Excluir?</span>
                      <button
                        onClick={async () => { await deleteLead(lead.id); }}
                        className="text-xs font-medium text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition-colors"
                      >
                        Sim
                      </button>
                      <button
                        onClick={() => setConfirming(null)}
                        className="text-xs font-medium text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                      >
                        Não
                      </button>
                    </div>
                  ) : (
                    <Button variant="danger" size="sm" onClick={() => setConfirming(lead.id)}>
                      Excluir
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
