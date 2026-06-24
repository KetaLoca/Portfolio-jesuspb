import { useEffect, useRef } from "react";

// Acentos de color por sección (r,g,b). Se mantienen dentro de la familia
// cyan → azul → violeta para no romper la identidad de marca; cada sección
// desplaza el color de la aurora para dar distinción al hacer scroll.
const SECTION_ACCENTS = {
  // Degradado frío continuo cyan → sky → azul → índigo → violeta. La segunda
  // mancha (b) de cada sección tira hacia el tono de la siguiente, de modo que
  // el barrido sea fluido al hacer scroll. Toda la gama queda en azules/violetas
  // → cohesión máxima y aire sobrio/profesional.
  "sobre-mi": { a: "34, 211, 238", b: "56, 189, 248" }, // cyan → sky
  experiencia: { a: "56, 189, 248", b: "59, 130, 246" }, // sky → blue
  tecnologias: { a: "59, 130, 246", b: "99, 102, 241" }, // blue → indigo
  proyectos: { a: "99, 102, 241", b: "139, 92, 246" }, // indigo → violet
  formacion: { a: "139, 92, 246", b: "124, 58, 237" }, // violet
};

const SECTION_IDS = Object.keys(SECTION_ACCENTS);

// Dispositivo táctil sin puntero fino (móvil/tablet sin ratón). En estos
// desactivamos ambos parallax: el de cursor desplaza la capa al arrastrar para
// scrollear, y el de scroll provoca lagazos (repintado de rejilla + recomposición
// de glows con blur por frame) y un "snap" feo en los nodos. La detección por
// puntero es más fiable que por ancho (no afecta a portátiles con pantalla táctil).
const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

/**
 * Atmósfera global reactiva: rejilla blueprint, aurora animada con tinte por
 * sección, constelación de partículas en canvas (la única capa reactiva al
 * cursor) y parallax doble (cursor + scroll). Todo detrás de un pointermove y
 * un scroll (throttled con rAF) y un único bucle de canvas, que se pausa al
 * ocultar la pestaña. Respeta prefers-reduced-motion.
 *
 * En táctil (sin puntero fino) se degrada para garantizar un scroll fluido:
 * ambos parallax desactivados, glows estáticos (CSS), DPR más bajo y canvas
 * estabilizado frente al resize de la barra de URL. El canvas sigue animado.
 */
