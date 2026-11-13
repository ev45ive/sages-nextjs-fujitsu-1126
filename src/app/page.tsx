import { MainLayout } from "@/components/MainLayout";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          Ala ma kota
        </div>
      </MainLayout>
    </>
  );
}
