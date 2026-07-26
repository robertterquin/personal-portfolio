import { useEffect, useState, useRef } from 'react';
import { motion as Motion } from 'motion/react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles] = useState(() => [...Array(15)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 30 + 25,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.15 + 0.05,
  })));
  const sectionRef = useRef(null);

  // Placeholder projects - ready for future content
  const projects = [
    {
      id: 1,
      title: "ONCOSENSE",
      tagline: "Cancer awareness starts here",
      description: "A Flutter-based mobile platform for cancer education, prevention tips, community support, and resources.",
      type: "Health App",
      platform: "mobile",
      year: "2025",
      featured: true,
      gradient: "from-pink-100 via-rose-50 to-pink-50",
      accentColor: "text-pink-600",
      preview: "/projects/oncosense-showcase.png"
    },
    {
      id: 2,
      title: "Chainly",
      tagline: "Ride smarter, maintain better",
      description: "Flutter-based mobile application to help cyclists track bike maintenance, schedule service reminders, and manage maintenance costs for safer rides.",
      type: "Lifestyle App",
      platform: "mobile",
      year: "2025",
      featured: false,
      gradient: "from-blue-100 via-cyan-50 to-teal-50",
      accentColor: "text-blue-600",
      preview: "/projects/chainly-showcase.png"
    },
    {
      id: 3,
      title: "RideTrack",
      tagline: "Track every ride, reach every goal",
      description: "Flutter-based mobile application designed to help cyclists track rides, monitor performance goals, and analyze riding statistics for efficient cycling.",
      type: "Fitness App",
      platform: "mobile",
      year: "2025",
      featured: false,
      gradient: "from-orange-100 via-blue-50 to-cyan-50",
      accentColor: "text-orange-600",
      preview: "/projects/ridetrack-showcase.png"
    },
    {
      id: 4,
      title: "Spendly",
      tagline: "Budget smarter, live simpler",
      description: "A budget tracking app designed to help people monitor spending, manage accounts, and make better financial decisions.",
      type: "Budget App",
      platform: "mobile",
      year: "2026",
      featured: false,
      gradient: "from-slate-100 via-blue-50 to-cyan-50",
      accentColor: "text-blue-600",
      preview: "/projects/spendly.png"
    },
  ];

  const mobileProjects = projects.filter((project) => project.platform === 'mobile');
  const webPlaceholders = [
    { id: 'web-placeholder-1', label: 'Web Project 01' },
    { id: 'web-placeholder-2', label: 'Web Project 02' },
  ];

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
      id="projects" 
      className="page-shell page-shell--projects min-h-screen text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 relative overflow-hidden"
    >
      {/* Page Transition Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none z-20"></div>
      {/* Background Grid Pattern - Elegant */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 96%, rgba(163, 163, 163, 0.08) 98%, transparent 100%),
            linear-gradient(0deg, transparent 96%, rgba(163, 163, 163, 0.08) 98%, transparent 100%),
            linear-gradient(45deg, transparent 95%, rgba(115, 115, 115, 0.04) 96%, transparent 97%)
          `,
          backgroundSize: '120px 120px, 120px 120px, 170px 170px',
        }}></div>
      </div>

      {/* Elegant Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Primary Orb - Top Right */}
        <div className="absolute -top-1/3 right-[-10%] w-150 h-150 bg-conic from-mono-400/06 via-mono-300/04 via-mono-400/06 to-mono-400/06 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '15s'}}></div>
        
        {/* Secondary Orb - Bottom Left */}
        <div className="absolute -bottom-1/4 left-[-5%] w-125 h-125 bg-radial from-mono-400/08 via-mono-300/04 to-transparent rounded-full blur-[100px] animate-pulse" style={{animationDuration: '12s', animationDelay: '2s'}}></div>
        
        {/* Tertiary Orb - Center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-100 h-100 bg-radial from-mono-300/04 via-mono-300/03 to-transparent rounded-full blur-[90px] animate-pulse" style={{animationDuration: '18s', animationDelay: '4s'}}></div>
      </div>

      {/* Elegant Floating Particles */}
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
              background: particle.id % 3 === 0 ? 'rgba(163, 163, 163, 0.4)' : particle.id % 3 === 1 ? 'rgba(212, 212, 212, 0.3)' : 'rgba(115, 115, 115, 0.35)',
              opacity: particle.opacity * 0.8,
              boxShadow: `0 0 ${particle.size * 2}px rgba(163, 163, 163, 0.2)`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Elegant Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Flowing Line Top */}
        <div className="absolute top-1/4 left-0 w-1/2 h-px bg-linear-to-r from-transparent via-mono-400/15 to-transparent blur-sm"></div>
        
        {/* Flowing Line Bottom */}
        <div className="absolute bottom-1/3 right-0 w-2/5 h-px bg-linear-to-l from-transparent via-mono-400/15 to-transparent blur-sm"></div>
        
        {/* Accent Dots - Top */}
        <div className="absolute top-1/3 left-10 w-1.5 h-1.5 bg-mono-600/30 rounded-full blur-sm"></div>
        <div className="absolute top-2/3 right-20 w-1 h-1 bg-mono-500/25 rounded-full blur-sm"></div>
        
        {/* Subtle Diagonal Lines */}
        <div className="absolute top-0 right-1/4 w-64 h-64 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(163, 163, 163, 0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-400 mx-auto w-full">
        
        {/* Header Section - Enhanced layout */}
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
            <span className="font-mono text-mono-700 text-xs uppercase tracking-[0.3em] font-semibold">Portfolio</span>
          </div>
          
          {/* Main Title */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-4">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-600 via-mono-800 to-mono-950 animate-gradient">Crafted</span>
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-950 to-mono-800">Projects</span>
              </h2>
              <div className="h-1 w-20 bg-linear-to-r from-mono-500 via-mono-600 to-mono-700 rounded-full mt-6"></div>
            </div>
            
            <div className="space-y-6 lg:pt-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                A showcase of mobile and web applications built with modern technologies. Each project represents growth, learning, and a commitment to quality development.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg border border-gray-800/50 bg-linear-to-br from-mono-200/05 to-transparent backdrop-blur-sm hover:border-mono-400/30 transition-colors">
                  <div className="text-2xl font-bold text-mono-700">4</div>
                  <div className="text-sm text-gray-400">Featured Works</div>
                </div>
                <div className="p-4 rounded-lg border border-gray-800/50 bg-linear-to-br from-mono-200/05 to-transparent backdrop-blur-sm hover:border-mono-400/30 transition-colors">
                  <div className="text-2xl font-bold text-mono-700">2026</div>
                  <div className="text-sm text-gray-400">Current Year</div>
                </div>
              </div>
            </div>
          </div>
        </Motion.div>

        <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/10 pb-3">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-mono-600">01</p>
            <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Mobile Applications</h3>
          </div>
          <span className="font-mono text-sm text-gray-500">{String(mobileProjects.length).padStart(2, '0')} projects</span>
        </div>

        {/* Mobile Project Gallery */}
        <Motion.div
          className={`mx-auto grid w-full max-w-320 grid-cols-1 gap-6 transition-all duration-700 delay-200 sm:grid-cols-2 lg:gap-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
        >
          {mobileProjects.map((project, index) => (
            <Motion.div
              key={project.id}
              className="group relative min-w-0 overflow-hidden rounded-xl border border-white/20 bg-gray-950 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.35)] ring-2 ring-gray-950/70 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gray-400/80 hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] sm:p-4"
              style={{ transitionDelay: `${200 + index * 80}ms` }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-950 to-black opacity-95"></div>
              
              {/* Sparkle Effects */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.3}s`,
                      opacity: 0.6,
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative flex aspect-[16/10] items-center justify-center">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-gray-900/20 bg-black/10 p-2 transition-transform duration-500 ease-out group-hover:scale-[1.015] sm:p-3">
                  <img
                    src={project.preview}
                    alt={`${project.title} app showcase`}
                    className="block h-full w-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-gray-950/90 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </Motion.div>
          ))}
        </Motion.div>

        {/* Web Projects Section */}
        <Motion.div
          className={`mt-14 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/10 pb-3">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-mono-600">02</p>
              <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Web Applications</h3>
            </div>
            <span className="font-mono text-sm text-gray-500">02 placeholders</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {webPlaceholders.map((project) => (
              <div key={project.id} className="flex min-h-40 flex-col justify-between border border-dashed border-gray-700/80 bg-black/10 p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-600">In progress</span>
                  <span className="text-xs text-gray-600">Web</span>
                </div>
                <h4 className="mt-8 text-xl font-medium text-gray-300">{project.label}</h4>
              </div>
            ))}
          </div>
        </Motion.div>
      </div>

      {/* Page Transition Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Projects;
