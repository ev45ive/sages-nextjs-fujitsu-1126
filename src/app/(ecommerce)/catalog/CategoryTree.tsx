"use client";

import type { CategoryNode } from "@/lib/category-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Aktywna kategoria wynika z URL, więc zaznaczenie działa po kliknięciu, po F5 i przy cofaniu
export function CategoryTree({ tree, total }: { tree: CategoryNode[]; total: number }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Kategorie" className="grid gap-2">
      <NavItem href="/catalog" label="Wszystkie produkty" count={total} active={pathname === "/catalog"} />
      <TreeList nodes={tree} pathname={pathname} />
    </nav>
  );
}

function TreeList({
  nodes,
  pathname,
  depth = 0,
}: {
  nodes: CategoryNode[];
  pathname: string;
  depth?: number;
}) {
  return (
    <ul className={`grid gap-1 text-sm ${depth > 0 ? "ml-3 border-l pl-3" : ""}`}>
      {nodes.map((node) => {
        const href = `/catalog/${node.path.join("/")}`;
        return (
          <li key={node.id}>
            <NavItem href={href} label={node.name} count={node.count} active={pathname === href} />
            {node.children.length > 0 && (
              <TreeList nodes={node.children} pathname={pathname} depth={depth + 1} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function NavItem({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center justify-between gap-2 rounded-md px-2 py-1 text-sm transition-colors ${
        active
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <span>{label}</span>
      <span className="text-xs tabular-nums">{count}</span>
    </Link>
  );
}
