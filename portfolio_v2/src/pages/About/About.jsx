import { useEffect, useState, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [dataStreams, setDataStreams] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Generate particles
    const generatedParticles = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.2 + 0.05,
    }));
    setParticles(generatedParticles);

    // Generate data streams (vertical lines)
    const generatedStreams = [...Array(8)].map((_, i) => ({
      id: i,
      left: (i + 1) * 12,
      height: Math.random() * 30 + 20,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
    setDataStreams(generatedStreams);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen text-white py-32 px-8 md:px-16 lg:px-24 relative flex items-center"
    >      {/* Page Transition Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none"></div>      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, rgba(6, 182, 212, 0.6) 100%),
            linear-gradient(0deg, transparent 98%, rgba(6, 182, 212, 0.6) 100%)
          `,
          backgroundSize: '100px 100px',
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-[350px] h-[350px] bg-gradient-conic from-blue-500/15 via-purple-500/10 to-cyan-500/15 rounded-full blur-[90px] animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-32 right-20 w-[300px] h-[300px] bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-[70px] animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
      </div>

      {/* Data Streams (Vertical Lines) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {dataStreams.map((stream) => (
          <div
            key={stream.id}
            className="absolute top-0 w-px opacity-20"
            style={{
              left: `${stream.left}%`,
              background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.8), transparent)',
              height: `${stream.height}%`,
              animation: `slideDown ${stream.duration}s ease-in-out infinite`,
              animationDelay: `${stream.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400 animate-float"
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

      {/* Geometric Accent Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-10 w-40 h-40 border border-cyan-500/20 rounded-lg rotate-12 animate-spin-slow" style={{animationDuration: '45s'}}></div>
        <div className="absolute bottom-1/3 left-16 w-32 h-32 border-2 border-dashed border-blue-500/15 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 relative animate-spin-slow" style={{animationDuration: '35s'}}>
          <div className="absolute inset-3 border-l-2 border-t-2 border-purple-500/20 rounded-tl-xl"></div>
          <div className="absolute inset-3 border-r-2 border-b-2 border-cyan-500/20 rounded-br-xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full">
        {/* Main Grid Layout - Asymmetric */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-32 items-start">
          {/* Left Column - Big Typography */}
          <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <span className="text-cyan-400 text-sm uppercase tracking-[0.4em] font-semibold mb-8 block">About Me</span>
            
            <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tighter">
              <span className="block text-white mb-2">Mobile First</span>
              <span className="block text-white mb-2">Solutions</span>
              <span className="block text-gray-500 font-light italic mb-2">User</span>
              <span className="block text-gray-500 font-light italic">Focused</span>
            </h2>
            
            {/* Decorative Element */}
            <div className="flex items-center gap-6 pt-12">
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Description with unique positioning */}
          <div className={`space-y-10 lg:pt-24 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <div className="space-y-8">
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light">
                Hi, I'm <span className="text-white font-semibold">Robert Terquin Laqui</span>, a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold">Mobile Developer</span> with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">2+ years</span> of experience.
              </p>
              
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                I specialize in building cross-platform mobile apps with <span className="text-cyan-300 font-medium">Flutter</span>, integrated with <span className="text-blue-300 font-medium">Firebase</span> and <span className="text-purple-300 font-medium">Supabase</span>. I deliver secure, scalable, and user-centric applications that combine technical excellence with intuitive design.
              </p>

              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                Passionate about clean code, best practices, and continuously exploring emerging technologies to craft meaningful digital experiences.
              </p>
            </div>

            {/* Enhanced Info Pills */}
           
          </div>
        </div>
      </div>

      {/* Page Transition Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default About;
