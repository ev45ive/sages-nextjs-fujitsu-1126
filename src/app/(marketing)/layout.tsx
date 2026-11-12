import { PropsWithChildren } from "react";
import { MainLayout } from "../components/MainLayout";

export default async function BlogLayout({ children }: PropsWithChildren) {
  return <MainLayout title="(marketing)">{children}</MainLayout>;
}
