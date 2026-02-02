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
              border: `2px solid rgba(6, 182, 212, 0.15)`,
              borderRadius: '20%',
              animation: `spin ${shape.duration * 1.2}s linear infinite`,
            }}></div>
            
            {/* Inner rotating square */}
            <div className="absolute inset-2" style={{
              border: `1px solid rgba(147, 112, 219, 0.1)`,
              borderRadius: '25%',
              animation: `spin-reverse ${shape.duration * 1.5}s linear infinite`,
            }}></div>
            
            {/* Center accent dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400/30 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>

      {/* Elegant Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-conic from-cyan-400/10 via-blue-400/6 to-purple-400/10 rounded-full blur-[150px] animate-pulse" style={{animationDuration: '20s'}}></div>
        <div className="absolute -bottom-1/3 -left-1/4 w-[700px] h-[700px] bg-gradient-radial from-purple-400/12 via-pink-400/6 to-transparent rounded-full blur-[120px] animate-pulse" style={{animationDuration: '15s', animationDelay: '3s'}}></div>
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
              background: particle.id % 3 === 0 ? 'rgba(6, 182, 212, 0.4)' : particle.id % 3 === 1 ? 'rgba(147, 112, 219, 0.5)' : 'rgba(59, 130, 246, 0.4)',
              opacity: particle.opacity * 0.8,
              boxShadow: `0 0 ${particle.size * 2}px rgba(6, 182, 212, 0.3)`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content Container - Full Height */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-10 lg:p-16">
        
        {/* Header with Profile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-2 border-cyan-500/50 overflow-hidden ring-2 ring-cyan-500/20 bg-slate-800 flex-shrink-0">
              <img 
                src="/profile.jpg" 
                alt="Robert Terquin Laqui" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"><span class="text-4xl font-bold text-white">RT</span></div>';
                }}
              />
            </div>
            <div>
              <p className="text-sm text-cyan-400 uppercase tracking-wider font-semibold">Full Stack Developer</p>
              <h2 className="text-2xl font-bold text-white">Robert Terquin Laqui</h2>
            </div>
          </div>

          {/* Status Badge */}
          
        </div>

        {/* Main Hero Section - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Headline */}
          <div className="mb-12 max-w-5xl">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tighter mb-8 px-4">
              <span className="block text-white mb-4">Building elegant</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 block">digital solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4 px-4">
              Crafting innovative mobile applications and scalable backend solutions that transform ideas into reality. From concept to production, I build products that matter.
            </p>
          </div>

          {/* Feature Cards - Wider Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
            <div className="p-6 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm hover:border-cyan-500/60 transition-all group cursor-pointer">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/40 transition-colors text-xl">
                  📱
                </div>
                <div>
                  <p className="text-base font-semibold text-white">Cross-Platform</p>
                  <p className="text-sm text-gray-400">Flutter Development</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-sm hover:border-blue-500/60 transition-all group cursor-pointer">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/40 transition-colors text-xl">
                  🛠️
                </div>
                <div>
                  <p className="text-base font-semibold text-white">Cloud Services</p>
                  <p className="text-sm text-gray-400">Firebase & Supabase</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-sm hover:border-purple-500/60 transition-all group cursor-pointer">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/40 transition-colors text-xl">
                  ✨
                </div>
                <div>
                  <p className="text-base font-semibold text-white">User-Centric</p>
                  <p className="text-sm text-gray-400">Intuitive Design</p>
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
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider font-medium"
              >
                {item}
              </a>
            ))}
            <a
              href="#projects"
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-xs uppercase tracking-widest font-medium ml-4 pl-8 border-l border-cyan-500/30 group"
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
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Landing;
