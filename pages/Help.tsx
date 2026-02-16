
import React from 'react';

const Help: React.FC = () => {
  const faqs = [
    {
      q: 'Is MyMittr only for people over 45?',
      a: "While we welcome everyone, our community and job listings are specifically tailored to the needs, preferences, and respect that comes with being 45+ or 'experienced'. It is a space designed for you."
    },
    {
      q: 'Is it free to join?',
      a: "Yes! Creating a profile, joining the community, and applying for jobs is completely free for individuals."
    },
    {
      q: 'Do I need a resume?',
      a: "No. You can create a simple profile on MyMittr that highlights your wisdom and skills. Many of our employers prefer seeing your life's experience over a standard document."
    },
    {
      q: 'How do I know if a job is "Age-Friendly"?',
      a: "We personally vet every company that posts on MyMittr. They must agree to our respect guidelines and demonstrate that they value mature talent."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl text-blue-900 mb-4 italic">How can we help you today?</h1>
        <p className="text-xl text-gray-500">Find answers to common questions or reach out to our team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-xl font-bold mb-2">User Guides</h3>
          <p className="text-gray-500 mb-6">Learn how to make the most of your profile and community.</p>
          <button className="text-blue-600 font-bold underline">Read Guides</button>
        </div>
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold mb-2">Safety Center</h3>
          <p className="text-gray-500 mb-6">Our commitment to your privacy and a respectful environment.</p>
          <button className="text-blue-600 font-bold underline">Learn More</button>
        </div>
      </div>

      <div className="space-y-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 italic">Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h4 className="text-xl font-bold text-blue-900 mb-3 underline decoration-blue-200 underline-offset-4">{faq.q}</h4>
            <p className="text-lg text-gray-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-blue-900 text-white rounded-3xl text-center">
        <h3 className="text-2xl mb-6">Still have questions?</h3>
        <p className="text-xl opacity-90 mb-8">A real human is ready to talk. No robots, just support.</p>
        <a href="mailto:support@mymittr.com" className="inline-block px-12 py-5 bg-white text-blue-900 rounded-full font-bold text-xl hover:bg-gray-100 transition">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default Help;
