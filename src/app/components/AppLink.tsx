"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export const AppLink = ({
  href,
  className,
  ...restProps
}: ComponentProps<typeof Link>) => {
  const pathname = usePathname();
  const urlPath = typeof href === "string" ? href : href.pathname!;
  return (
    <Link
      href={href}
      className={`${pathname.startsWith(urlPath) ? "text-red-500  outline-2" : ""} ${className}`}
      {...restProps}
    />
  );
};
