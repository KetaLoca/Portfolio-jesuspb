import { useEffect, useRef, useState } from 'react';

const sections = [
    { id: 'sobre-mi', name: 'Sobre mí' },
    { id: 'experiencia', name: 'Experiencia' },
    { id: 'tecnologias', name: 'Tecnologías' },
    { id: 'proyectos', name: 'Proyectos' },
    { id: 'formacion', name: 'Formación' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('sobre-mi');
    // Medimos la BARRA (h-16, altura fija) y no el <header> completo: en móvil,
    // con el menú abierto, el header crece con la lista de enlaces y falsearía
    // el offset de scroll (saltos a posición incorrecta al pulsar un enlace).
    const barRef = useRef(null);

    useEffect(() => {
        const updateActiveSection = () => {
            const headerHeight = barRef.current?.offsetHeight || 0;
            const scrollPosition = window.scrollY + headerHeight + 120;

            let currentSection = sections[0].id;

            sections.forEach((section) => {
                const element = document.getElementById(section.id);

                if (element && scrollPosition >= element.offsetTop) {
                    currentSection = section.id;
                }
            });

            setActiveSection(currentSection);
        };

        updateActiveSection();
        window.addEventListener('scroll', updateActiveSection, { passive: true });
        window.addEventListener('resize', updateActiveSection);

        return () => {
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('resize', updateActiveSection);
        };
    }, []);

    const handleScroll = (sectionId, event) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = barRef.current?.offsetHeight || 0;
            // Cada sección lleva un padding superior amplio (pt-28/pt-36). Si saltamos
            // al borde de la sección, ese padding queda como banda vacía bajo el header.
            // Consumimos ese padding y dejamos solo un hueco cómodo y constante.
            const paddingTop = parseFloat(window.getComputedStyle(section).paddingTop) || 0;
            const gap = 28;
            const sectionPosition = Math.max(
                section.offsetTop + paddingTop - headerHeight - gap,
                0
            );

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });

            setActiveSection(sectionId);
        }

        event?.currentTarget?.blur();
    };

    return (
        <>
            <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <nav className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
                <div ref={barRef} className="flex items-center h-16 relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={isMenuOpen}
                        className="-ml-1 rounded-lg p-2.5 text-slate-200 hover:bg-white/10 focus:outline-none md:hidden"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-[0.2em] text-slate-100 md:hidden">
                        PLATFORM ENGINEER
                    </span>

                    <div className="hidden flex-1 justify-center gap-3 md:flex">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={(e) => handleScroll(section.id, e)}
                                className={`${activeSection === section.id
                                    ? 'bg-cyan-400 text-slate-950'
                                    : 'text-slate-200 hover:bg-white/10 hover:text-white transition-colors'
                                    } rounded-full px-4 py-2 text-sm font-medium`}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>
                </div>

                </nav>
            </header>

            {isMenuOpen && (
                <div className="md:hidden">
                    {/* Overlay a viewport completo: atenúa el contenido y cierra al
                        tocar fuera. Va FUERA del <header> a propósito: su
                        backdrop-blur crea un containing block que atraparía un hijo
                        `fixed`, recortándolo a la altura del header y dejando sin
                        cubrir el contenido inferior. */}
                    <div
                        className="fixed inset-x-0 bottom-0 top-16 z-40 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />
                    {/* Panel sólido anclado bajo la barra (no transparenta el fondo). */}
                    <div className="fixed inset-x-0 top-16 z-50 border-t border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40">
                        <div className="mx-auto max-w-[1360px] space-y-2 px-4 py-4 sm:px-6">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={(event) => {
                                        handleScroll(section.id, event);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block w-full rounded-lg border px-4 py-3 text-left text-base transition-colors ${activeSection === section.id
                                        ? 'border-cyan-400/40 bg-cyan-400/15 text-cyan-100'
                                        : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                                        }`}
                                >
                                    {section.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
