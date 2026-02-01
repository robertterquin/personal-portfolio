import { useEffect, useState, useRef } from 'react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);

  // Placeholder projects - ready for future content
  const projects = [
    {
      id: 1,
      title: "Sweet Jewels",
      tagline: "Turn your cravings into sweet memories!",
      description: "Cakes & pastries ordering app with beautiful product showcases and seamless ordering flow",
      type: "Mobile App",
      year: "2025",
      featured: true,
      gradient: "from-pink-300 via-purple-200 to-pink-100",
      accentColor: "text-pink-500",
      image: null, // Add your image path here
    },
    {
      id: 2,
      title: "LabGenius",
      tagline: "Embark on an adventure!",
      description: "Game-based learning app for interactive education",
      type: "EdTech App",
      year: "2025",
      featured: false,
      gradient: "from-cyan-200 via-blue-100 to-teal-100",
      accentColor: "text-cyan-500",
      image: null,
    },
    {
      id: 3,
      title: "Revu",
      tagline: "Make your study session more enjoyable",
      description: "Learning app with smart review features",
      type: "Learning App",
      year: "2025",
      featured: false,
      gradient: "from-blue-200 via-cyan-100 to-blue-100",
      accentColor: "text-blue-500",
      image: null,
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

    // Generate particles
    const generatedParticles = [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.15 + 0.05,
    }));
    setParticles(generatedParticles);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="min-h-screen text-white py-24 px-8 md:px-16 lg:px-24 relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, rgba(6, 182, 212, 0.5) 100%),
            linear-gradient(0deg, transparent 98%, rgba(6, 182, 212, 0.5) 100%)
          `,
          backgroundSize: '80px 80px',
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-conic from-purple-500/10 via-blue-500/5 to-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '10s'}}></div>
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-gradient-radial from-cyan-500/15 to-transparent rounded-full blur-[80px] animate-pulse" style={{animationDuration: '8s', animationDelay: '3s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-purple-400 animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        <div className="absolute bottom-32 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-purple-500/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full">
        
        {/* Header Section - Unique asymmetric layout */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-4">
            <span className="text-cyan-400 text-sm uppercase tracking-[0.4em] font-semibold">Projects</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
              <span className="text-white">Selected </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 italic">Work</span>
            </h2>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-md lg:text-right leading-relaxed">
            A curated collection of projects showcasing my approach to design and problem-solving.
          </p>
        </div>

        {/* Featured Project - Large Card */}
        <div className={`mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {projects.filter(p => p.featured).map((project) => (
            <div 
              key={project.id}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}></div>
              
              {/* Sparkle Effects */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
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

              <div className="relative p-8 md:p-12 min-h-[400px] md:min-h-[500px] flex flex-col justify-between">
                {/* Top Content */}
                <div className="text-center">
                  <h3 className={`text-3xl md:text-4xl font-bold ${project.accentColor} mb-2`}>{project.title}</h3>
                  <p className="text-gray-700 text-lg">{project.tagline}</p>
                </div>

                {/* Phone Mockups Placeholder */}
                <div className="flex justify-center items-end gap-4 my-8 flex-1">
                  <div className="w-24 md:w-32 h-48 md:h-64 bg-gray-900/80 rounded-3xl border-4 border-gray-800 shadow-2xl transform -rotate-6 translate-y-4">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">Screen 1</span>
                    </div>
                  </div>
                  <div className="w-28 md:w-40 h-56 md:h-72 bg-gray-900/90 rounded-3xl border-4 border-gray-800 shadow-2xl z-10">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">Main Screen</span>
                    </div>
                  </div>
                  <div className="w-24 md:w-32 h-48 md:h-64 bg-gray-900/80 rounded-3xl border-4 border-gray-800 shadow-2xl transform rotate-6 translate-y-4">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">Screen 2</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-gray-900/80 text-white text-xs font-medium rounded-full">{project.type}</span>
                      <span className="text-gray-700 text-sm">{project.year}</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900">{project.title}</h4>
                    <p className="text-gray-700 text-sm md:text-base mt-1 max-w-md">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 group-hover:text-gray-900 transition-colors">
                    <span className="text-sm font-medium">View Project</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Secondary Projects - Two Column Grid */}
        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {projects.filter(p => !p.featured).map((project, index) => (
            <div 
              key={project.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-85`}></div>
              
              {/* Sparkle Effects */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.4}s`,
                      opacity: 0.5,
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                {/* Top Content */}
                <div className="text-center">
                  <h3 className={`text-xl md:text-2xl font-bold ${project.accentColor} mb-1`}>{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.tagline}</p>
                </div>

                {/* Phone Mockups Placeholder */}
                <div className="flex justify-center items-end gap-3 my-6 flex-1">
                  <div className="w-16 md:w-20 h-32 md:h-40 bg-gray-900/80 rounded-2xl border-2 border-gray-800 shadow-xl transform -rotate-3">
                    <div className="w-full h-full rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-600 text-[10px]">Screen</span>
                    </div>
                  </div>
                  <div className="w-20 md:w-24 h-40 md:h-48 bg-gray-900/90 rounded-2xl border-2 border-gray-800 shadow-xl z-10">
                    <div className="w-full h-full rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-600 text-[10px]">Main</span>
                    </div>
                  </div>
                  <div className="w-16 md:w-20 h-32 md:h-40 bg-gray-900/80 rounded-2xl border-2 border-gray-800 shadow-xl transform rotate-3">
                    <div className="w-full h-full rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-600 text-[10px]">Screen</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-900/80 text-white text-[10px] font-medium rounded-full">{project.type}</span>
                      <span className="text-gray-600 text-xs">{project.year}</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900">{project.title}</h4>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 group-hover:text-gray-800 transition-colors">
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* More Projects Coming Section */}
        <div className={`mt-16 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-4 px-8 py-4 border border-gray-800 rounded-full">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
            <span className="text-gray-400 text-sm">More projects coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
