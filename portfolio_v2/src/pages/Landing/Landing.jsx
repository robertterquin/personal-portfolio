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
    <section id="home" className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white p-8 md:p-12 lg:p-16 relative overflow-hidden">
      {/* Circuit Board Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, rgba(6, 182, 212, 0.8) 100%),
            linear-gradient(0deg, transparent 98%, rgba(6, 182, 212, 0.8) 100%),
            linear-gradient(45deg, transparent 47%, rgba(59, 130, 246, 0.4) 48%, rgba(59, 130, 246, 0.4) 52%, transparent 53%),
            linear-gradient(-45deg, transparent 47%, rgba(147, 51, 234, 0.3) 48%, rgba(147, 51, 234, 0.3) 52%, transparent 53%)
          `,
          backgroundSize: '120px 120px, 120px 120px, 60px 60px, 60px 60px',
          backgroundPosition: '0 0, 0 0, 30px 30px, 30px 30px',
        }}></div>
      </div>

      {/* Holographic Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-gradient-conic from-cyan-500/20 via-blue-500/10 to-purple-500/20 rounded-full blur-[80px] animate-spin" style={{animationDuration: '25s'}}></div>
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-conic from-purple-500/15 via-pink-500/10 to-cyan-500/15 rounded-full blur-[100px] animate-spin" style={{animationDuration: '35s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/3 left-1/3 w-[250px] h-[250px] bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-[60px] animate-pulse"></div>
      </div>

      {/* Code Rain Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {codeRain.map((code) => (
          <div
            key={code.id}
            className="absolute text-cyan-500/30 font-mono text-sm animate-float"
            style={{
              left: `${code.left}%`,
              top: '-10%',
              animationDuration: `${code.duration}s`,
              animationDelay: `${code.delay}s`,
              transform: 'translateY(120vh)',
            }}
          >
            {code.symbol}
          </div>
        ))}
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className="absolute animate-spin-slow"
            style={{
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              transform: `rotate(${shape.rotation}deg)`,
              animationDuration: `${shape.duration}s`,
              animationDelay: `${shape.delay}s`,
            }}
          >
            {shape.id % 4 === 0 ? (
              <div className="w-full h-full border border-cyan-500/20 rounded-lg" style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)'
              }}></div>
            ) : shape.id % 3 === 0 ? (
              <div className="w-full h-full border-2 border-dashed border-blue-500/20 rounded-full opacity-60"></div>
            ) : (
              <div className="w-full h-full relative">
                <div className="absolute inset-2 border-l-2 border-t-2 border-purple-500/20 rounded-tl-2xl"></div>
                <div className="absolute inset-2 border-r-2 border-b-2 border-cyan-500/20 rounded-br-2xl"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white animate-float"
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

      {/* Status Badges */}
      <div className="flex flex-wrap gap-4 relative z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-full">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-cyan-300">Available for work</span>
        </div>
        <div className="px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full">
          <span className="text-sm text-blue-300">Based in Philippines</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="max-w-5xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight tracking-tight mb-6">
            <span className="block text-white">I craft digital</span>
            <span className="block text-cyan-400 font-light">experiences with</span>
            <span className="block">
              <span className="text-white">clean </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic font-light">code</span>
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 relative z-10">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500/40 overflow-hidden ring-2 ring-cyan-500/20 bg-slate-800">
            <img 
              src="/profile.jpg" 
              alt="Robert Terquin Laqui" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center"><span class="text-2xl text-cyan-400">RT</span></div>';
              }}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Robert Terquin Laqui</h2>
            <p className="text-sm text-cyan-400">Full Stack Developer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6 items-center">
          {['About', 'Projects', 'Certification', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-cyan-400 text-sm uppercase tracking-wider hover:text-cyan-300 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <a
            href="#about"
            className="flex items-center gap-2 text-cyan-400 text-xs uppercase tracking-widest hover:text-cyan-300 transition-colors duration-300 group"
          >
            <span>Scroll to explore</span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </nav>
      </div>
    </section>
  );
};

export default Landing;
