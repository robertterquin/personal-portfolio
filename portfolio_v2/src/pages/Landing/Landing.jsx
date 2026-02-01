import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-8 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-3xl text-center relative z-10">
        {/* Image Placeholder */}
        <div className="mb-8 flex justify-center">
          <div className="p-1 bg-gradient-to-br from-white via-gray-500 to-white rounded-full">
            <div className="w-44 h-44 bg-gradient-to-br from-neutral-900 to-black rounded-full flex items-center justify-center border-4 border-black shadow-lg shadow-white/10">
              <span className="text-6xl grayscale opacity-60">👤</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="block text-sm md:text-base font-normal text-gray-500 uppercase tracking-[0.3em] mb-2">
              Hello, I'm
            </span>
            <span className="block bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Your Name
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-4 font-light tracking-wider">
            Full Stack Developer
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-12 leading-relaxed">
          I craft digital experiences with clean code and creative design.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/projects"
            className="px-8 py-4 bg-white text-black font-medium uppercase tracking-wider text-sm border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300"
          >
            View My Work
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 bg-transparent text-white font-medium uppercase tracking-wider text-sm border-2 border-gray-600 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Get In Touch
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-8 justify-center">
          {['About', 'Projects', 'Certification', 'Contact'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-gray-500 text-sm uppercase tracking-[0.2em] relative hover:text-white transition-colors duration-300 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs uppercase tracking-[0.2em] text-gray-600">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent"></div>
      </div>
    </div>
  );
};

export default Landing;
