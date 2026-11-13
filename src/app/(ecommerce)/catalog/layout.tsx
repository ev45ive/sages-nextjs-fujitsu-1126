import { CategoryNav } from "./CategoryNav";
import { Suspense, type ReactNode } from "react";

// Wspólny układ katalogu: sidebar z drzewem kategorii obok treści; sidebar w Suspense, bo czyta URL
export default function CatalogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[14rem_minmax(0,1fr)] gap-8">
      <aside className="border-r pr-6">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Ładowanie kategorii…</p>}>
          <CategoryNav />
        </Suspense>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
