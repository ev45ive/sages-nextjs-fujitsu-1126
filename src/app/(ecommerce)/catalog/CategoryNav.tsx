import { buildTree } from "@/lib/category-tree";
import { getAllProducts, getCategories } from "@/services/CatalogAPI";
import { CategoryTree } from "./CategoryTree";

// Drzewo liczone z cache'owanych kategorii i produktów; zaznaczenie robi klient przez usePathname
export async function CategoryNav() {
  const [categories, products] = await Promise.all([getCategories(), getAllProducts()]);
  return <CategoryTree tree={buildTree(categories, products)} total={products.length} />;
}
