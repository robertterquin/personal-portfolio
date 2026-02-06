import { useEffect, useState } from 'react';

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
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, rgba(163, 163, 163, 0.6) 100%),
            linear-gradient(0deg, transparent 98%, rgba(163, 163, 163, 0.6) 100%)
          `,
          backgroundSize: '80px 80px',
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-conic from-mono-300/15 via-mono-400/10 to-mono-300/15 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '10s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-mono-400/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{animationDuration: '8s', animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-radial from-mono-300/10 to-transparent rounded-full blur-[90px] animate-pulse" style={{animationDuration: '12s', animationDelay: '1s'}}></div>
      </div>

      {/* Flowing Line Patterns Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
        {flowingLines.map((line) => (
          <path
            key={line.id}
            d={line.path}
            stroke="rgba(163, 163, 163, 0.15)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{
              animationDuration: `${line.duration}s`,
              animationDelay: `${line.delay}s`,
            }}
          />
        ))}
      </svg>

      {/* Geometric Accent Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-32 h-32 border border-mono-300/10 rounded-lg rotate-12 animate-spin-slow" style={{animationDuration: '50s'}}></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 border-2 border-dashed border-mono-300/8 rounded-full opacity-50 animate-spin-slow" style={{animationDuration: '40s'}}></div>
        <div className="absolute top-1/3 left-10 w-20 h-20 relative animate-spin-slow" style={{animationDuration: '45s'}}>
          <div className="absolute inset-2 border-l-2 border-t-2 border-mono-400/10 rounded-tl-xl"></div>
          <div className="absolute inset-2 border-r-2 border-b-2 border-mono-300/10 rounded-br-xl"></div>
        </div>
      </div>

      {/* Top Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 py-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-mono-900 rounded-lg flex items-center justify-center text-2xl font-bold text-white transform -skew-y-6">
            ⚡
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm">
          {['About', 'Projects', 'Certification', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-8 md:px-16 py-12 md:py-20 flex items-center min-h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full max-w-7xl mx-auto">
          
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Where Concepts<br />
              Become <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Code</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Transforming your vision into scalable, high-performance applications. Specializing in full-stack development with a focus on clean code and exceptional user experiences.
            </p>
          </div>

          {/* Right Side - Profile Image with Service Tags */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Profile Circle */}
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-mono-300 relative">
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
          </div>

        </div>
      </div>

      {/* Page Transition Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Landing;
