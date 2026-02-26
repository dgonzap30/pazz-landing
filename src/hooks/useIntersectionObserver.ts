import { useRef, useState, useEffect } from "react";

interface UseIntersectionObserverOptions {
  once?: boolean;
  margin?: string;
  threshold?: number;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {},
) {
  const { once = true, margin = "-60px", threshold = 0 } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin: margin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin, threshold]);

  return { ref, isInView };
}
