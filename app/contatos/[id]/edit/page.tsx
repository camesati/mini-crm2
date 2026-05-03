import { notFound } from "next/navigation";
import Link from "next/link";
import { getContatoById } from "@/lib/contatos";
import { updateContato } from "@/lib/contatos-actions";
import ContatoForm from "@/components/contatos/ContatoForm";

interface EditContatoPageProps {
  params: { id: string };
}

export default async function EditContatoPage({ params }: EditContatoPageProps) {
  const contato = await getContatoById(params.id);
  if (!contato) notFound();

  const action = updateContato.bind(null, contato.id);

  return (
    <div>
      <div className="mb-6">
        <Link href="/contatos" className="text-sm text-brand-pink hover:underline">
          ← Voltar para Contatos
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar Contato</h1>
        <p className="text-sm text-gray-500 mt-1">{contato.name}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <ContatoForm action={action} defaultValues={contato} />
      </div>
    </div>
  );
}
