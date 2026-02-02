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
      title: "Certification Name",
      issuer: "Issuing Organization",
      date: "Month Year",
      credentialId: "XXXX-XXXX-XXXX",
      icon: "🎓",
      color: "cyan"
    },
    {
      id: 2,
      title: "Certification Name",
      issuer: "Issuing Organization",
      date: "Month Year",
      credentialId: "XXXX-XXXX-XXXX",
      icon: "📜",
      color: "blue"
    },
    {
      id: 3,
      title: "Certification Name",
      issuer: "Issuing Organization",
      date: "Month Year",
      credentialId: "XXXX-XXXX-XXXX",
      icon: "🏆",
      color: "purple"
    },
    {
      id: 4,
      title: "Certification Name",
      issuer: "Issuing Organization",
      date: "Month Year",
      credentialId: "XXXX-XXXX-XXXX",
      icon: "⭐",
      color: "pink"
    },
    {
      id: 5,
      title: "Certification Name",
      issuer: "Issuing Organization",
      date: "Month Year",
      credentialId: "XXXX-XXXX-XXXX",
      icon: "🎯",
      color: "cyan"
    },
    {
      id: 6,
      title: "Certification Name",
      issuer: "Issuing Organization",
      date: "Month Year",
      credentialId: "XXXX-XXXX-XXXX",
      icon: "✨",
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
                className={`group relative p-6 rounded-2xl border ${colorClasses.border} bg-gradient-to-br ${colorClasses.bg} to-transparent backdrop-blur-sm ${colorClasses.hoverBorder} transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
                style={{
                  transitionDelay: `${200 + index * 100}ms`
                }}
              >
                {/* Certificate Icon */}
                <div className={`w-16 h-16 rounded-xl ${colorClasses.iconBg} flex items-center justify-center mb-4 ${colorClasses.hoverIconBg} transition-colors text-3xl`}>
                  {cert.icon}
                </div>

                {/* Certificate Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className={`text-sm ${colorClasses.text} font-medium mb-3`}>
                  {cert.issuer}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{cert.date}</span>
                </div>

                {/* Credential ID */}
                <div className="pt-3 border-t border-gray-800/50">
                  <p className="text-xs text-gray-500 mb-1">Credential ID</p>
                  <p className="text-xs text-gray-400 font-mono">{cert.credentialId}</p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/0 rounded-2xl transition-all duration-300 pointer-events-none"></div>

                {/* Verification Badge */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-8 h-8 rounded-full ${colorClasses.iconBg} flex items-center justify-center`}>
                    <svg className={`w-5 h-5 ${colorClasses.text}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
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
    </section>
  );
};

export default Certification;
