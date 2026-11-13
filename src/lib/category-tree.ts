import type { Category, Product } from "@/services/CatalogAPI";

export type CategoryNode = Category & {
  // ścieżka id od korzenia, np. ["moda", "akcesoria"]; z niej budujemy URL
  path: string[];
  children: CategoryNode[];
  // productCategory węzła i wszystkich potomków: po nich filtrujemy produkty
  productCategories: string[];
  count: number;
};

// Buduje drzewo z płaskiej listy (parentId); liczniki i filtry idą z poddrzewa
export function buildTree(categories: Category[], products: Product[]): CategoryNode[] {
  const build = (parentId: string | null, parentPath: string[]): CategoryNode[] =>
    categories
      .filter((c) => c.parentId === parentId)
      .map((c) => {
        const path = [...parentPath, c.id];
        const children = build(c.id, path);
        const productCategories = [
          ...(c.productCategory ? [c.productCategory] : []),
          ...children.flatMap((child) => child.productCategories),
        ];
        const count = products.filter((p) => productCategories.includes(p.category)).length;
        return { ...c, path, children, productCategories, count };
      });

  return build(null, []);
}

// Zamienia segmenty URL na łańcuch węzłów; null, gdy któryś segment nie istnieje na swoim poziomie
export function resolveChain(tree: CategoryNode[], slugs: string[]): CategoryNode[] | null {
  const chain: CategoryNode[] = [];
  let level = tree;
  for (const slug of slugs) {
    const node = level.find((n) => n.id === slug);
    if (!node) return null;
    chain.push(node);
    level = node.children;
  }
  return chain;
}

export function productsFor(products: Product[], node: CategoryNode): Product[] {
  return products.filter((p) => node.productCategories.includes(p.category));
}
