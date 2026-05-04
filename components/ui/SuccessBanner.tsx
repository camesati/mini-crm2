"use client";

import { useEffect, useState } from "react";

const MESSAGES: Record<string, string> = {
  contato_criado: "Contato criado com sucesso.",
  contato_atualizado: "Contato atualizado com sucesso.",
  lead_criado: "Lead criado com sucesso.",
  lead_atualizado: "Lead atualizado com sucesso.",
};

export default function SuccessBanner({ code }: { code: string }) {
  const [visible, setVisible] = useState(true);
  const message = MESSAGES[code];

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!visible || !message) return null;

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 mb-6 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {message}
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-green-500 hover:text-green-700 transition-colors"
        aria-label="Fechar"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
