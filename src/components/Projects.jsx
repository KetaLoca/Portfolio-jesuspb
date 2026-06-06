import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';

const Projects = () => {
    const swiperRef = useRef(null);

    const projects = [
        {
            id: 1,
            title: "Keta-MC / Minecraft Platform",
            tag: "Platform",
            description: "Plataforma self-hosted para crear y operar servidores Minecraft en Kubernetes. Combina API TypeScript/Express, RBAC multi-organización, PostgreSQL, Redis/BullMQ, worker reconciliador y frontend React. Los servidores Vanilla y Forge se provisionan en mi cluster bare metal y quedan accesibles por subdominio propio.",
            image: "/CapturaPlataforma.png",
            demoUrl: "https://minecraft-platform.apps.ketaloca.dev",
        },
        {
            id: 7,
            title: "ai-agent-helm-charts",
            tag: "Security",
            description: "Colección de Helm charts community para desplegar agentes de IA (Hermes, OpenClaw) en Kubernetes con seguridad por defecto: pods sin privilegios (runAsNonRoot, capabilities drop ALL, seccomp), sin exposición pública, secrets externos e imágenes ancladas por digest. Publicados en OCI registry y GitHub Pages, con CI, escaneo Trivy y actualizaciones vía Renovate.",
            image: "/helm-charts.svg",
            repoUrl: "https://github.com/KetaLoca/ai-agent-helm-charts",
        },
        {
            id: 8,
            title: "Spec-Driven Agent Harness",
            tag: "AI Tooling",
            description: "Harness multi-agente para spec-driven development que coordina Claude Code, Codex, Gemini y Copilot sobre un mismo contrato: los agentes implementan specs pequeñas a través de un pipeline con gates de calidad (arquitectura y revisión obligatorias) y límites de scope. Más que usar IA, una metodología para industrializar el desarrollo asistido por agentes.",
            image: "/ia-harness.svg",
            repoUrl: "https://github.com/KetaLoca/IA_Harness-SDD-",
        },
        {
            id: 2,
            title: "CrazyWeekEnd - FRONTEND",
            tag: "Frontend",
            description: "Frontend de una plataforma de alquiler de casas rurales, construido con React, routing y gestión de estado, consumiendo la API del proyecto.",
            image: "/frontend-buscador.png",
        },
        {
            id: 3,
            title: "CrazyWeekEnd - BACKEND",
            tag: "Backend",
            description: "API REST construida con ExpressJS y PostgreSQL, aplicando buenas prácticas de arquitectura, autenticación, integridad de datos y separación clara de responsabilidades.",
            image: "/backend.png",
        },
        {
            id: 4,
            title: "Cluster Kubernetes personal (IaC)",
            tag: "Platform",
            description: "Cluster Kubernetes que provisiono con Terraform y configuro con Ansible, con GitOps sobre ArgoCD, TLS automático y dominios propios. Es la base sobre la que despliego el resto de mis proyectos.",
            image: "/kubernetes.png",
        },
        {
            id: 5,
            title: "PORTFOLIO - Jesús Pérez Bañobre",
            tag: "Portfolio",
            description: 'Este mismo portfolio: React, empaquetado con Docker y desplegado en mi cluster Kubernetes personal.',
            image: "/portfolio.png",
        },

        {
            id: 6,
            title: "CrazyWeekEnd - Android APP",
            tag: "Mobile",
            description: "Mi TFG: app nativa de Android (Kotlin + Firebase) para reserva de casas rurales. Anterior a la versión web y con menos funcionalidades.",
            image: "/FutureMainActivity.png",
        }
    ];

    const swiperProps = {
        modules: [Pagination],
        spaceBetween: 30,
        pagination: { clickable: true },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
        className: "w-full py-10"
    };

    return (
        <section id='proyectos' className="w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-16 md:py-20">
            <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
                <div className="mb-10 flex items-end justify-between gap-6 md:mb-12">
                    <div className="max-w-3xl">
                        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
                            Proyectos
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                            Proyectos propios sobre mi propia infraestructura
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
                            Una selección de trabajo propio entre producto, backend e infraestructura.
                            Varios siguen desplegados y accesibles en mi cluster personal.
                        </p>
                    </div>
                    <div className="hidden shrink-0 gap-3 md:flex">
                        <button
                            type="button"
                            aria-label="Proyecto anterior"
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cyan-200 transition-colors hover:border-cyan-300/40 hover:bg-white/10"
                        >
                            <FaChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            aria-label="Proyecto siguiente"
                            onClick={() => swiperRef.current?.slideNext()}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cyan-200 transition-colors hover:border-cyan-300/40 hover:bg-white/10"
                        >
                            <FaChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <Swiper {...swiperProps} onSwiper={(swiper) => { swiperRef.current = swiper; }}>
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div className="mb-12 mt-2 flex min-h-[560px] flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur">
                                <div className="relative h-60">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                    <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur">
                                        {project.tag}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-300 md:text-base">{project.description}</p>
                                    {(project.demoUrl || project.repoUrl) ? (
                                        <div className="mt-auto flex flex-col gap-3 pt-6">
                                            {project.demoUrl ? (
                                                <a
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                                                >
                                                    Probar plataforma
                                                    <FaExternalLinkAlt className="h-3 w-3" />
                                                </a>
                                            ) : null}
                                            {project.repoUrl ? (
                                                <a
                                                    href={project.repoUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-cyan-200 transition-colors hover:border-cyan-300/40 hover:bg-white/10"
                                                >
                                                    Ver en GitHub
                                                    <FaGithub className="h-4 w-4" />
                                                </a>
                                            ) : null}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                    <FaArrowRight className="text-cyan-300" />
                    Desliza para ver más proyectos.
                </div>
            </div>
        </section>
    );
};

export default Projects;
