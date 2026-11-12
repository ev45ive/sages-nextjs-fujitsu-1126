import Link from "next/link";

export function TopNavigation() {
  return (
    <div className="flex gap-5">
      <Link href="/blog">Blog</Link>
      <Link href="/about">About</Link>
      <Link href="/catalog/nowosci">Shop</Link>

      <input type="search" className="border" />
    </div>
  );
}
