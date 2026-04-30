"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalErrorBoundary]", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#f9fafb",
          color: "#111827",
          margin: 0,
          padding: "48px 24px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #fecaca",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h1 style={{ fontSize: "20px", fontWeight: 600, marginTop: 0 }}>
            Erro fatal na aplicação
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
            Detalhes técnicos:
          </p>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "13px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "6px",
              padding: "12px",
              marginTop: "12px",
              wordBreak: "break-word",
            }}
          >
            {error.message || "Erro desconhecido"}
          </div>
          {error.digest && (
            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                marginTop: "12px",
                fontFamily: "monospace",
              }}
            >
              Digest: {error.digest}
            </p>
          )}
          <button
            onClick={() => reset()}
            style={{
              marginTop: "24px",
              backgroundColor: "#111827",
              color: "white",
              fontSize: "14px",
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
