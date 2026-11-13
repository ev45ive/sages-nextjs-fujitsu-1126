import Link from "next/link";

export default async function ShopCategory({children}: LayoutProps<"/catalog">) {
  return (
    <>
      {/* .grid.grid-cols-2.gap-5>.grid.gap-5*4{Columna $} */}
      <div className="grid grid-cols-[10rem_1fr] gap-5">
        <div className="grid gap-5">
          <Link href={"/catalog/nowosci"}>Nowosci</Link>
          <Link href={"/catalog/ubrania"}>Ubrania</Link>
          <Link href={"/catalog/ubrania/damskie"}> - Damskie</Link>
          <Link href={"/catalog/ubrania/damskie/sukienki"}> -- Sukienki</Link>
          <Link href={"/catalog/ubrania"}> - Meskie</Link>
        </div>
        <div className="grid gap-5">
          {/* Catalog Products */}
          {children}
        </div>
        <div className="grid gap-5">
          Panel Lewy
        </div>
        <div className="grid gap-5">Stopka prawa</div>
      </div>
    </>
  );
}
