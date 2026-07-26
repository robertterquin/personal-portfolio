import { useEffect, useState, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles] = useState(() => [...Array(20)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 30 + 25,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.2 + 0.05,
  })));
  const [dataStreams] = useState(() => [...Array(8)].map((_, i) => ({
    id: i,
    left: (i + 1) * 12,
    height: Math.random() * 30 + 20,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  })));
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

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen text-white py-32 px-8 md:px-16 lg:px-24 relative flex items-center"
    >      {/* Page Transition Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none"></div>      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, rgba(163, 163, 163, 0.6) 100%),
            linear-gradient(0deg, transparent 98%, rgba(163, 163, 163, 0.6) 100%)
          `,
          backgroundSize: '100px 100px',
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-87.5 h-87.5 bg-conic from-mono-300/10 via-mono-400/06 to-mono-300/10 rounded-full blur-[90px] animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-32 right-20 w-75 h-75 bg-radial from-mono-400/12 to-transparent rounded-full blur-[70px] animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
      </div>

      {/* Data Streams (Vertical Lines) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {dataStreams.map((stream) => (
          <div
            key={stream.id}
            className="absolute top-0 w-px opacity-20"
            style={{
              left: `${stream.left}%`,
              background: 'linear-gradient(to bottom, transparent, rgba(163, 163, 163, 0.5), transparent)',
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
            className="absolute rounded-full bg-mono-600 animate-float"
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
        <div className="absolute top-1/4 right-10 w-40 h-40 border border-mono-300/15 rounded-lg rotate-12 animate-spin-slow" style={{animationDuration: '45s'}}></div>
        <div className="absolute bottom-1/3 left-16 w-32 h-32 border-2 border-dashed border-mono-300/10 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 relative animate-spin-slow" style={{animationDuration: '35s'}}>
          <div className="absolute inset-3 border-l-2 border-t-2 border-mono-400/15 rounded-tl-xl"></div>
          <div className="absolute inset-3 border-r-2 border-b-2 border-mono-300/15 rounded-br-xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-400 mx-auto w-full">
        {/* Main Grid Layout - Asymmetric */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-32 items-start">
          {/* Left Column - Big Typography */}
          <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <span className="text-mono-700 text-sm uppercase tracking-[0.4em] font-semibold mb-8 block">About Me</span>
            
            <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tighter">
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-mono-950 via-mono-900 to-mono-800 mb-2">Mobile First</span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-mono-900 to-mono-700 mb-2">Solutions</span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-mono-600 to-mono-500 font-light italic mb-2">User</span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-mono-500 to-mono-400 font-light italic">Focused</span>
            </h2>
            
            {/* Decorative Element */}
            <div className="flex items-center gap-6 pt-12">
              <div className="w-24 h-1 bg-linear-to-r from-mono-600 to-mono-800"></div>
              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-mono-600"></div>
                <div className="w-3 h-3 rounded-full bg-mono-700"></div>
                <div className="w-3 h-3 rounded-full bg-mono-800"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Description with Profile Image */}
          <div className={`space-y-10 text-center pt-20 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            {/* Description Text */}
            <div className="space-y-8">
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light">
                Hi, I'm <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-950 to-mono-900 font-semibold">Robert Terquin Laqui</span>, a{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-800 via-mono-900 to-mono-950 font-semibold">Full Stack Developer</span> with{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-700 to-mono-900 font-semibold">3+ years</span> of experience.
              </p>
              
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                I specialize in building cross-platform mobile apps with <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-800 to-mono-950 font-medium">Flutter</span>, integrated with <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-800 to-mono-950 font-medium">Firebase</span> and <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-800 to-mono-950 font-medium">Supabase</span>. I deliver secure, scalable, and user-centric applications that combine technical excellence with intuitive design.
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
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default About;
