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
      color: "cyan"
    },
    {
      id: 2,
      title: "PowerPoint 2019 Associate",
      image: "/certificates/microsoftppt.jpg",
      icon: "📊",
      color: "blue"
    },
    {
      id: 3,
      title: "Oracle Java Foundations",
      image: "/certificates/oracle.jpg",
      icon: "☕",
      color: "purple"
    },
    {
      id: 4,
      title: "IT Specialist in Databases",
      image: "/certificates/databasecert.png",
      icon: "🗄️",
      color: "pink"
    },
    {
      id: 5,
      title: "HackForGov 2025 - CALABARZON",
      image: "/certificates/hack4gov.jpg",
      icon: "🚀",
      color: "cyan"
    },
    {
      id: 6,
      title: "National Programming Challenge 2025",
      image: "/certificates/codechum2.jpg",
      icon: "🥇",
      color: "purple"
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        border: 'border-cyan-500/30',
        bg: 'from-cyan-500/10',
        hoverBorder: 'group-hover:border-cyan-500/60',
        text: 'text-cyan-400',
        iconBg: 'bg-cyan-500/20',
        hoverIconBg: 'group-hover:bg-cyan-500/40',
      },
      blue: {
        border: 'border-blue-500/30',
        bg: 'from-blue-500/10',
        hoverBorder: 'group-hover:border-blue-500/60',
        text: 'text-blue-400',
        iconBg: 'bg-blue-500/20',
        hoverIconBg: 'group-hover:bg-blue-500/40',
      },
      purple: {
        border: 'border-purple-500/30',
        bg: 'from-purple-500/10',
        hoverBorder: 'group-hover:border-purple-500/60',
        text: 'text-purple-400',
        iconBg: 'bg-purple-500/20',
        hoverIconBg: 'group-hover:bg-purple-500/40',
      },
      pink: {
        border: 'border-pink-500/30',
        bg: 'from-pink-500/10',
        hoverBorder: 'group-hover:border-pink-500/60',
        text: 'text-pink-400',
        iconBg: 'bg-pink-500/20',
        hoverIconBg: 'group-hover:bg-pink-500/40',
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
                className={`group relative p-6 rounded-2xl border ${colorClasses.border} bg-gradient-to-br ${colorClasses.bg} to-transparent backdrop-blur-sm ${colorClasses.hoverBorder} transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col items-center text-center`}
                style={{
                  transitionDelay: `${200 + index * 100}ms`
                }}
              >
                {/* Certificate Image */}
                <div className="w-full rounded-lg mb-4 overflow-hidden bg-gray-900 p-2">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Certificate Title */}
                <h3 className="text-sm font-bold text-white text-center">
                  {cert.title}
                </h3>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/0 rounded-2xl transition-all duration-300 pointer-events-none"></div>
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
