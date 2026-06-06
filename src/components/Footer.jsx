import { FaArrowUp, FaEnvelope, FaGithub, FaPhone } from "react-icons/fa";

/**
 * Cierre de la página: identidad, contacto rápido y "volver arriba".
 * Translúcido sobre la atmósfera global (sin fondo opaco, igual que las
 * secciones). Tap targets de 44px para táctil.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { href: "mailto:xesuspb@gmail.com", icon: <FaEnvelope />, label: "Email" },
    { href: "tel:+34647736793", icon: <FaPhone />, label: "Teléfono" },
    {
      href: "https://github.com/KetaLoca",
      icon: <FaGithub />,
      label: "GitHub",
      external: true,
    },
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full border-t border-white/10 py-12">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
              Platform Engineer
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              Jesús Pérez Bañobre
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Backend · Plataforma · DevOps
            </p>
          </div>

          <div className="flex items-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
              >
                {link.icon}
              </a>
            ))}
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Volver arriba"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-200 transition-colors hover:bg-cyan-500/20"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Jesús Pérez Bañobre. Todos los derechos reservados.</p>
          <p>Hecho con React · desplegado en Kubernetes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
