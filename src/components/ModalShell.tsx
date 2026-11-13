"use client"; // onClick i router.back() działają tylko w przeglądarce

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

// router.back() cofa historię, więc zamknięcie modala wraca do listy zamówień bez osobnej strony
export function ModalShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40"
      onClick={() => router.back()}
    >
      {/* stopPropagation: klik w treść nie zamyka modala */}
      <div
        className="max-h-[80vh] w-full max-w-lg overflow-auto bg-white p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="mb-3 text-sm text-blue-600 hover:underline"
          onClick={() => router.back()}
        >
          Zamknij
        </button>
        {children}
      </div>
    </div>
  );
}
