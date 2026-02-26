import { useState, useEffect } from "react";

export function useScrollSpy(ids: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: `-${offset}px 0px -60% 0px`, threshold: 0 },
    );

    const observed = new Set<string>();

    function observeElements() {
      for (const id of ids) {
        if (observed.has(id)) continue;
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observed.add(id);
        }
      }
    }

    observeElements();

    // Watch for lazy-loaded sections appearing in the DOM
    let mutationObserver: MutationObserver | undefined;
    if (observed.size < ids.length) {
      mutationObserver = new MutationObserver(() => {
        observeElements();
        if (observed.size >= ids.length) {
          mutationObserver?.disconnect();
        }
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
      mutationObserver?.disconnect();
    };
  }, [ids, offset]);

  return activeId;
}
