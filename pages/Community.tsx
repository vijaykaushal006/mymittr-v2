
import React from 'react';
import { MOCK_POSTS } from '../constants';

const Community: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-blue-900 text-white p-12 rounded-3xl mb-12 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl mb-4 italic">Welcome to the Wisdom Circle</h1>
          <p className="text-xl opacity-90 max-w-lg">A safe, respectful space to share stories, ask questions, and celebrate this beautiful chapter of life.</p>
        </div>
        <div className="absolute top-0 right-0 p-8 text-8xl opacity-10">🌿</div>
      </div>

      <div className="space-y-8">
        {/* Create Post Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex gap-4 items-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">JD</div>
            <input 
              type="text" 
              placeholder="What's on your mind today?" 
              className="flex-grow bg-gray-50 border-none rounded-full px-6 py-3 text-lg focus:ring-2 focus:ring-blue-100 outline-none"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700">Share</button>
          </div>
        </div>

        {/* Feed */}
        {MOCK_POSTS.map(post => (
          <div key={post.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">{post.author}</h4>
                  <p className="text-gray-500">{post.authorRole}</p>
                </div>
              </div>
              <span className="text-gray-400">{post.date}</span>
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              {post.content}
            </p>

            <div className="flex gap-8 border-t border-gray-50 pt-6 mt-6">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                <span className="text-2xl">❤️</span> {post.likes} Wisdoms
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                <span className="text-2xl">💬</span> {post.comments} Thoughts
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
