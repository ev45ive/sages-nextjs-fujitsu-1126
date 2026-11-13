"use client";

import { ThemeProvider } from "@/components/theme-provider";
import React, { PropsWithChildren, useState } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
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

