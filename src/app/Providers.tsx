"use client";

import { ThemeProvider } from "@/components/theme-provider";
import React, { PropsWithChildren, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: PropsWithChildren) {
  // QueryClient w useState: każda przeglądarka dostaje własny cache, nic nie jest współdzielone między użytkownikami
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // staleTime: przez 30 s dane z cache są uznawane za świeże, więc powrót do listy nie wysyła nowego GET
        defaultOptions: { queries: { staleTime: 30_000 } },
      }),
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SomeContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SomeContextProvider>
      </QueryClientProvider>
    </>
  );
}

export const SOME_CONTEXT = React.createContext({
  test: "123",
  setTest: (v: string) => {},
});

function SomeContextProvider({ children }: PropsWithChildren) {
  const [some, setSome] = useState(`123`);

  return (
    <SOME_CONTEXT.Provider value={{ test: some, setTest: setSome }}>
      {children}
    </SOME_CONTEXT.Provider>
  );
}
