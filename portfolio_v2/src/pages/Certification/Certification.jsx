import { useEffect, useState, useRef } from 'react';

const Certification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [shapes, setShapes] = useState([]);
  const sectionRef = useRef(null);

  // Placeholder certifications
  const certifications = [
    {
      id: 1,
      title: "National Programming Challenge 2024",
      image: "/certificates/CodeChum.png",
      icon: "🏆",
      color: "codechum"
    },
    {
      id: 2,
      title: "PowerPoint 2019 Associate",
      image: "/certificates/microsoftppt.jpg",
      icon: "📊",
      color: "microsoft"
    },
    {
      id: 3,
      title: "Oracle Java Foundations",
      image: "/certificates/oracle.jpg",
      icon: "☕",
      color: "oracle"
    },
    {
      id: 4,
      title: "IT Specialist in Databases",
      image: "/certificates/databasecert.png",
      icon: "🗄️",
      color: "itspecialist"
    },
    {
      id: 5,
      title: "HackForGov 2025 - CALABARZON",
      image: "/certificates/hack4gov.jpg",
      icon: "🚀",
      color: "hackforgov"
    },
    {
      id: 6,
      title: "National Programming Challenge 2025",
      image: "/certificates/codechum2.jpg",
      icon: "🥇",
      color: "codechum2"
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      // CodeChum: Purple/Blue with gold accents
      codechum: {
        border: 'border-purple-500/40',
        bg: 'from-purple-600/15',
        hoverBorder: 'group-hover:border-purple-400/70',
        text: 'text-purple-300',
        gradientFrom: 'from-purple-600',
        gradientTo: 'to-blue-600',
        accentColor: '#fbbf24',
      },
      // Microsoft: Brown/Tan/Gold
      microsoft: {
        border: 'border-amber-700/40',
        bg: 'from-amber-900/15',
        hoverBorder: 'group-hover:border-amber-600/70',
        text: 'text-amber-200',
        gradientFrom: 'from-amber-800',
        gradientTo: 'to-amber-600',
        accentColor: '#fcd34d',
      },
      // Oracle: Black/White/Red
      oracle: {
        border: 'border-red-600/40',
        bg: 'from-red-950/15',
        hoverBorder: 'group-hover:border-red-500/70',
        text: 'text-red-300',
        gradientFrom: 'from-gray-900',
        gradientTo: 'to-red-700',
        accentColor: '#ef4444',
      },
      // IT Specialist: Blue with gold accents
      itspecialist: {
        border: 'border-blue-600/40',
        bg: 'from-blue-700/15',
        hoverBorder: 'group-hover:border-blue-400/70',
        text: 'text-blue-300',
        gradientFrom: 'from-blue-700',
        gradientTo: 'to-blue-600',
        accentColor: '#fbbf24',
      },
      // HackForGov: Brown/Maroon with gold
      hackforgov: {
        border: 'border-red-800/40',
        bg: 'from-red-900/15',
        hoverBorder: 'group-hover:border-red-700/70',
        text: 'text-red-200',
        gradientFrom: 'from-red-900',
        gradientTo: 'to-amber-700',
        accentColor: '#fbbf24',
      },
      // CodeChum 2025: Purple/Blue with gold
      codechum2: {
        border: 'border-purple-500/40',
        bg: 'from-purple-700/15',
        hoverBorder: 'group-hover:border-purple-400/70',
        text: 'text-purple-300',
        gradientFrom: 'from-purple-700',
        gradientTo: 'to-blue-700',
        accentColor: '#fbbf24',
      },
    };
    return colors[color];
  };

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
    const generatedParticles = [...Array(25)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.2 + 0.05,
    }));
    setParticles(generatedParticles);

    // Generate hexagonal shapes
    const generatedShapes = [...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 120 + 60,
      rotation: Math.random() * 360,
      duration: Math.random() * 35 + 25,
      delay: Math.random() * 6,
    }));
    setShapes(generatedShapes);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="certification" 
      className="min-h-screen text-white py-32 px-8 md:px-16 lg:px-24 relative overflow-hidden"
    >
      {/* Page Transition Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none z-20"></div>
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
              border: `2px solid rgba(139, 92, 246, 0.35)`,
              animation: `spin ${shape.duration * 1.3}s linear infinite`,
              boxShadow: `0 0 20px rgba(139, 92, 246, 0.25)`,
            }}></div>
            
            {/* Inner rotating hexagon */}
            <div className="absolute inset-4" style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              border: `1.5px solid rgba(6, 182, 212, 0.28)`,
              animation: `spin-reverse ${shape.duration * 1.6}s linear infinite`,
              boxShadow: `0 0 15px rgba(6, 182, 212, 0.2)`,
            }}></div>

            {/* Middle accent hexagon */}
            <div className="absolute inset-2" style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              border: `1px solid rgba(236, 72, 153, 0.15)`,
              animation: `spin ${shape.duration * 0.8}s linear infinite`,
            }}></div>
            
            {/* Center accent dot with glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400/60 rounded-full blur-sm" style={{
              boxShadow: `0 0 12px rgba(139, 92, 246, 0.8), 0 0 24px rgba(139, 92, 246, 0.4)`
            }}></div>
          </div>
        ))}
      </div>

      {/* Elegant Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-conic from-purple-400/15 via-blue-400/10 to-cyan-400/15 rounded-full blur-[130px] animate-pulse" style={{animationDuration: '18s'}}></div>
        <div className="absolute -bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-pink-400/18 via-purple-400/10 to-transparent rounded-full blur-[110px] animate-pulse" style={{animationDuration: '14s', animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-conic from-cyan-400/8 via-blue-400/5 to-transparent rounded-full blur-[100px] animate-pulse" style={{animationDuration: '20s', animationDelay: '6s'}}></div>
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
              background: particle.id % 4 === 0 ? 'rgba(139, 92, 246, 0.7)' : particle.id % 4 === 1 ? 'rgba(6, 182, 212, 0.6)' : particle.id % 4 === 2 ? 'rgba(59, 130, 246, 0.65)' : 'rgba(236, 72, 153, 0.55)',
              opacity: particle.opacity * 1.2,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.id % 4 === 0 ? 'rgba(139, 92, 246, 0.6)' : particle.id % 4 === 1 ? 'rgba(6, 182, 212, 0.5)' : particle.id % 4 === 2 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(236, 72, 153, 0.5)'}`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        
        {/* Header Section */}
        <div className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-purple-400 to-transparent"></div>
            <span className="text-purple-400 text-xs uppercase tracking-[0.3em] font-semibold">Credentials</span>
          </div>
          
          {/* Main Title */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-cyan-400">Certified</span>
                <br />
                <span className="text-white">Excellence</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full mt-6"></div>
            </div>
            
            <div className="space-y-6 lg:pt-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                Professional certifications demonstrating expertise and commitment to continuous learning in software development and technology.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg border border-gray-800/50 bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                  <div className="text-2xl font-bold text-purple-400">6</div>
                  <div className="text-sm text-gray-400">Certifications</div>
                </div>
                <div className="p-4 rounded-lg border border-gray-800/50 bg-gradient-to-br from-cyan-500/5 to-transparent backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                  <div className="text-2xl font-bold text-cyan-400">2025</div>
                  <div className="text-sm text-gray-400">Up to Date</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {certifications.map((cert, index) => {
            const colorClasses = getColorClasses(cert.color);
            return (
              <div
                key={cert.id}
                className={`group relative overflow-hidden rounded-2xl border ${colorClasses.border} backdrop-blur-sm ${colorClasses.hoverBorder} transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                style={{
                  transitionDelay: `${200 + index * 100}ms`,
                  background: `linear-gradient(135deg, ${colorClasses.gradientFrom}10 0%, ${colorClasses.gradientTo}05 100%)`,
                  boxShadow: `inset 0 1px 2px rgba(255,255,255,0.1), 0 0 20px ${colorClasses.accentColor}0a`,
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                  background: `linear-gradient(135deg, ${colorClasses.accentColor}15 0%, transparent 100%)`,
                }}></div>
                
                <div className="relative p-6 flex flex-col items-center text-center h-full">
                  {/* Certificate Image */}
                  <div className="w-full rounded-lg mb-4 overflow-hidden p-2" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)',
                  }}>
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-sm font-bold text-center group-hover:text-opacity-100 transition-colors" style={{
                    color: colorClasses.accentColor,
                  }}>
                    {cert.title}
                  </h3>

                  {/* Hover Shimmer Effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-gray-400 text-sm">Continuously expanding knowledge and expertise</p>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Transition Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Certification;
