
import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'Sign Up Simply',
      desc: 'Just an email or phone number. No complex forms or endless verification steps. We keep it human.'
    },
    {
      number: '2',
      title: 'Share Your Story',
      desc: "Instead of a rigid resume, tell us what you've done and what you enjoy. Your profile is about YOU, not just your job titles."
    },
    {
      number: '3',
      title: 'Find Your Tribe',
      desc: 'Browse discussions or job listings. Everything is labeled clearly so you know exactly what to expect.'
    },
    {
      number: '4',
      title: 'Apply with One Click',
      desc: "If you see a job you like, just hit 'Apply'. Your profile is enough. No need to upload files or fight with formatting."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl text-blue-900 mb-6">How MyMittr Works</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">We've designed every step to be calm, clear, and comfortable for you. No pressure, just possibilities.</p>
      </div>

      <div className="space-y-12">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold shrink-0">
              {step.number}
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-lg text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link to="/auth" className="px-10 py-4 bg-green-600 text-white text-xl rounded-full hover:bg-green-700 transition">
          Let's Get Started
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
