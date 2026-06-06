import { useEffect, useRef } from "react";

// Acentos de color por sección (r,g,b). Se mantienen dentro de la familia
// cyan → azul → violeta para no romper la identidad de marca; cada sección
// desplaza el color de la aurora para dar distinción al hacer scroll.
const SECTION_ACCENTS = {
  "sobre-mi": { a: "34, 211, 238", b: "59, 130, 246" },
  experiencia: { a: "56, 189, 248", b: "99, 102, 241" },
  tecnologias: { a: "45, 212, 191", b: "56, 189, 248" },
  proyectos: { a: "129, 140, 248", b: "167, 139, 250" },
  formacion: { a: "96, 165, 250", b: "34, 211, 238" },
};

const SECTION_IDS = Object.keys(SECTION_ACCENTS);

/**
 * Atmósfera global reactiva: rejilla blueprint + spotlight que sigue al cursor,
 * aurora animada con tinte por sección, constelación de partículas en canvas y
 * parallax sutil. Todo detrás de un único pointermove (throttled con rAF) y un
 * único bucle de canvas, que se pausa al ocultar la pestaña. Respeta
 * prefers-reduced-motion.
 */
const Atmosphere = () => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  // Puntero normalizado (0..1) y en px, compartido entre listener y bucle.
  const pointer = useRef({ nx: 0.5, ny: 0.5, px: 0, py: 0, active: false });

  // ---- Spotlight + parallax: pointermove throttled con rAF ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      const { nx, ny } = pointer.current;
      // Solo parallax: el cursor mueve sutilmente el lienzo. La interacción
      // "fuerte" con el puntero la lleva el canvas (nodos), no una capa de luz.
      root.style.setProperty("--px", nx.toFixed(4));
      root.style.setProperty("--py", ny.toFixed(4));
    };

    const onMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      pointer.current.px = x;
      pointer.current.py = y;
      pointer.current.nx = x / window.innerWidth;
      pointer.current.ny = y / window.innerHeight;
      pointer.current.active = true;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // ---- Tinte por sección: IntersectionObserver sobre la sección central ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const setAccent = (id) => {
      const accent = SECTION_ACCENTS[id];
      if (!accent) return;
      root.style.setProperty("--aura-a", accent.a);
      root.style.setProperty("--aura-b", accent.b);
    };
    setAccent("sobre-mi");

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    if (!sections.length) return;

    // rootMargin estrecha la "zona activa" a la banda central del viewport:
    // la sección que cruza el centro es la que tiñe la aurora.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setAccent(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // ---- Constelación de partículas en canvas ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let raf = 0;
    let running = true;

    const LINK_DIST = 140; // distancia máx. para unir nodos
    const CURSOR_DIST = 150; // radio de repulsión/realce del cursor

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Densidad ~ área, capada para no disparar el coste en pantallas grandes.
      const target = Math.min(Math.round((width * height) / 13000), 95);
      particles = Array.from({ length: target }, (_, i) => ({
        // Posición pseudo-aleatoria determinista (sin Math.random global):
        x: ((i * 137.5) % width),
        y: ((i * 263.1) % height),
        vx: (((i % 7) - 3) / 14) || 0.05,
        vy: (((i % 5) - 2) / 14) || 0.04,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      const { px, py, active } = pointer.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Rebote en bordes.
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Repulsión + realce cerca del cursor.
        let near = 0; // 0..1 según proximidad al cursor
        if (active) {
          const dx = p.x - px;
          const dy = p.y - py;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_DIST && dist > 0.01) {
            near = (CURSOR_DIST - dist) / CURSOR_DIST;
            p.x += (dx / dist) * near * 1.1;
            p.y += (dy / dist) * near * 1.1;
          }
        }

        // Nodo: los cercanos al cursor crecen y brillan (efecto reactivo).
        const radius = 2.1 + near * 1.8;
        const alpha = 0.55 + near * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 211, 252, ${alpha})`;
        if (near > 0.2) {
          ctx.shadowColor = "rgba(34, 211, 238, 0.8)";
          ctx.shadowBlur = 9 * near;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Conexiones entre nodos cercanos.
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.3;
            ctx.strokeStyle = `rgba(94, 234, 252, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // Líneas del cursor a sus nodos cercanos (resalta el efecto reactivo).
        if (active) {
          const dx = a.x - px;
          const dy = a.y - py;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_DIST) {
            const alpha = (1 - dist / CURSOR_DIST) * 0.32;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(px, py);
            ctx.stroke();
          }
        }
      }

      if (running) raf = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduced && !raf) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    let resizeFrame = 0;
    const onResize = () => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
        if (reduced) step(); // un solo frame estático
      });
    };

    resize();
    if (reduced) {
      step(); // dibuja una vez, sin bucle
    } else {
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Lienzo con parallax: rejilla + aurora se desplazan levemente con el ratón. */}
      <div className="atmo-parallax absolute inset-[-4%]">
        <div className="app-grid absolute inset-0" />
        <div className="atmo-aura atmo-aura--a absolute -top-40 left-1/2 h-[42rem] w-[60rem] -translate-x-1/2" />
        <div className="atmo-aura atmo-aura--b absolute top-1/3 -right-48 h-[36rem] w-[36rem]" />
        <div className="atmo-aura atmo-aura--c absolute bottom-0 -left-48 h-[34rem] w-[34rem]" />
      </div>

      {/* Constelación de partículas (no se mueve con el parallax: vive en su
          propio plano para que las líneas no "bailen" al desplazar el ratón).
          Es la única capa que reacciona al cursor: los nodos se apartan, crecen
          y se conectan con él. Sin foco de luz, para no estorbar la lectura. */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default Atmosphere;
