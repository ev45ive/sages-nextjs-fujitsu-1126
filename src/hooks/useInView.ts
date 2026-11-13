import { useEffect, useRef, useState } from "react";

// visible przechodzi na true, gdy element wejdzie w obszar rootMargin; potem obserwacja się kończy
export function useInView<T extends Element>(rootMargin = "0px", initiallyVisible = false) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(initiallyVisible);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return { ref, visible };
}
