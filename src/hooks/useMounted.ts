import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// false w SSR i pierwszym renderze, true po montażu w przeglądarce (bezpieczne dla localStorage)
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
