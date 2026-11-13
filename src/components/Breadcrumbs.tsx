import Link from "next/link";

type Crumb = { label: string; href?: string };

// Poziome okruchy nad siatką; ostatni element (bez href) to bieżące miejsce
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ścieżka" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
