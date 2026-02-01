import { useEffect, useState, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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
    >
      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full">
        {/* Main Grid Layout - Asymmetric */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-32 items-start">
          {/* Left Column - Big Typography */}
          <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <span className="text-cyan-400 text-sm uppercase tracking-[0.4em] font-semibold mb-8 block">About</span>
            
            <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tighter">
              <span className="block text-white mb-2">Crafting</span>
              <span className="block text-white mb-2">experiences</span>
              <span className="block text-gray-500 font-light italic mb-2">not just</span>
              <span className="block text-gray-500 font-light italic">interfaces</span>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold">Full Stack Developer</span> and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">Problem Solver</span>.
              </p>
              
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                I specialize in creating user-centered applications that seamlessly blend aesthetics 
                with functionality, turning complex problems into elegant solutions. With expertise in 
                modern web technologies, I build performant and scalable applications that make an impact.
              </p>

              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                Driven by a passion for crafting intuitive digital experiences, I'm constantly exploring 
                new technologies and pushing the boundaries of what's possible on the web.
              </p>
            </div>

            {/* Enhanced Info Pills */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full hover:border-cyan-400 transition-all duration-300">
                <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full group-hover:animate-pulse"></div>
                <span className="text-base text-gray-200 font-medium">React & Node.js</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-full hover:border-purple-400 transition-all duration-300">
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full group-hover:animate-pulse"></div>
                <span className="text-base text-gray-200 font-medium">Philippines</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-full hover:border-blue-400 transition-all duration-300">
                <div className="w-2.5 h-2.5 bg-blue-400 rounded-full group-hover:animate-pulse"></div>
                <span className="text-base text-gray-200 font-medium">Open to Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
