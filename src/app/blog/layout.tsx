import { PropsWithChildren } from "react";
import { MainLayout } from "../components/MainLayout";

export default async function BlogLayout({ children }: PropsWithChildren) {
  return <MainLayout title="Blog">{children}</MainLayout>;
}
