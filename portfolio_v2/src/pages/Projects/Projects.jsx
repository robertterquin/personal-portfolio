import { useEffect, useState, useRef } from 'react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);

  // Placeholder projects - ready for future content
  const projects = [
    {
      id: 1,
      title: "ONCOSENSE",
      tagline: "Cancer awareness starts here",
      description: "A Flutter-based mobile platform for cancer education, prevention tips, community support, and resources.",
      type: "Health App",
      year: "2025",
      featured: true,
      gradient: "from-pink-200 via-rose-100 to-pink-50",
      accentColor: "text-pink-600",
      screens: [
        { image: "/oncosense-1.png", label: "Welcome Screen" },
        { image: "/oncosense-2.png", label: "Dashboard" },
        { image: "/oncosense-3.png", label: "Journey Tracker" }
      ]
    },
    {
      id: 2,
      title: "Chainly",
      tagline: "Ride smarter, maintain better",
      description: "Flutter-based mobile application to help cyclists track bike maintenance, schedule service reminders, and manage maintenance costs for safer rides.",
      type: "Lifestyle App",
      year: "2025",
      featured: false,
      gradient: "from-cyan-200 via-blue-100 to-teal-100",
      accentColor: "text-cyan-500",
      screens: [
        { image: null, label: "Screen" },
        { image: null, label: "Main" },
        { image: null, label: "Screen" }
      ]
    },
    {
      id: 3,
      title: "RideTrack",
      tagline: "Track every ride, reach every goal",
      description: "Flutter-based mobile application designed to help cyclists track rides, monitor performance goals, and analyze riding statistics for efficient cycling.",
      type: "Fitness App",
      year: "2025",
      featured: false,
      gradient: "from-blue-200 via-cyan-100 to-blue-100",
      accentColor: "text-blue-500",
      screens: [
        { image: "/ridetrack-1.png", label: "Welcome Screen" },
        { image: "/ridetrack-2.png", label: "Dashboard" },
        { image: "/ridetrack-3.png", label: "Stats Tracker" }
      ]
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
      {/* Background Grid Pattern - Elegant */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 96%, rgba(6, 182, 212, 0.08) 98%, transparent 100%),
            linear-gradient(0deg, transparent 96%, rgba(6, 182, 212, 0.08) 98%, transparent 100%),
            linear-gradient(45deg, transparent 95%, rgba(139, 92, 246, 0.04) 96%, transparent 97%)
          `,
          backgroundSize: '120px 120px, 120px 120px, 170px 170px',
        }}></div>
      </div>

      {/* Elegant Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Primary Orb - Top Right */}
        <div className="absolute -top-1/3 right-[-10%] w-[600px] h-[600px] bg-gradient-conic from-purple-400/8 via-blue-400/6 via-cyan-400/8 to-purple-400/8 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '15s'}}></div>
        
        {/* Secondary Orb - Bottom Left */}
        <div className="absolute -bottom-1/4 left-[-5%] w-[500px] h-[500px] bg-gradient-radial from-cyan-400/10 via-teal-400/6 to-transparent rounded-full blur-[100px] animate-pulse" style={{animationDuration: '12s', animationDelay: '2s'}}></div>
        
        {/* Tertiary Orb - Center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-pink-300/5 via-purple-300/4 to-transparent rounded-full blur-[90px] animate-pulse" style={{animationDuration: '18s', animationDelay: '4s'}}></div>
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
              background: particle.id % 3 === 0 ? 'rgba(147, 112, 219, 0.5)' : particle.id % 3 === 1 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(168, 85, 247, 0.45)',
              opacity: particle.opacity * 0.8,
              boxShadow: `0 0 ${particle.size * 2}px rgba(147, 112, 219, 0.3)`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Elegant Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Flowing Line Top */}
        <div className="absolute top-1/4 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-sm"></div>
        
        {/* Flowing Line Bottom */}
        <div className="absolute bottom-1/3 right-0 w-2/5 h-px bg-gradient-to-l from-transparent via-purple-400/20 to-transparent blur-sm"></div>
        
        {/* Accent Dots - Top */}
        <div className="absolute top-1/3 left-10 w-1.5 h-1.5 bg-cyan-400/40 rounded-full blur-sm"></div>
        <div className="absolute top-2/3 right-20 w-1 h-1 bg-purple-400/30 rounded-full blur-sm"></div>
        
        {/* Subtle Diagonal Lines */}
        <div className="absolute top-0 right-1/4 w-64 h-64 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full">
        
        {/* Header Section - Enhanced layout */}
        <div className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent"></div>
            <span className="text-cyan-400 text-xs uppercase tracking-[0.3em] font-semibold">Portfolio</span>
          </div>
          
          {/* Main Title */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">Crafted</span>
                <br />
                <span className="text-white">Projects</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mt-6"></div>
            </div>
            
            <div className="space-y-6 lg:pt-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                A showcase of mobile and web applications built with modern technologies. Each project represents growth, learning, and a commitment to quality development.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg border border-gray-800/50 bg-gradient-to-br from-cyan-500/5 to-transparent backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                  <div className="text-2xl font-bold text-cyan-400">3</div>
                  <div className="text-sm text-gray-400">Featured Works</div>
                </div>
                <div className="p-4 rounded-lg border border-gray-800/50 bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                  <div className="text-2xl font-bold text-purple-400">2025</div>
                  <div className="text-sm text-gray-400">Current Year</div>
                </div>
              </div>
            </div>
          </div>
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

              {/* Floating Circles Background Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-20 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-16 w-40 h-40 bg-rose-300/15 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-300/10 rounded-full blur-xl"></div>
              </div>

              <div className="relative p-8 md:p-12 min-h-[400px] md:min-h-[500px] flex flex-col justify-between">
                {/* Top Content */}
                <div className="text-center">
                  <h3 className={`text-3xl md:text-4xl font-bold ${project.accentColor} mb-2`}>{project.title}</h3>
                  <p className="text-pink-700 text-lg font-medium">{project.tagline}</p>
                </div>

                {/* Phone Mockups Placeholder */}
                <div className="flex justify-center items-end gap-4 my-8 flex-1">
                  {project.screens.map((screen, idx) => (
                    <div 
                      key={idx}
                      className={`rounded-3xl border border-gray-800 shadow-3xl overflow-hidden p-1.5 bg-gray-900 w-36 md:w-48 h-72 md:h-96 ${
                        idx === 0 ? 'transform -rotate-6 translate-y-4' :
                        idx === 1 ? 'z-10' :
                        'transform rotate-6 translate-y-4'
                      }`}
                    >
                      <div className="w-full h-full rounded-[1.1rem] bg-gray-900 flex items-center justify-center overflow-hidden">
                        {screen.image ? (
                          <img 
                            src={screen.image} 
                            alt={screen.label}
                            className="w-full h-full object-contain rounded-[1.1rem]"
                          />
                        ) : (
                          <span className="text-gray-600 text-xs">{screen.label}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Content */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pink-600/90 text-white text-xs font-medium rounded-full">{project.type}</span>
                      <span className="text-pink-800 text-sm font-medium">{project.year}</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-pink-900">{project.title}</h4>
                    <p className="text-pink-800 text-sm md:text-base mt-1 max-w-md">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-pink-700 group-hover:text-pink-900 transition-colors">
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

        {/* Secondary Projects - Full Width Stacked */}
        <div className={`flex flex-col gap-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {projects.filter(p => !p.featured).map((project, index) => (
            <div 
              key={project.id}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}></div>
              
              {/* Sparkle Effects */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.3}s`,
                      opacity: 0.5,
                    }}
                  ></div>
                ))}
              </div>

              {/* Floating Circles Background Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-16 w-40 h-40 bg-teal-300/15 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-300/10 rounded-full blur-xl"></div>
              </div>

              <div className="relative p-8 md:p-12 min-h-[400px] md:min-h-[500px] flex flex-col justify-between">
                {/* Top Content */}
                <div className="text-center">
                  <h3 className={`text-3xl md:text-4xl font-bold ${project.accentColor} mb-2`}>{project.title}</h3>
                  <p className="text-gray-700 text-lg font-medium">{project.tagline}</p>
                </div>

                {/* Phone Mockups Placeholder */}
                <div className="flex justify-center items-end gap-4 my-8 flex-1">
                  {project.screens.map((screen, idx) => (
                    <div 
                      key={idx}
                      className={`rounded-3xl border border-gray-800 shadow-2xl overflow-hidden p-1.5 bg-gray-900 w-36 md:w-48 h-72 md:h-96 ${
                        idx === 0 ? 'transform -rotate-6 translate-y-4' :
                        idx === 1 ? 'z-10' :
                        'transform rotate-6 translate-y-4'
                      }`}
                    >
                      <div className="w-full h-full rounded-[1.1rem] bg-gray-900 flex items-center justify-center overflow-hidden">
                        {screen.image ? (
                          <img 
                            src={screen.image} 
                            alt={screen.label}
                            className="w-full h-full object-contain rounded-[1.1rem]"
                          />
                        ) : (
                          <span className="text-gray-600 text-xs">{screen.label}</span>
                        )}
                      </div>
                    </div>
                  ))}
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
