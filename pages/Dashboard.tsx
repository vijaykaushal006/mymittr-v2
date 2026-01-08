
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl text-blue-900 mb-2">Good morning, John.</h1>
          <p className="text-xl text-gray-500">It's a wonderful day to share your wisdom.</p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-4">
           <Link to="/profile" className="px-6 py-3 bg-white border border-gray-200 rounded-full font-bold hover:bg-gray-50">View Profile</Link>
           <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 shadow-md transition">Post an Update</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Link to="/jobs" className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition group text-center">
          <div className="text-5xl mb-6 group-hover:scale-110 transition duration-300">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Find Jobs</h3>
          <p className="text-gray-500">Explore age-friendly opportunities that match your expertise.</p>
        </Link>
        <Link to="/community" className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition group text-center">
          <div className="text-5xl mb-6 group-hover:scale-110 transition duration-300">🤝</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Community</h3>
          <p className="text-gray-500">Connect with others and join meaningful conversations.</p>
        </Link>
        <Link to="/messages" className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition group text-center">
          <div className="text-5xl mb-6 group-hover:scale-110 transition duration-300">✉️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Messages</h3>
          <p className="text-gray-500">Check your private inbox for replies and job updates.</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest in Community</h2>
          {/* Small feed preview */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 shrink-0"></div>
            <div>
              <p className="font-bold">Mary Smith <span className="text-sm font-normal text-gray-400 ml-2">2h ago</span></p>
              <p className="text-gray-600 mt-1">Just finished my first week as a part-time mentor. It's so refreshing to work somewhere that actually listens!</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 shrink-0"></div>
            <div>
              <p className="font-bold">Arthur Lee <span className="text-sm font-normal text-gray-400 ml-2">5h ago</span></p>
              <p className="text-gray-600 mt-1">Has anyone else transitioned into consulting later in life? I'd love to hear your advice on setting hourly rates.</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 h-fit">
          <h3 className="text-xl font-bold text-blue-900 mb-4 italic">Wisdom of the Day</h3>
          <p className="text-lg text-blue-800 leading-relaxed mb-6">
            "Your age is not a countdown. It is a collection of stories, successes, and hard-earned knowledge. Don't let anyone tell you you're past your prime—you ARE in your prime."
          </p>
          <div className="text-sm text-blue-600 font-bold">— The MyMittr Team</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
