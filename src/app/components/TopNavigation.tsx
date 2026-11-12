"use client";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export function TopNavigation() {
  useRouter();
  useParams();
  useSearchParams();

  const pathname = usePathname();

  return (
    <div className="flex gap-5 mx-2">
      <Link
        href="/blog"
        className={`${pathname.startsWith("/blog") ? "text-red-500  outline-2" : ""} px-2 `}
      >
        Blog
      </Link>
      <Link
        href="/about"
        className={`${pathname.startsWith("/about") ? "text-red-500  outline-2" : ""} px-2 `}
      >
        About
      </Link>
      <Link
        href="/catalog/nowosci"
        className={`${pathname.startsWith("/catalog") ? "text-red-500  outline-2" : ""} px-2 `}
      >
        Shop
      </Link>

      <input type="search" className="border" />
      {pathname}
    </div>
  );
}
