import { useEffect, useRef } from "react";

/**
 * Reveal-on-scroll ligero — sustituye a framer-motion `whileInView` para los
 * fades de entrada (fade + slide) sin cargar ~40 KB gzip de librería.
 *
 * Al entrar el elemento en viewport, un IntersectionObserver le añade la clase
 * `is-visible` y la transición CSS (`.reveal` en index.css) hace el trabajo. Se
 * observa una sola vez (equivale a `viewport={{ once: true }}`). Con
 * prefers-reduced-motion se muestra directamente, sin animación.
 *
 * `rootMargin` ajusta cuándo dispara (el margen inferior negativo retrasa la
 * entrada hasta que el elemento sube un poco, como hacía `viewport.margin`).
 */
export function useReveal(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);
  return ref;
}
