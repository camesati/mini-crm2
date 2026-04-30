interface ErrorStateProps {
  title?: string;
  message: string;
  digest?: string;
  hint?: string;
}

export default function ErrorState({
  title = "Não foi possível carregar os dados",
  message,
  digest,
  hint,
}: ErrorStateProps) {
  return (
    <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-700 mt-1.5 break-words font-mono bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {message}
            </p>
            {hint && (
              <p className="text-sm text-gray-600 mt-3">
                <span className="font-medium">Dica:</span> {hint}
              </p>
            )}
            {digest && (
              <p className="text-xs text-gray-400 mt-3 font-mono">
                Digest: {digest}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
