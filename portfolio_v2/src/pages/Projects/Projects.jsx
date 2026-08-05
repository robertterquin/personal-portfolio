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
  const [expandedProject, setExpandedProject] = useState(null);

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
      summary: "A wellness platform that helps people learn about cancer prevention, track their health, and build supportive daily habits.",
      purpose: "Make reliable cancer-awareness resources easier to understand and turn into practical daily actions.",
      features: ["Daily health guidance", "Awareness and prevention content", "Health check-ins", "Treatment tracking"],
      technologies: ["Flutter", "Supabase"],
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
      summary: "A maintenance companion that helps cyclists keep their bikes reliable through reminders, service records, and usage tracking.",
      purpose: "Replace scattered maintenance notes with a clear system for knowing what a bike needs and when it needs it.",
      features: ["Maintenance reminders", "Service history", "Bike condition tracking", "Usage-based schedules"],
      technologies: ["Flutter", "Supabase"],
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
      summary: "A cycling companion for tracking rides, monitoring progress, and turning everyday activity into measurable goals.",
      purpose: "Give cyclists a simple way to understand their riding habits and stay motivated toward weekly targets.",
      features: ["Ride tracking", "Weekly goals", "Progress summaries", "Recent ride history"],
      technologies: ["Flutter", "Supabase"],
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
      summary: "A personal finance companion for monitoring spending, organizing accounts, and making clearer day-to-day budget decisions.",
      purpose: "Bring balances, transactions, and spending insights into one focused mobile experience.",
      features: ["Balance overview", "Spending breakdowns", "Account management", "AI budget assistant"],
      technologies: ["Flutter", "Supabase"],
      preview: "/projects/spendly-showcase.png"
    },
  ];

  const mobileProjects = projects.filter((project) => project.platform === 'mobile');
  const webPlaceholders = [
    {
      id: 'web-placeholder-1',
      label: 'Hunch',
      image: '/projects/hunch-showcase.png',
      summary: 'An AI-powered safety checker for evaluating OJT and internship opportunities.',
      purpose: 'Help students inspect job and internship listings for warning signs before sharing information or accepting an opportunity.',
      features: ['Listing analysis', 'Scam signal detection', 'Evidence-based results', 'Safety checklist'],
      technologies: ['React', 'TypeScript', 'AI integration'],
      liveUrl: 'https://hunchh.vercel.app/',
    },
    {
      id: 'web-placeholder-2',
      label: 'Hapag',
      image: '/projects/hapag-showcase.png',
      summary: 'An AI-powered Filipino meal assistant that helps people decide what to cook from the ingredients they have.',
      purpose: 'Make everyday meal planning easier by combining available ingredients, preferences, and practical cooking guidance.',
      features: ['Ingredient-based meal suggestions', 'Preference-aware recommendations', 'Filipino meal guidance', 'AI cooking assistant'],
      technologies: ['React', 'TypeScript', 'AI integration'],
      liveUrl: '',
    },
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
          <div className="grid grid-cols-1 items-start">
            <div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-4">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-600 via-mono-800 to-mono-950 animate-gradient">Crafted</span>
                <br className="lg:hidden" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-950 to-mono-800">Projects</span>
              </h2>
              <div className="h-1 w-20 bg-linear-to-r from-mono-500 via-mono-600 to-mono-700 rounded-full mt-6"></div>
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
          className={`mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 transition-all duration-700 delay-200 sm:grid-cols-2 lg:gap-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
        >
          {mobileProjects.map((project, index) => (
            <Motion.article
              key={project.id}
              className="group relative min-w-0 overflow-hidden border border-dashed border-neutral-700/70 bg-neutral-900/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:border-neutral-400/80 hover:bg-neutral-900/95"
              style={{ transitionDelay: `${200 + index * 80}ms` }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -3, scale: 1.015 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="relative flex items-center justify-center">
                <div className="flex w-full items-center justify-center overflow-hidden border border-neutral-700/70 bg-neutral-950/50 p-2 transition-transform duration-500 ease-out group-hover:scale-[1.015]">
                  <img
                    src={project.preview}
                    alt={`${project.title} app showcase`}
                    className="block h-auto w-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              <h4 className="mt-6 text-xl font-medium text-gray-200">{project.title}</h4>

              <button
                type="button"
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                aria-expanded={expandedProject === project.id}
                className="mt-6 inline-flex items-center gap-2 border border-neutral-700/70 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-neutral-400 hover:text-white"
              >
                {expandedProject === project.id ? 'Hide case study' : 'View case study'}
                <svg className={`h-4 w-4 transition-transform ${expandedProject === project.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedProject === project.id && (
                <Motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="mt-6 overflow-hidden border-t border-neutral-700/70 pt-5"
                >
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{project.summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500"><span className="text-gray-300">Purpose:</span> {project.purpose}</p>
                  <div className="mt-4">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Key features</p>
                    <ul className="mt-3 grid gap-2 text-sm text-gray-400 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 bg-mono-600" aria-hidden="true"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="border border-neutral-700/70 px-2 py-1 font-mono text-xs text-gray-400">
                        {technology}
                      </span>
                    ))}
                  </div>
                </Motion.div>
              )}
            </Motion.article>
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
            <span className="font-mono text-sm text-gray-500">02 projects</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {webPlaceholders.map((project) => {
              const isExpanded = expandedProject === project.id;

              return (
              <Motion.article
                key={project.id}
                className="group flex h-fit min-h-40 w-full self-start flex-col justify-between border border-dashed border-neutral-700/70 bg-neutral-900/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-neutral-400/80 hover:bg-neutral-900/95"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {project.image && (
                  <div className="mb-6 overflow-hidden border border-neutral-700/70 bg-neutral-950/50 p-2">
                    <img src={project.image} alt={`${project.label} web project showcase`} className="block h-auto w-full object-contain" />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {!project.image && (
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-600">In progress</span>
                    )}
                    <h4 className={`${project.image ? '' : 'mt-8'} text-xl font-medium text-gray-200`}>{project.label}</h4>
                  </div>
                  <span className="shrink-0 text-xs text-gray-600">Web</span>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                  aria-expanded={isExpanded}
                  className="mt-6 inline-flex items-center gap-2 self-start border border-neutral-700/70 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-neutral-400 hover:text-white"
                >
                  {isExpanded ? 'Hide case study' : 'View case study'}
                  <svg className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <Motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="mt-6 overflow-hidden border-t border-neutral-700/70 pt-5"
                  >
                    <p className="text-sm leading-relaxed text-gray-400">{project.summary}</p>
                    {project.purpose && (
                      <p className="mt-3 text-sm leading-relaxed text-gray-500"><span className="text-gray-300">Purpose:</span> {project.purpose}</p>
                    )}
                    {project.features && (
                      <div className="mt-4">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Key features</p>
                        <ul className="mt-3 grid gap-2 text-sm text-gray-400 sm:grid-cols-2">
                          {project.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <span className="mt-2 h-1 w-1 shrink-0 bg-mono-600" aria-hidden="true"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span key={technology} className="border border-neutral-700/70 px-2 py-1 font-mono text-xs text-gray-400">
                          {technology}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {project.liveUrl ? (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-white">
                          Live Demo
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="border border-neutral-800 px-3 py-2 text-sm text-gray-600">Live Demo coming soon</span>
                      )}
                    </div>
                  </Motion.div>
                )}
              </Motion.article>
              );
            })}
          </div>
        </Motion.div>
      </div>

      {/* Page Transition Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Projects;
