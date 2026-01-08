
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl text-blue-900 mb-6">We're here to help.</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Whether you're having trouble with your profile, want to learn more about a job, or just want to say hello—we're all ears.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl">📧</span>
              <div>
                <p className="font-bold">Email us anytime</p>
                <p className="text-blue-600">support@mymittr.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl">📞</span>
              <div>
                <p className="font-bold">Request a Call</p>
                <p className="text-gray-600">Leave your number, we'll call you back.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">📬</div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h2>
              <p className="text-gray-600">Thank you for reaching out. A human member of our team will get back to you within 24 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-blue-600 font-bold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Your Name</label>
                <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Your Email</label>
                <input required type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">How can we help?</label>
                <textarea required rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Tell us what's on your mind..."></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white text-xl rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
                Send My Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
