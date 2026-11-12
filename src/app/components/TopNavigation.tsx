import { AppLink } from "./AppLink";

export function TopNavigation() {
  // useRouter();
  // useParams();
  // useSearchParams();
  // const pathname = usePathname();

  return (
    <div className="flex gap-5 mx-2">
      <AppLink href="/blog" className="px-2">
        Blog
      </AppLink>
      <AppLink href="/about" className="px-2">
        About
      </AppLink>
      <AppLink href="/catalog/nowosci" className="px-2">
        Shop
      </AppLink>

      <div className="mx-auto"></div>

      <input type="search" className="border" />

      <button>Login</button>
    </div>
  );
}
