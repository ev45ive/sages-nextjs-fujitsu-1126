import { delay } from "@/app/utils/delay";
import { connection } from "next/server";
import { cacheLife, cacheTag } from "next/cache";

// Adres json-server z `npm run db` (port 9000)
const API = "http://localhost:9000";

export type Product = {
  id: string;
  code: string;
  name: string;
  image: string;
  price: number;
  date: string;
  description: string;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
};

export type Stock = {
  id: string;
  productId: string;
  available: number;
  warehouse: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  productId: string;
  rating: number;
  comment: string;
};

export type Category = {
  id: string;
  name: string;
  parentId: string | null;
  // tylko liście: nazwa kategorii produktu z pola category, po której filtrujemy
  productCategory?: string;
};

// "use cache": drzewo kategorii zmienia się rzadko, tag "categories" pozwala je unieważnić
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  const res = await fetch(`${API}/categories`);
  return res.json();
}

// "use cache": lista produktów zapisana na godzinę, tag "products" pozwala ją unieważnić
export async function getAllProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const res = await fetch(`${API}/products`);
  return res.json();
}

// "use cache" per id: tytuł, zdjęcie, opis i cena dzielą jeden wpis, więc jeden GET do json-server
export async function getProduct(id: string): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`product:${id}`);

  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// Bez "use cache": cena do zamówienia musi być aktualna, więc nie używamy cache produktu
export async function getProductPrice(id: string): Promise<Product | null> {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// Bez "use cache": stan magazynowy zmienia się często, więc czytamy go przy każdym żądaniu
export async function getStock(id: string): Promise<Stock | null> {
  const res = await fetch(`${API}/stock/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// Bez "use cache" i z celowym opóźnieniem: wolne opinie nie mogą blokować ceny ani stocku
export async function getReviews(productId: string): Promise<Review[]> {
  // connection(): dane z żądania, więc delay() z losowym jitterem nie trafia do prerenderingu
  await connection();
  await delay(2000);
  const res = await fetch(`${API}/reviews?productId=${productId}`);
  return res.json();
}
