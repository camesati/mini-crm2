export type ContatoStatus = "novo" | "em_contato" | "fechado";

export const ALL_CONTATO_STATUSES: ContatoStatus[] = ["novo", "em_contato", "fechado"];

export const CONTATO_STATUS_LABELS: Record<ContatoStatus, string> = {
  novo: "Novo",
  em_contato: "Em Contato",
  fechado: "Fechado",
};

export const CONTATO_STATUS_COLORS: Record<ContatoStatus, string> = {
  novo: "bg-brand-blue/10 text-brand-blue",
  em_contato: "bg-amber-100 text-amber-700",
  fechado: "bg-green-100 text-green-700",
};

export interface Contato {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: ContatoStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
