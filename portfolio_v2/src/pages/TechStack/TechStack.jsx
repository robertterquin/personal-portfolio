import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const logoBase = 'https://robertterquinlaqui.vercel.app/images/';

const categories = [
  {
    title: 'Programming Languages',
    description: 'The foundations I use to shape reliable digital experiences.',
    accent: 'text-cyan-300',
    items: [
      { name: 'HTML5', level: 'Advanced', image: 'html-5.png' },
      { name: 'CSS3', level: 'Advanced', image: 'css-3.png' },
      { name: 'JavaScript', level: 'Intermediate', image: 'java-script.png' },
      { name: 'Java', level: 'Advanced', image: 'java.png' },
      { name: 'C', level: 'Intermediate', image: 'letter-c.png' },
      { name: 'Python', level: 'Intermediate', image: 'python.png' },
      { name: 'Dart', level: 'Learning', image: 'dart.png' },
    ],
  },
  {
    title: 'Backend Development',
    description: 'Services and APIs that keep applications connected.',
    accent: 'text-emerald-300',
    items: [
      { name: 'Node.js', level: 'Learning', image: 'nodejs.png' },
      { name: 'Express.js', level: 'Learning', image: 'express.png' },
    ],
  },
  {
    title: 'Databases',
    description: 'Data platforms for structured, scalable products.',
    accent: 'text-amber-300',
    items: [
      { name: 'MySQL', level: 'Intermediate', image: 'mysql.png' },
      { name: 'Supabase', level: 'Learning', image: 'supabase.webp' },
      { name: 'Firebase', level: 'Learning', image: 'firebase.png' },
      { name: 'MongoDB', level: 'Learning', image: 'mongodb.png' },
    ],
  },
  {
    title: 'Mobile Development',
    description: 'Cross-platform interfaces built for everyday use.',
    accent: 'text-sky-300',
    items: [
      { name: 'Flutter', level: 'Learning', image: 'flutter.png' },
    ],
  },
  {
    title: 'Development Tools & IDEs',
    description: 'The tools that support my build, test, and delivery workflow.',
    accent: 'text-violet-300',
    items: [
      { name: 'Git', level: 'Intermediate', image: 'social.png' },
      { name: 'GitHub', level: 'Advanced', image: 'github.png' },
      { name: 'Android Studio', level: 'Intermediate', image: 'android-studio.png' },
      { name: 'VSCode', level: 'Advanced', image: 'vscode.png' },
      { name: 'NetBeans', level: 'Intermediate', image: 'netbeans.png' },
      { name: 'Postman', level: 'Learning', image: 'postman.png' },
    ],
  },
  {
    title: 'Cloud & Deployment',
    description: 'Platforms I use to bring projects from code to the web.',
    accent: 'text-rose-300',
    items: [
      { name: 'Render', level: 'Learning', image: 'render.webp' },
    ],
  },
];

const TechStack = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const techCount = categories.reduce((total, category) => total + category.items.length, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative min-h-screen overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-20 md:px-16 md:py-24 lg:px-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 96%, rgba(163, 163, 163, 0.08) 98%, transparent 100%),
              linear-gradient(0deg, transparent 96%, rgba(163, 163, 163, 0.08) 98%, transparent 100%)
            `,
            backgroundSize: '120px 120px',
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <div className={`mb-14 grid grid-cols-1 gap-8 transition-all duration-700 lg:grid-cols-[1fr_1.1fr] lg:gap-16 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-cyan-300 to-transparent"></div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-mono-700">Toolkit</span>
            </div>
            <h2 className="text-6xl font-bold leading-tight tracking-tighter md:text-7xl lg:text-8xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-mono-900 to-white">Tech</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-mono-600">Stack</span>
            </h2>
            <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-300 via-mono-600 to-violet-300"></div>
          </div>

          <div className="space-y-6 lg:pt-4">
            <p className="max-w-2xl text-lg leading-relaxed text-gray-300">
              A growing toolkit for building thoughtful mobile, web, and backend experiences. Each technology reflects a part of how I learn, design, and ship.
            </p>
            <div className="grid max-w-lg grid-cols-2 gap-4">
              <div className="border border-gray-800/70 bg-black/20 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-cyan-200">{techCount}</div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
              <div className="border border-gray-800/70 bg-black/20 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-violet-200">{categories.length}</div>
                <div className="text-sm text-gray-400">Focus Areas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className={`group border border-gray-800/70 bg-black/25 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-gray-500/70 hover:bg-black/40 sm:p-6 ${categoryIndex === 0 ? 'md:col-span-2 xl:col-span-2' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.08, ease: 'easeOut' }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className={`text-xl font-semibold ${category.accent}`}>{category.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-400">{category.description}</p>
                </div>
                <span className="shrink-0 text-xs text-gray-600">{String(category.items.length).padStart(2, '0')}</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {category.items.map((item) => (
                  <motion.div
                    key={item.name}
                    className="group/tech flex min-w-0 items-center gap-3 border border-gray-800/70 bg-gray-950/50 p-3 transition-all hover:border-gray-600 hover:bg-gray-900/80"
                    whileHover={{ y: -3, scale: 1.015 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gray-700/80 bg-white/5 p-2">
                      <img
                        src={`${logoBase}${item.image}`}
                        alt={`${item.name} logo`}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover/tech:scale-110"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium text-gray-100">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.level}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
