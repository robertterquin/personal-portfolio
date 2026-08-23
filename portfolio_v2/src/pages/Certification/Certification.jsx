import { useEffect, useState, useRef, useCallback } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';

const Certification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);
  const [particles] = useState(() => [...Array(25)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 25 + 20,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.2 + 0.05,
  })));
  const [shapes] = useState(() => [...Array(8)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 120 + 60,
    rotation: Math.random() * 360,
    duration: Math.random() * 35 + 25,
    delay: Math.random() * 6,
  })));
  const sectionRef = useRef(null);

  const certifications = [
    {
      id: 1,
      title: "National Programming Challenge 2024",
      image: "/certificates/codechum-2024.png",
      icon: "🏆",
      color: "codechum"
    },
    {
      id: 2,
      title: "PowerPoint 2019 Associate",
      image: "/certificates/microsoft-powerpoint-2019.jpg",
      icon: "📊",
      color: "microsoft"
    },
    {
      id: 3,
      title: "Oracle Java Foundations",
      image: "/certificates/oracle-java-foundations.jpg",
      icon: "☕",
      color: "oracle"
    },
    {
      id: 4,
      title: "IT Specialist in Databases",
      image: "/certificates/it-specialist-databases.png",
      icon: "🗄️",
      color: "itspecialist"
    },
    {
      id: 5,
      title: "HackForGov 2025 - CALABARZON",
      image: "/certificates/hackforgov-2025.jpg",
      icon: "🚀",
      color: "hackforgov"
    },
    {
      id: 6,
      title: "National Programming Challenge 2025",
      image: "/certificates/codechum-2025.jpg",
      icon: "🥇",
      color: "codechum-2025"
    },
    {
      id: 7,
      title: "HTML and CSS Specialist",
      image: "/certificates/html-css-specialist.png",
      icon: "🌐",
      color: "htmlcss"
    },
    {
      id: 8,
      title: "Cybersecurity Specialist",
      image: "/certificates/cybersecurity-specialist.png",
      icon: "🔒",
      color: "cybersecurity"
    },
  ];

  const certificateOrder = {
    'HackForGov 2025 - CALABARZON': 0,
    'PowerPoint 2019 Associate': 1,
    'Oracle Java Foundations': 2,
    'IT Specialist in Databases': 3,
    'HTML and CSS Specialist': 4,
    'Cybersecurity Specialist': 5,
    'National Programming Challenge 2024': 98,
    'National Programming Challenge 2025': 99,
  };

  const sortedCertifications = [...certifications].sort((a, b) => {
    const orderA = certificateOrder[a.title] ?? 50;
    const orderB = certificateOrder[b.title] ?? 50;
    return orderA - orderB;
  });

  const handleNext = useCallback(() => {
    setSelectedCertIndex((prev) => (prev + 1) % sortedCertifications.length);
  }, [sortedCertifications.length]);

  const handlePrev = useCallback(() => {
    setSelectedCertIndex((prev) => (prev - 1 + sortedCertifications.length) % sortedCertifications.length);
  }, [sortedCertifications.length]);

  const handleClose = useCallback(() => {
    setSelectedCertIndex(null);
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedCertIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCertIndex, handleClose, handleNext, handlePrev]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="certification" 
      className="page-shell page-shell--certification min-h-screen text-white py-32 px-8 md:px-16 lg:px-24 relative overflow-hidden"
    >
      {/* Page Transition Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none z-20"></div>

      {/* Animated Background - Hexagonal Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
              animation: `float ${shape.duration}s ease-in-out infinite`,
              animationDelay: `${shape.delay}s`,
            }}
          >
            {/* Outer rotating hexagon outline */}
            <div className="absolute inset-0" style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              border: `2px solid rgba(163, 163, 163, 0.25)`,
              animation: `spin ${shape.duration * 1.3}s linear infinite`,
              boxShadow: `0 0 20px rgba(163, 163, 163, 0.15)`,
            }}></div>
            
            {/* Inner rotating hexagon */}
            <div className="absolute inset-4" style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              border: `1.5px solid rgba(212, 212, 212, 0.2)`,
              animation: `spin-reverse ${shape.duration * 1.6}s linear infinite`,
              boxShadow: `0 0 15px rgba(212, 212, 212, 0.12)`,
            }}></div>

            {/* Middle accent hexagon */}
            <div className="absolute inset-2" style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              border: `1px solid rgba(115, 115, 115, 0.12)`,
              animation: `spin ${shape.duration * 0.8}s linear infinite`,
            }}></div>
            
            {/* Center accent dot with glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-mono-600/40 rounded-full blur-sm" style={{
              boxShadow: `0 0 12px rgba(163, 163, 163, 0.5), 0 0 24px rgba(163, 163, 163, 0.25)`
            }}></div>
          </div>
        ))}
      </div>

      {/* Elegant Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/3 left-1/4 w-150 h-150 bg-conic from-mono-400/10 via-mono-300/06 to-mono-400/10 rounded-full blur-[130px] animate-pulse" style={{animationDuration: '18s'}}></div>
        <div className="absolute -bottom-1/4 right-1/4 w-125 h-125 bg-radial from-mono-300/12 via-mono-400/08 to-transparent rounded-full blur-[110px] animate-pulse" style={{animationDuration: '14s', animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-0 w-100 h-100 bg-conic from-mono-400/06 via-mono-300/04 to-transparent rounded-full blur-[100px] animate-pulse" style={{animationDuration: '20s', animationDelay: '6s'}}></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.id % 4 === 0 ? 'rgba(163, 163, 163, 0.5)' : particle.id % 4 === 1 ? 'rgba(212, 212, 212, 0.45)' : particle.id % 4 === 2 ? 'rgba(115, 115, 115, 0.5)' : 'rgba(82, 82, 82, 0.4)',
              opacity: particle.opacity * 1.2,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.id % 4 === 0 ? 'rgba(163, 163, 163, 0.4)' : particle.id % 4 === 1 ? 'rgba(212, 212, 212, 0.35)' : particle.id % 4 === 2 ? 'rgba(115, 115, 115, 0.35)' : 'rgba(82, 82, 82, 0.3)'}`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-350 mx-auto w-full">
        
        {/* Header Section */}
        <Motion.div
          className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-mono-600 to-transparent"></div>
            <span className="font-mono text-mono-700 text-xs uppercase tracking-[0.3em] font-semibold">Credentials</span>
          </div>
          
          {/* Main Title */}
          <div className="grid grid-cols-1 items-start">
            <div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-4">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-600 via-mono-800 to-mono-950 animate-gradient">Certified</span>
                <br className="lg:hidden" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-950 to-mono-800">Excellence</span>
              </h2>
              <div className="h-1 w-20 bg-linear-to-r from-mono-500 via-mono-600 to-mono-700 rounded-full mt-6"></div>
            </div>
          </div>
        </Motion.div>

        {/* Certifications Grid */}
        <Motion.div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
        >
          {sortedCertifications.map((cert, index) => (
            <Motion.div
              key={cert.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${cert.title} certificate`}
              onClick={() => setSelectedCertIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCertIndex(index);
                }
              }}
              className="group relative min-w-0 cursor-pointer overflow-hidden border border-dashed border-neutral-700/70 bg-neutral-900/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-900/95 focus:outline-none focus:ring-2 focus:ring-mono-500/50"
              style={{
                transitionDelay: `${200 + index * 100}ms`,
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -4, scale: 1.015 }}
              transition={{ duration: 0.2, delay: index * 0.08, ease: 'easeOut' }}
            >
              <div className="relative flex h-full flex-col items-center text-center">
                {/* Certificate Image */}
                <div 
                  className="relative mb-4 w-full overflow-hidden border border-neutral-700/70 bg-neutral-950/50 p-2"
                  style={{ background: 'rgba(10, 10, 10, 0.5)' }}
                >
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full border border-white/20 bg-neutral-900/90 px-3 py-1.5 font-mono text-xs font-medium text-white shadow-lg backdrop-blur-xs">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      View Fullscreen
                    </span>
                  </div>
                </div>

                {/* Certificate Title */}
                <h3 className="text-sm font-bold text-center text-white transition-colors group-hover:text-mono-800">
                  {cert.title}
                </h3>

                {/* Hover Shimmer Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-500 pointer-events-none"></div>
              </div>
            </Motion.div>
          ))}
        </Motion.div>

        {/* Bottom CTA */}
        <Motion.div
          className={`mt-16 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-gray-400 text-sm">Continuously expanding knowledge and expertise</p>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-mono-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-mono-700 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-mono-800 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </Motion.div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedCertIndex !== null && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={handleClose}
          >
            {/* Modal Container */}
            <Motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative flex max-h-[92vh] max-w-5xl flex-col items-center rounded-2xl border border-neutral-700 bg-neutral-950 p-4 shadow-2xl sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar: Title & Close Button */}
              <div className="flex w-full items-center justify-between gap-4 border-b border-neutral-800 pb-3">
                <div className="min-w-0">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-mono-600">
                    Credential {selectedCertIndex + 1} of {sortedCertifications.length}
                  </span>
                  <h3 className="truncate text-base font-bold text-white sm:text-lg">
                    {sortedCertifications[selectedCertIndex].title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close certificate preview"
                  className="rounded-lg border border-neutral-700 bg-neutral-900 p-2 text-gray-400 transition-colors hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* High-Resolution Certificate Image */}
              <div className="relative my-4 flex max-h-[70vh] w-full items-center justify-center overflow-hidden rounded-lg bg-black/40 p-2">
                <img
                  src={sortedCertifications[selectedCertIndex].image}
                  alt={sortedCertifications[selectedCertIndex].title}
                  className="max-h-[68vh] w-auto max-w-full rounded object-contain shadow-md"
                />
              </div>

              {/* Navigation Controls */}
              <div className="flex w-full items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 font-mono text-xs text-gray-300 transition-colors hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <span className="font-mono text-xs text-gray-500">
                  Use arrow keys (← / →) or Esc to close
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 font-mono text-xs text-gray-300 transition-colors hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
                >
                  Next
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Page Transition Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Certification;
