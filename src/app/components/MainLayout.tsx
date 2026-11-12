import { TopNavigation } from "@/app/components/TopNavigation";
import { PropsWithChildren, ReactNode } from "react";


export function MainLayout({
  children, title,
}: PropsWithChildren<{ title?: string; sidebar?: ReactNode; }>) {
  return (
    <div className="container mx-auto grid gap-5 my-5">
      <TopNavigation />

      {/* Conditional Rendering */}
      {title !== "" && <h1 className="text-2xl">{title}</h1>}

      {/* Those are ignored */}
      {false} {true} {null} {undefined}

      {/* Wrap content from parent */}
      {children}
    </div>
  );
}
