import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const Landing = () => {
  const [flowingLines, setFlowingLines] = useState([]);

  useEffect(() => {
    // Generate flowing curved lines for background
    const generatedLines = [...Array(12)].map((_, i) => ({
      id: i,
      path: generateCurvePath(i),
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setFlowingLines(generatedLines);
  }, []);

  const generateCurvePath = (index) => {
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const curves = [];
    let currentX = startX;
    let currentY = startY;
    
    for (let i = 0; i < 3; i++) {
      const controlX1 = currentX + (Math.random() * 40 - 20);
      const controlY1 = currentY + (Math.random() * 40 - 20);
      const controlX2 = currentX + (Math.random() * 40 - 20);
      const controlY2 = currentY + (Math.random() * 40 - 20);
      const endX = currentX + (Math.random() * 30 - 15);
      const endY = currentY + (Math.random() * 30 - 15);
      
      curves.push(`C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`);
      currentX = endX;
      currentY = endY;
    }
    
    return `M ${startX} ${startY} ${curves.join(' ')}`;
  };

  return (
    <section id="home" className="min-h-screen w-full text-white relative overflow-hidden">
      {/* Diagonal Stripe Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(163, 163, 163, 0.5) 0px,
            rgba(163, 163, 163, 0.5) 2px,
            transparent 2px,
            transparent 60px
          )`,
        }}></div>
      </div>

      {/* Radial Burst Pattern from Center */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full" style={{
          background: `
            radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(163, 163, 163, 0.1) 70%, transparent 100%),
            conic-gradient(from 0deg at 50% 50%, 
              transparent 0deg, 
              rgba(163, 163, 163, 0.15) 45deg, 
              transparent 90deg,
              transparent 90deg,
              rgba(163, 163, 163, 0.15) 135deg,
              transparent 180deg,
              transparent 180deg,
              rgba(163, 163, 163, 0.15) 225deg,
              transparent 270deg,
              transparent 270deg,
              rgba(163, 163, 163, 0.15) 315deg,
              transparent 360deg
            )
          `,
        }}></div>
      </div>

      {/* Multiple Layered Gradient Meshes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-[650px] h-[650px] rounded-full blur-[150px] animate-pulse opacity-20" 
          style={{
            background: 'radial-gradient(circle, rgba(163, 163, 163, 0.4) 0%, transparent 70%)',
            animationDuration: '15s'
          }}></div>
        <div className="absolute bottom-20 right-20 w-[550px] h-[550px] rounded-full blur-[140px] animate-pulse opacity-20" 
          style={{
            background: 'radial-gradient(circle, rgba(163, 163, 163, 0.5) 0%, transparent 70%)',
            animationDuration: '12s',
            animationDelay: '3s'
          }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] animate-pulse opacity-15" 
          style={{
            background: 'radial-gradient(circle, rgba(163, 163, 163, 0.6) 0%, transparent 70%)',
            animationDuration: '18s',
            animationDelay: '6s'
          }}></div>
      </div>

      {/* Hexagonal Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="100" height="87" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="rgba(163, 163, 163, 0.5)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Animated Geometric Accents */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 border-2 border-mono-300/10 rotate-45 animate-spin-slow" style={{animationDuration: '60s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 border border-mono-300/8 rounded-full animate-spin-slow" style={{animationDuration: '50s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-dashed border-mono-400/10 rotate-12 animate-spin-slow" style={{animationDuration: '55s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-44 h-44 relative animate-spin-slow" style={{animationDuration: '65s'}}>
          <div className="absolute inset-4 border-l-2 border-t-2 border-mono-400/12 rounded-tl-2xl rotate-45"></div>
          <div className="absolute inset-4 border-r-2 border-b-2 border-mono-300/12 rounded-br-2xl rotate-45"></div>
        </div>
      </div>

      {/* Flowing Code-like Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] font-mono text-xs overflow-hidden">
        <div className="absolute top-10 left-20 animate-float" style={{animationDuration: '25s'}}>{'{ } [ ] < >'}</div>
        <div className="absolute top-1/4 right-32 animate-float" style={{animationDuration: '30s', animationDelay: '5s'}}>{'=> () =>'}</div>
        <div className="absolute bottom-1/3 left-1/4 animate-float" style={{animationDuration: '28s', animationDelay: '8s'}}>{'/* */ //'}</div>
        <div className="absolute top-1/2 right-1/4 animate-float" style={{animationDuration: '32s', animationDelay: '3s'}}>{'</> <>'}</div>
        <div className="absolute bottom-1/4 left-1/3 animate-float" style={{animationDuration: '27s', animationDelay: '10s'}}>{'() => {}'}</div>
      </div>

      {/* Top Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 py-6">
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm">
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-8 md:px-16 py-12 md:py-20 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full max-w-6xl">
          
          {/* Left Side - Profile Image with Service Tags */}
          <motion.div
            className="relative flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Profile Circle */}
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden border-8 border-mono-300 relative">
                <img 
                  src="/profile.jpg" 
                  alt="Robert Terquin Laqui" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-mono-200 to-mono-400 flex items-center justify-center"><span class="text-7xl font-bold text-white">RT</span></div>';
                  }}
                />
              </div>

              {/* Service Tags */}
              <div className="absolute -top-4 right-8 md:right-12 px-4 py-2 bg-white text-black rounded-full text-xs md:text-sm font-medium shadow-lg">
                Full Stack Developer
              </div>
              
              <div className="absolute top-1/4 -left-4 md:-left-8 px-4 py-2 bg-white text-black rounded-full text-xs md:text-sm font-medium shadow-lg">
                Flutter Expert
              </div>
              
              <div className="absolute bottom-1/4 -right-4 md:-right-8 px-4 py-2 bg-white text-black rounded-full text-xs md:text-sm font-medium shadow-lg">
                Firebase & Supabase
              </div>
              
              <div className="absolute -bottom-4 left-1/4 px-4 py-2 bg-white text-black rounded-full text-xs md:text-sm font-medium shadow-lg">
                3+ Years Experience
              </div>
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter" style={{
              textShadow: '0 10px 30px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(163, 163, 163, 0.2)'
            }}>
              Where Concepts<br />
              Become <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300">Code</span>
            </h1>

            <p className="text-gray-300 text-xl md:text-2xl leading-relaxed font-medium" style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}>
              Transforming your vision into scalable, high-performance applications. Specializing in full-stack development with a focus on clean code and exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a href="#projects" className="group inline-flex items-center justify-center gap-2 px-9 py-4 bg-gradient-to-r from-mono-600 to-mono-800 rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                View My Work
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-9 py-4 border-2 border-mono-600 rounded-xl font-semibold text-mono-300 hover:bg-mono-900/30 transition-all duration-300">
                Get in Touch
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Page Transition Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Landing;
