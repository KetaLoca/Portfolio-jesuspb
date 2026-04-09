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
    const headerRef = useRef(null);

    useEffect(() => {
        const updateActiveSection = () => {
            const headerHeight = headerRef.current?.offsetHeight || 0;
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
            const headerHeight = headerRef.current?.offsetHeight || 0;
            const sectionPosition = section.offsetTop - headerHeight;

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });

            setActiveSection(sectionId);
        }

        event?.currentTarget?.blur();
    };

    return (
        <header ref={headerRef} className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <nav className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-lg p-2 text-slate-200 hover:bg-white/10 focus:outline-none md:hidden"
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
                                    ? 'bg-white text-slate-950'
                                    : 'text-slate-200 hover:bg-white/10 hover:text-white transition-colors'
                                    } rounded-full px-4 py-2 text-sm font-medium`}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="space-y-2 pb-4 md:hidden">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={(event) => {
                                    handleScroll(section.id, event);
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-slate-200 transition-colors hover:bg-white/10"
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
