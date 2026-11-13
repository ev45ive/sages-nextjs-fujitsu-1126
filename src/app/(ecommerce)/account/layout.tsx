import Link from "next/link";
import { ReactNode } from "react";

// layout dostaje children (slot domyślny) i modal (named slot z folderu @modal) jako props
export default function AccountLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[12rem_1fr] gap-5 p-5">
      <nav className="grid content-start gap-2">
        <Link href="/account/settings" className="text-blue-600 hover:underline">
          Ustawienia
        </Link>
        <Link href="/account/orders" className="text-blue-600 hover:underline">
          Zamówienia
        </Link>
      </nav>

      <section>{children}</section>

      {/* modal renderuje się tylko przy nawigacji przechwyconej przez (.)orders; poza tym slot jest pusty */}
      {modal}
    </div>
  );
}
