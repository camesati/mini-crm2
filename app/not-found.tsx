import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h2 className="text-2xl font-bold text-gray-900">Página não encontrada</h2>
      <p className="text-gray-500 mt-2 text-sm">O recurso que você procura não existe.</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 bg-brand-blue text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-blue-dark transition-colors"
      >
        Ir para o Dashboard
      </Link>
    </div>
  );
}
