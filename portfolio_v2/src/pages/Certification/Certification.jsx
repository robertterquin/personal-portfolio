import { Link } from 'react-router-dom';

const Certification = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16">
      <Link to="/" className="inline-block mb-8 text-gray-500 text-sm uppercase tracking-wider hover:text-white transition-colors">
        ← Back to Home
      </Link>
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Certifications</h1>
      <p className="text-gray-400 text-lg">This section is coming soon...</p>
    </div>
  );
};

export default Certification;
