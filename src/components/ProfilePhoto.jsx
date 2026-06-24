import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Foto del hero con easter egg "420 / Deal with it".
 *
 * Tras CLICKS_TO_TRIGGER clicks dentro de WINDOW_MS sobre la foto se dispara una
 * transición glitch cyberpunk (RGB-split + scanlines) y aparecen unas gafas y un
 * porro humeante. La imagen NUNCA se modifica: las gafas y el porro son overlays
 * SVG posicionados encima (vars CSS --eg-* / --ej-* en index.css para afinarlos).
 *
 * Feedback de carga: con cada click la foto tiembla un poco más y el marco brilla
 * más fuerte; si dejas de clicar, la carga decae sola. Respeta prefers-reduced-motion
 * (el estado final se ve, pero sin sacudidas) y se auto-desactiva pasado un rato.
 */
const CLICKS_TO_TRIGGER = 12; // 20 se siente inalcanzable; 12 ya cuesta y premia
const WINDOW_MS = 3500; // ventana para encadenar los clicks
const GLITCH_MS = 900; // duración de la transición glitch antes del estado final
const AUTO_OFF_MS = 12000; // vuelve solo a la normalidad pasado este tiempo

// Gafas "Thug Life" (PNG transparente en public/gafas.png)
const Glasses = () => (
  <img src="/gafas.png" alt="" aria-hidden="true" draggable="false" className="eg-glasses" />
);

// Porro realista con brasa (WebP en public/porro.webp) + humo animado encima
const Joint = () => (
  <div className="eg-joint" aria-hidden="true">
    <img src="/porro.webp" alt="" draggable="false" className="eg-joint__img" />
    <span className="eg-smoke eg-smoke--1" />
    <span className="eg-smoke eg-smoke--2" />
    <span className="eg-smoke eg-smoke--3" />
  </div>
);

const ProfilePhoto = () => {
  const [phase, setPhase] = useState("idle"); // idle | glitch | active
  const [charge, setCharge] = useState(0); // 0..1, progreso de carga (feedback)
  const clicksRef = useRef([]);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };
  const schedule = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  useEffect(() => () => clearTimers(), []);

  const trigger = useCallback(() => {
    clicksRef.current = [];
    setCharge(0);
    setPhase("glitch");
    clearTimers();
    schedule(() => setPhase("active"), GLITCH_MS);
    schedule(() => setPhase("idle"), GLITCH_MS + AUTO_OFF_MS);
  }, []);

  const handleClick = useCallback(() => {
    if (phase === "active") {
      // un click cuando ya está activo lo apaga con un glitch corto de salida
      clearTimers();
      setPhase("glitch");
      schedule(() => setPhase("idle"), 320);
      return;
    }
    if (phase === "glitch") return;

    const now = performance.now();
    const recent = clicksRef.current.filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    clicksRef.current = recent;
    setCharge(Math.min(1, recent.length / CLICKS_TO_TRIGGER));

    if (recent.length >= CLICKS_TO_TRIGGER) trigger();
  }, [phase, trigger]);

  // La carga decae sola si dejas de clicar (el shake baja y se apaga).
  useEffect(() => {
    if (phase !== "idle" || charge === 0) return;
    const id = setTimeout(() => {
      const now = performance.now();
      clicksRef.current = clicksRef.current.filter((t) => now - t < WINDOW_MS);
      setCharge(Math.min(1, clicksRef.current.length / CLICKS_TO_TRIGGER));
    }, 450);
    return () => clearTimeout(id);
  }, [phase, charge]);

  const active = phase === "active";
  const glitch = phase === "glitch";
  const charging = phase === "idle" && charge > 0;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-cyan-500/20 blur-2xl transition-colors duration-700"
        style={active ? { backgroundColor: "rgba(132, 204, 22, 0.22)" } : undefined}
      />
      <div
        onClick={handleClick}
        data-phase={phase}
        style={{
          "--eg-charge": charge,
          ...(charging
            ? {
                boxShadow: `0 0 ${12 + charge * 44}px rgba(34, 211, 238, ${0.12 + charge * 0.5})`,
                borderColor: `rgba(34, 211, 238, ${0.2 + charge * 0.6})`,
              }
            : {}),
        }}
        className={`eg-photo relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-white/5 shadow-2xl shadow-cyan-950/40 ${
          charging ? "eg-photo--charging" : ""
        } ${glitch ? "eg-photo--glitch" : ""} ${active ? "eg-photo--active" : ""}`}
      >
        <img
          src="/Foto.webp"
          alt="Jesús Pérez Bañobre"
          draggable="false"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="800"
          height="800"
          className="eg-img aspect-square w-full select-none object-cover"
        />

        {/* Capas RGB del glitch: solo montadas durante la transición */}
        {glitch && (
          <>
            <img src="/Foto.webp" alt="" aria-hidden="true" className="eg-rgb eg-rgb--r aspect-square w-full object-cover" />
            <img src="/Foto.webp" alt="" aria-hidden="true" className="eg-rgb eg-rgb--c aspect-square w-full object-cover" />
          </>
        )}

        {(glitch || active) && <div aria-hidden="true" className="eg-scanlines" />}

        {active && (
          <>
            <div aria-hidden="true" className="eg-tint" />
            <Glasses />
            <Joint />
            <span className="eg-badge font-mono">420_MODE: ON</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePhoto;
