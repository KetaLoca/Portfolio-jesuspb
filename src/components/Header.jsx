import React from 'react';
import { useState, useRef } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');
    const headerRef = useRef(null);

    const sections = [
        { id: 'sobre-mi', name: 'Sobre mí' },
        { id: 'proyectos', name: 'Proyectos' },
        { id: 'tecnologias', name: 'Tecnologías' },
        { id: 'formacion', name: 'Formación' },
        { id: 'experiencia', name: 'Experiencia' },
    ];

    // const handleScroll = (sectionId) => {
    //     const section = document.getElementById(sectionId);
    //     if (section) {
    //         section.scrollIntoView({ behavior: 'smooth' });
    //         setActiveSection(sectionId);
    //     }
    // };

    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const headerHeight = headerRef.current?.offsetHeight || 0;
          const sectionPosition = section.offsetTop - headerHeight;
          
          window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
          });
        }
      };

    return (
        <header ref={headerRef} className="fixed w-full top-0 left-0 z-50 bg-blue-900/70 backdrop-blur-sm">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 relative">
                    {/* Botón Hamburguesa (izquierda) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Texto/Logo Centrado (solo móvil) */}
                    <span className="md:hidden absolute left-1/2 -translate-x-1/2 text-xl font-bold text-white-900">
                        Jesús Pérez Bañobre
                    </span>

                    {/* Menú Desktop (centrado) */}
                    <div className="hidden md:flex justify-center flex-1 space-x-8">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => handleScroll(section.id)}
                                className={`${activeSection === section.id
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-600 hover:text-indigo-600 transition-colors'
                                    } px-3 py-2 text-sm font-medium`}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menú Desplegable Mobile */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => {
                                    handleScroll(section.id);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full block px-4 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
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