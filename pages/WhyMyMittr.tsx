
import React from 'react';
import { Link } from 'react-router-dom';

const WhyMyMittr: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl text-blue-900 text-center mb-12 italic">Why choose MyMittr?</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-gray-100 p-10 rounded-3xl opacity-70">
          <h2 className="text-2xl font-bold mb-6 text-gray-500">Other Platforms</h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <span className="text-red-400 text-2xl">✕</span>
              <p className="text-lg">Fast-paced, high-pressure environments.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-red-400 text-2xl">✕</span>
              <p className="text-lg">Complex tech and tiny, hard-to-read text.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-red-400 text-2xl">✕</span>
              <p className="text-lg">Focus on youth and buzzwords.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-red-400 text-2xl">✕</span>
              <p className="text-lg">Overwhelming notifications and jargon.</p>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-10 rounded-3xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">The MyMittr Way</h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <span className="text-green-500 text-2xl">✓</span>
              <p className="text-lg font-medium text-blue-900">A calm space where you take your time.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-500 text-2xl">✓</span>
              <p className="text-lg font-medium text-blue-900">Large fonts and simple, clear buttons.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-500 text-2xl">✓</span>
              <p className="text-lg font-medium text-blue-900">Experience is celebrated, not hidden.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-500 text-2xl">✓</span>
              <p className="text-lg font-medium text-blue-900">Plain English and human interaction.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-12 rounded-3xl text-center shadow-lg border border-gray-100">
        <h3 className="text-3xl text-blue-900 mb-6">Built for Dignity</h3>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          We believe that professional platforms should feel like a comfortable living room conversation, not a chaotic market square. You've worked hard for decades—now you deserve a platform that works for you.
        </p>
        <Link to="/auth" className="inline-block px-12 py-5 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition">
          I'm Ready to Join
        </Link>
      </div>
    </div>
  );
};

export default WhyMyMittr;
