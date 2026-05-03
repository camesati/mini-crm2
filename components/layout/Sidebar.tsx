"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/leads", label: "Leads", icon: "👥" },
  { href: "/contatos", label: "Contatos", icon: "📋" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-brand-blue text-white flex flex-col">
      <div className="px-6 py-5 border-b border-brand-blue-dark">
        <span className="text-lg font-bold tracking-tight">Mini CRM</span>
        <p className="text-xs text-white/60 mt-0.5">Gestão de Leads</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-pink text-white"
                  : "text-white/70 hover:bg-brand-blue-dark hover:text-white"
              }`}
            >
              <span>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 border-t border-brand-blue-dark">
        <p className="text-xs text-white/40">Camesa © 2024</p>
      </div>
    </aside>
  );
}
