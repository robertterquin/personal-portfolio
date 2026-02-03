import { useEffect, useState } from 'react';

const Landing = () => {
  const [particles, setParticles] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [codeRain, setCodeRain] = useState([]);

  useEffect(() => {
    // Generate particles only once on mount
    const generatedParticles = [...Array(30)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
    }));
    setParticles(generatedParticles);

    // Generate geometric shapes
    const generatedShapes = [...Array(6)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 150 + 80,
      rotation: Math.random() * 360,
      duration: Math.random() * 40 + 30,
      delay: Math.random() * 5,
    }));
    setShapes(generatedShapes);

    // Generate code rain effect
    const codeSymbols = ['<', '>', '{', '}', '(', ')', '[', ']', '=', ';', '/', '*', '+', '-', '0', '1'];
    const generatedCodeRain = [...Array(25)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
    }));
    setCodeRain(generatedCodeRain);
  }, []);

  return (
    <section id="home" className="min-h-screen w-full flex flex-col text-white relative overflow-hidden">
      {/* Animated Background - Geometric Shapes */}
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
            {/* Rotating square outline */}
            <div className="absolute inset-0" style={{
              border: `2px solid rgba(255, 255, 255, 0.08)`,
              borderRadius: '20%',
              animation: `spin ${shape.duration * 1.2}s linear infinite`,
            }}></div>
            
            {/* Inner rotating square */}
            <div className="absolute inset-2" style={{
              border: `1px solid rgba(163, 163, 163, 0.06)`,
              borderRadius: '25%',
              animation: `spin-reverse ${shape.duration * 1.5}s linear infinite`,
            }}></div>
            
            {/* Center accent dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-mono-600/20 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>

      {/* Elegant Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-conic from-mono-300/06 via-mono-400/04 to-mono-300/06 rounded-full blur-[150px] animate-pulse" style={{animationDuration: '20s'}}></div>
        <div className="absolute -bottom-1/3 -left-1/4 w-[700px] h-[700px] bg-gradient-radial from-mono-400/08 via-mono-300/04 to-transparent rounded-full blur-[120px] animate-pulse" style={{animationDuration: '15s', animationDelay: '3s'}}></div>
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
              background: particle.id % 3 === 0 ? 'rgba(212, 212, 212, 0.3)' : particle.id % 3 === 1 ? 'rgba(163, 163, 163, 0.35)' : 'rgba(115, 115, 115, 0.3)',
              opacity: particle.opacity * 0.8,
              boxShadow: `0 0 ${particle.size * 2}px rgba(163, 163, 163, 0.2)`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content Container - Full Height */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-10 lg:p-16">
        


        {/* Main Hero Section - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Headline */}
          <div className="mb-12 max-w-5xl">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tighter mb-8 px-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mono-950 via-mono-800 to-mono-700 mb-4">Building elegant</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mono-700 via-mono-900 to-mono-950 block animate-gradient">digital solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4 px-4">
              Crafting innovative mobile applications and scalable backend solutions that transform ideas into reality. From concept to production, I build products that matter.
            </p>
          </div>

          {/* Feature Cards - Wider Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
            <div className="p-6 rounded-xl border border-mono-200/40 bg-gradient-to-br from-mono-100/80 to-transparent backdrop-blur-sm hover:border-mono-300/70 transition-all group cursor-pointer">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-mono-200/60 flex items-center justify-center flex-shrink-0 group-hover:bg-mono-300/80 transition-colors text-xl">
                  📱
                </div>
                <div>
                  <p className="text-base font-semibold text-white">Cross-Platform</p>
                  <p className="text-sm text-mono-600">Flutter Development</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-mono-200/40 bg-gradient-to-br from-mono-100/80 to-transparent backdrop-blur-sm hover:border-mono-300/70 transition-all group cursor-pointer">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-mono-200/60 flex items-center justify-center flex-shrink-0 group-hover:bg-mono-300/80 transition-colors text-xl">
                  🛠️
                </div>
                <div>
                  <p className="text-base font-semibold text-white">Cloud Services</p>
                  <p className="text-sm text-mono-600">Firebase & Supabase</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-mono-200/40 bg-gradient-to-br from-mono-100/80 to-transparent backdrop-blur-sm hover:border-mono-300/70 transition-all group cursor-pointer">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-mono-200/60 flex items-center justify-center flex-shrink-0 group-hover:bg-mono-300/80 transition-colors text-xl">
                  ✨
                </div>
                <div>
                  <p className="text-base font-semibold text-white">User-Centric</p>
                  <p className="text-sm text-mono-600">Intuitive Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-6 pt-8 border-t border-gray-800/50">

          <nav className="flex flex-wrap gap-8 justify-center items-center">
            {['About', 'Projects', 'Certification', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-mono-700 hover:text-mono-900 transition-colors uppercase tracking-wider font-medium"
              >
                {item}
              </a>
            ))}
            <a
              href="#projects"
              className="flex items-center gap-2 text-mono-700 hover:text-mono-900 transition-colors text-xs uppercase tracking-widest font-medium ml-4 pl-8 border-l border-mono-400/30 group"
            >
              <span>Explore</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </nav>
        </div>
      </div>

      {/* Page Transition Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Landing;