const Atmosphere = () => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  // Puntero normalizado (0..1) y en px, compartido entre listener y bucle.
  const pointer = useRef({ nx: 0.5, ny: 0.5, px: 0, py: 0, active: false });

  // ---- Parallax de cursor: pointermove throttled con rAF ----
  // En táctil no se monta: el arrastre para scrollear dispara pointermove y
  // desplazaría toda la capa de fondo (rejilla + glows) de forma molesta.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || isCoarsePointer()) return;

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

  // ---- Parallax de scroll: las capas de fondo derivan al hacer scroll, más
  // lento que el contenido, a distintas velocidades (glows < rejilla < nodos)
  // para dar sensación de profundidad. `--sy` mueve rejilla y glows por CSS;
  // el canvas lee pointer.current.scroll. Un solo listener, throttled con rAF. ----
  // En táctil no se monta: el parallax de scroll es la principal fuente de
  // lagazos (repinta la rejilla y recompone los glows en cada frame) y del
  // "baile" de los nodos al envolver. El fondo queda fijo y el scroll, fluido.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || isCoarsePointer()) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      const sy = window.scrollY;
      pointer.current.scroll = sy;
      root.style.setProperty("--sy", sy.toFixed(1));
      // Parallax de la rejilla vía transform (compositor), no background-position
      // (que es un paint a pantalla completa por frame). El patrón se repite cada
      // 56px, así que envolvemos el desplazamiento a [0,56): el efecto infinito es
      // idéntico pero sin repintar. La rejilla extiende 64px por debajo para que
      // el translate hacia arriba no descubra borde.
      root.style.setProperty("--grid-y", (((sy * 0.15) % 56)).toFixed(2));
    };
    apply();

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
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
    const mobile = isCoarsePointer();

    let width = 0;
    let height = 0;
    let prevW = -1;
    let dpr = 1;
    let particles = [];
    // Buffers de posición en pantalla reusados entre frames (evita crear dos
    // arrays nuevos por frame → menos GC, menos micro-tirones).
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let raf = 0;
    let running = true;

    const LINK_DIST = 140; // distancia máx. para unir nodos
    const LINK_DIST2 = LINK_DIST * LINK_DIST;
    const CURSOR_DIST = 150; // radio de repulsión/realce del cursor
    const CURSOR_DIST2 = CURSOR_DIST * CURSOR_DIST;

    // Cap de fps: la constelación es muy lenta, así que 30-40 fps es
    // indistinguible de 60 y reduce a la mitad tanto el redibujado como las
    // recomposiciones de los backdrop-filter que tiene encima.
    const FRAME_MS = mobile ? 1000 / 30 : 1000 / 40;
    let last = -Infinity;

    // Pausa el redibujado mientras se hace scroll EN MÓVIL (allí no hay parallax
    // de scroll de nodos, así que congelar un par de frames no produce saltos):
    // libera el hilo para que el scroll vaya fluido. En desktop el cap de fps ya
    // descarga y el parallax de nodos debe seguir vivo, así que no se pausa.
    const pauseOnScroll = mobile && !reduced;
    let scrolling = false;
    let scrollIdle = 0;

    const resize = () => {
      const newW = window.innerWidth;
      // En móvil, ignora los cambios de SOLO alto: la barra de URL aparece/
      // desaparece al hacer scroll y dispararía un resize que re-siembra el
      // campo de nodos (se "baraja"). Solo re-medimos al cambiar el ancho.
      if (mobile && particles.length && newW === width) return;

      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      width = newW;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-siembra solo en el primer paso o al cambiar el ancho (orientación):
      // así el campo no se baraja en cada resize.
      if (!particles.length || newW !== prevW) {
        prevW = newW;
        // Densidad ~ área, capada para no disparar el coste en pantallas grandes.
        const target = Math.min(Math.round((width * height) / 13000), 95);
        particles = Array.from({ length: target }, (_, i) => ({
          // Posición pseudo-aleatoria determinista (sin Math.random global):
          x: ((i * 137.5) % width),
          y: ((i * 263.1) % height),
          vx: (((i % 7) - 3) / 14) || 0.05,
          vy: (((i % 5) - 2) / 14) || 0.04,
        }));
        sx = new Float32Array(target);
        sy = new Float32Array(target);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { px, py, active } = pointer.current;
      // Parallax de scroll: los nodos derivan hacia arriba al bajar, más lento
      // que el contenido. Con wrap [0,height) para que el campo no se agote.
      const scrollOff = reduced || mobile ? 0 : ((pointer.current.scroll || 0) * 0.25) % height;
      const n = particles.length;

      for (let i = 0; i < n; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Rebote en bordes.
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        let screenY = (p.y - scrollOff) % height;
        if (screenY < 0) screenY += height;
        const screenX = p.x;

        // Repulsión + realce cerca del cursor (en coordenadas de pantalla).
        // Comparamos la distancia AL CUADRADO y solo sacamos la raíz cuando el
        // nodo está dentro del radio (pocos), no para todos.
        let near = 0; // 0..1 según proximidad al cursor
        if (active) {
          const dx = screenX - px;
          const dy = screenY - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_DIST2 && d2 > 0.0001) {
            const dist = Math.sqrt(d2);
            near = (CURSOR_DIST - dist) / CURSOR_DIST;
            p.x += (dx / dist) * near * 1.1;
            p.y += (dy / dist) * near * 1.1;
          }
        }

        sx[i] = screenX;
        sy[i] = screenY;

        // Nodo: los cercanos al cursor crecen y brillan (efecto reactivo). El
        // "brillo" se hace con un halo translúcido extra, no con shadowBlur (que
        // en canvas es de lo más caro que hay, fuerza un blur por cada fill).
        const radius = 2.1 + near * 1.8;
        const alpha = 0.55 + near * 0.35;
        if (near > 0.2) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius + 3.4 * near, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${0.16 * near})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 211, 252, ${alpha})`;
        ctx.fill();
      }

      // Conexiones entre nodos cercanos (en pantalla). Filtro por distancia al
      // cuadrado; la raíz solo se calcula para los pares que de verdad se unen.
      for (let i = 0; i < n; i++) {
        const xi = sx[i];
        const yi = sy[i];
        for (let j = i + 1; j < n; j++) {
          const dx = xi - sx[j];
          const dy = yi - sy[j];
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST2) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.3;
            ctx.strokeStyle = `rgba(94, 234, 252, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(xi, yi);
            ctx.lineTo(sx[j], sy[j]);
            ctx.stroke();
          }
        }
        // Líneas del cursor a sus nodos cercanos (resalta el efecto reactivo).
        if (active) {
          const dx = xi - px;
          const dy = yi - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_DIST2) {
            const alpha = (1 - Math.sqrt(d2) / CURSOR_DIST) * 0.32;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(xi, yi);
            ctx.lineTo(px, py);
            ctx.stroke();
          }
        }
      }
    };

    // Bucle con cap de fps: el rAF sigue a la cadencia del navegador, pero solo
    // redibujamos cuando ha pasado FRAME_MS (y nunca durante el scroll en móvil).
    const loop = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (pauseOnScroll && scrolling) {
        last = now;
        return;
      }
      if (now - last < FRAME_MS) return;
      last = now;
      draw();
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduced && !running) {
        running = true;
        last = -Infinity;
        raf = requestAnimationFrame(loop);
      }
    };

    let resizeFrame = 0;
    const onResize = () => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
        if (reduced) draw(); // un solo frame estático
      });
    };

    let onScroll = null;
    if (pauseOnScroll) {
      onScroll = () => {
        scrolling = true;
        if (scrollIdle) clearTimeout(scrollIdle);
        scrollIdle = setTimeout(() => {
          scrolling = false;
        }, 140);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    resize();
    if (reduced) {
      draw(); // dibuja una vez, sin bucle
    } else {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      if (scrollIdle) clearTimeout(scrollIdle);
      if (onScroll) window.removeEventListener("scroll", onScroll);
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
      {/* Lienzo con parallax de cursor: rejilla + aurora se desplazan levemente
          con el ratón. La rejilla además deriva con el scroll vía
          background-position; los glows, en su propia capa, con translate. */}
      <div className="atmo-parallax absolute inset-[-4%]">
        <div className="app-grid absolute inset-0" />
        <div className="atmo-aura-scroll absolute inset-0">
          <div className="atmo-aura atmo-aura--a absolute -top-40 left-1/2 h-[42rem] w-[60rem] -translate-x-1/2" />
          <div className="atmo-aura atmo-aura--b absolute top-1/3 -right-48 h-[36rem] w-[36rem]" />
          <div className="atmo-aura atmo-aura--c absolute bottom-0 -left-48 h-[34rem] w-[34rem]" />
        </div>
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
