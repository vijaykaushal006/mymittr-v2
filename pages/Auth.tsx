
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-gray-500">
            {isLogin ? 'Login to see your updates and jobs.' : 'Join a community that values your journey.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-bold mb-2">What should we call you?</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Full Name" />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Your Email Address</label>
            <input required type="email" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none" placeholder="you@email.com" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input required type="password" minLength={6} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full py-5 bg-blue-600 text-white text-xl rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
            {isLogin ? 'Login to MyMittr' : 'Start My Journey'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-600 mb-4">
            {isLogin ? "New to MyMittr?" : "Already have an account?"}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-bold text-lg underline"
          >
            {isLogin ? 'Create an account for free' : 'Login instead'}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>By joining, you agree to our respectful community guidelines.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
