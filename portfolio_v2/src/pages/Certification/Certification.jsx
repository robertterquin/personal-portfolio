import { useEffect, useState, useRef } from 'react';
import { motion as Motion } from 'motion/react';

const Certification = () => {
  const [isVisible, setIsVisible] = useState(false);
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
    {
      id: 7,
      title: "HTML and CSS Specialist",
      image: "/certificates/html_css.png",
      icon: "🌐",
      color: "htmlcss"
    },
  ];

  const getColorClasses = () => {
    // Unified color scheme - all certificates use the same monochrome + white text style
    return {
      border: 'border-gray-700/50',
      bg: 'from-gray-800/20',
      hoverBorder: 'group-hover:border-gray-600/80',
      text: 'text-gray-300',
      gradientFrom: 'from-gray-800',
      gradientTo: 'to-gray-700',
      accentColor: '#ffffff',
    };
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
          {certifications.map((cert, index) => {
            const colorClasses = getColorClasses();
            return (
              <Motion.div
                key={cert.id}
                className={`group relative overflow-hidden rounded-2xl border ${colorClasses.border} backdrop-blur-sm ${colorClasses.hoverBorder} transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                style={{
                  transitionDelay: `${200 + index * 100}ms`,
                  background: `linear-gradient(135deg, ${colorClasses.gradientFrom}10 0%, ${colorClasses.gradientTo}05 100%)`,
                  boxShadow: `inset 0 1px 2px rgba(255,255,255,0.1), 0 0 20px ${colorClasses.accentColor}0a`,
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
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
                  <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                </div>
              </Motion.div>
            );
          })}
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

      {/* Page Transition Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Certification;
