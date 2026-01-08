
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl text-blue-900 leading-tight mb-8">
            Your Experience is <br/><span className="italic text-blue-600">Your Greatest Strength.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12">
            MyMittr is the respectful digital home for professionals aged 45 and above. 
            Connect with peers, share your life's wisdom, and find opportunities that value your time.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/auth" className="px-10 py-5 bg-blue-600 text-white text-xl rounded-full font-semibold hover:bg-blue-700 shadow-lg transition transform hover:-translate-y-1">
              Join MyMittr Today
            </Link>
            <Link to="/jobs" className="px-10 py-5 border-2 border-blue-600 text-blue-600 text-xl rounded-full font-semibold hover:bg-blue-50 transition">
              Browse Age-Friendly Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Simplicity Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">🕊️</div>
              <h3 className="text-2xl font-bold mb-4">Calm & Simple</h3>
              <p className="text-gray-600 text-lg">No clutter. No complex tech jargon. Just a peaceful space designed for real connection and easy navigation.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-4">Respectful Always</h3>
              <p className="text-gray-600 text-lg">We value your privacy and your dignity. There's no pressure to 'rush' or 'compete' here.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-4">Meaningful Work</h3>
              <p className="text-gray-600 text-lg">Discover roles that appreciate your years of expertise, from part-time consulting to mentorship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Who Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-blue-900 mb-8">Who is MyMittr for?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-4 p-4">
              <span className="text-green-500 text-2xl font-bold">✓</span>
              <p className="text-lg">Professionals (45+) looking for their next meaningful chapter.</p>
            </div>
            <div className="flex items-start gap-4 p-4">
              <span className="text-green-500 text-2xl font-bold">✓</span>
              <p className="text-lg">Retired individuals who want to stay active and share wisdom.</p>
            </div>
            <div className="flex items-start gap-4 p-4">
              <span className="text-green-500 text-2xl font-bold">✓</span>
              <p className="text-lg">Homemakers restarting their careers in a supportive environment.</p>
            </div>
            <div className="flex items-start gap-4 p-4">
              <span className="text-green-500 text-2xl font-bold">✓</span>
              <p className="text-lg">Anyone seeking work with dignity, flexibility, and respect.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl mb-8">Ready to rediscover your value?</h2>
          <p className="text-xl opacity-90 mb-12 italic">"At MyMittr, we believe that every grey hair represents a lesson learned and a story worth sharing."</p>
          <Link to="/auth" className="inline-block px-12 py-5 bg-white text-blue-900 rounded-full font-bold text-xl hover:bg-gray-100 transition">
            Join the Community
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
