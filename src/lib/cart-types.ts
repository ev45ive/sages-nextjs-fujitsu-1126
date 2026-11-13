// Typy wspólne dla klienta (zustand) i serwera (API koszyka), bez "use client"
export type CartLine = {
  productId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};
