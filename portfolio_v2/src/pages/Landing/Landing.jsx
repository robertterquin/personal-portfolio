import { useEffect, useState } from 'react';

const Landing = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only once on mount
    const generatedParticles = [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-black via-neutral-950 to-neutral-900 text-white p-8 md:p-12 lg:p-16 relative overflow-hidden">
      {/* Moving Particles */}
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
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Available for work</span>
        </div>
        <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-sm text-gray-400">Based in Philippines</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="max-w-5xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight tracking-tight mb-6">
            <span className="block text-white">I craft digital</span>
            <span className="block text-gray-500 font-light">experiences with</span>
            <span className="block">
              <span className="text-white">clean </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 italic font-light">code</span>
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 relative z-10">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-white/20 flex items-center justify-center overflow-hidden">
            <span className="text-3xl grayscale opacity-60">👤</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Robert Terquin Laqui</h2>
            <p className="text-sm text-gray-400">Full Stack Developer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6 items-center">
          {['About', 'Projects', 'Certification', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 text-sm uppercase tracking-wider hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <a
            href="#about"
            className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest hover:text-white transition-colors duration-300 group"
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
