import { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion as Motion } from 'motion/react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles] = useState(() => [...Array(30)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 25 + 20,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.25 + 0.05,
  })));
  const [shapes] = useState(() => [...Array(7)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 140 + 70,
    rotation: Math.random() * 360,
    duration: Math.random() * 38 + 28,
    delay: Math.random() * 5,
  })));
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // honeypot field
  });
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.website) {
      console.log('Spam detected');
      return;
    }
    
    setIsLoading(true);
    setSubmitMessage('');
    
    try {
      const result = await emailjs.send(
        'service_u4yc234',
        'template_s2q26pk',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        'DPmOCAQCmCV49E2IM'
      );
      console.log('EmailJS success:', result);
      setSubmitMessage('✓ Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      console.error('EmailJS error status:', error.status);
      console.error('EmailJS error text:', error.text);
      setSubmitMessage(`Error: ${error.text || 'Failed to send message. Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="page-shell page-shell--contact min-h-screen text-white py-32 px-8 md:px-16 lg:px-24 relative overflow-hidden"
    >
      {/* Page Transition Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none z-20"></div>
      {/* Animated Background - Diamond/Rhombus Shapes */}
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
            {/* Outer rotating diamond */}
            <div className="absolute inset-0" style={{
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              border: `2px solid rgba(163, 163, 163, 0.25)`,
              animation: `spin ${shape.duration * 1.2}s linear infinite`,
              boxShadow: `0 0 20px rgba(163, 163, 163, 0.15)`,
            }}></div>
            
            {/* Inner rotating diamond */}
            <div className="absolute inset-3" style={{
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              border: `1.5px solid rgba(212, 212, 212, 0.2)`,
              animation: `spin-reverse ${shape.duration * 1.5}s linear infinite`,
              boxShadow: `0 0 15px rgba(212, 212, 212, 0.12)`,
            }}></div>

            {/* Middle accent diamond */}
            <div className="absolute inset-1.5" style={{
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              border: `1px solid rgba(115, 115, 115, 0.15)`,
              animation: `spin ${shape.duration * 0.9}s linear infinite`,
            }}></div>
            
            {/* Center accent dot with glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-mono-600/40 rounded-full blur-sm" style={{
              boxShadow: `0 0 12px rgba(163, 163, 163, 0.5), 0 0 24px rgba(163, 163, 163, 0.25)`
            }}></div>
          </div>
        ))}
      </div>

      {/* Elegant Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/3 right-1/4 w-150 h-150 bg-conic from-mono-400/10 via-mono-300/06 to-mono-400/10 rounded-full blur-[130px] animate-pulse" style={{animationDuration: '18s'}}></div>
        <div className="absolute -bottom-1/4 left-1/4 w-125 h-125 bg-radial from-mono-400/12 via-mono-300/08 to-transparent rounded-full blur-[110px] animate-pulse" style={{animationDuration: '14s', animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-0 w-100 h-100 bg-conic from-mono-300/06 via-mono-400/04 to-transparent rounded-full blur-[100px] animate-pulse" style={{animationDuration: '20s', animationDelay: '6s'}}></div>
      </div>

      {/* Enhanced Floating Particles */}
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
              background: particle.id % 4 === 0 ? 'rgba(212, 212, 212, 0.5)' : particle.id % 4 === 1 ? 'rgba(163, 163, 163, 0.45)' : particle.id % 4 === 2 ? 'rgba(115, 115, 115, 0.5)' : 'rgba(82, 82, 82, 0.4)',
              opacity: particle.opacity * 1.2,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.id % 4 === 0 ? 'rgba(212, 212, 212, 0.4)' : particle.id % 4 === 1 ? 'rgba(163, 163, 163, 0.35)' : particle.id % 4 === 2 ? 'rgba(115, 115, 115, 0.35)' : 'rgba(82, 82, 82, 0.3)'}`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-350 mx-auto w-full">
        
        {/* Header Section */}
        <Motion.div
          className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-cyan-300 to-transparent"></div>
            <span className="font-mono text-mono-700 text-xs uppercase tracking-[0.3em] font-semibold">Get In Touch</span>
          </div>
          
          {/* Main Title */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-4">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-600 via-mono-800 to-mono-950 animate-gradient">Let's</span>
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mono-950 to-mono-800">Connect</span>
              </h2>
              <div className="h-1 w-20 bg-linear-to-r from-mono-500 via-mono-600 to-mono-700 rounded-full mt-6"></div>
            </div>
            
            <div className="space-y-6 lg:pt-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities and collaborations.
              </p>
              <div className="grid grid-cols-1 gap-4 pt-4">
                <div className="p-4 rounded-lg border border-gray-800/50 bg-linear-to-br from-mono-200/05 to-transparent backdrop-blur-sm hover:border-mono-400/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-mono-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm text-gray-300">business.treevor@gmail.com</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-gray-800/50 bg-linear-to-br from-mono-200/05 to-transparent backdrop-blur-sm hover:border-mono-400/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-mono-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="text-sm text-gray-300">Philippines</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion.div>

        {/* Contact Form */}
        <Motion.div
          className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="max-w-3xl mx-auto">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot Field (Hidden) */}
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-600/70 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all backdrop-blur-sm focus:border-cyan-300/80 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-600/70 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all backdrop-blur-sm focus:border-cyan-300/80 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-600/70 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all backdrop-blur-sm focus:border-cyan-300/80 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-gray-600/70 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all backdrop-blur-sm focus:border-cyan-300/80 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative px-8 py-4 bg-linear-to-r from-mono-600 to-mono-800 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-mono-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? 'Sending...' : 'Send Message'}
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-mono-700 to-mono-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                {submitMessage && (
                  <p className={`text-sm ${submitMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                    {submitMessage}
                  </p>
                )}
              </div>
            </form>



            {/* Social Links */}
            <Motion.div
              className={`mt-16 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="text-center mb-6">
                <p className="text-gray-400 text-sm">Or connect with me on</p>
              </div>
              <div className="flex justify-center gap-4">
                <a href="https://github.com/robertterquin" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-mono-800 hover:border-mono-500/50 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/robertterquinlaqui/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-mono-800 hover:border-mono-500/50 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </Motion.div>
          </div>
        </Motion.div>

        {/* Bottom CTA */}
        <Motion.div
          className={`mt-16 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-gray-400 text-sm">Looking forward to hearing from you</p>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-mono-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-mono-700 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-mono-800 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </Motion.div>
      </div>

      {/* Page Transition Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-mono-400/30 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Contact;
