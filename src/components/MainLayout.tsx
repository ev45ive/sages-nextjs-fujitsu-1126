import { TopNavigation } from "@/components/TopNavigation";
import { PropsWithChildren, ReactNode, Suspense } from "react";

export function MainLayout({
  children,
  title,
}: PropsWithChildren<{ title?: string; sidebar?: ReactNode }>) {
  return (
    <div className="container mx-auto grid gap-5 my-5">
      <Suspense>
        <TopNavigation />
      </Suspense>
      {/* Conditional Rendering */}
      {title !== "" && <h1 className="text-2xl">{title}</h1>}
      {/* Those are ignored */}
      {false} {true} {null} {undefined}
      {/* Wrap content from parent */}
      {children}
    </div>
  );
}
