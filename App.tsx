
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Jobs from './pages/Jobs';
import Community from './pages/Community';
import WhyMyMittr from './pages/WhyMyMittr';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Help from './pages/Help';
import JobDetails from './pages/JobDetails';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <span className="text-3xl">🤝</span> MyMittr
            </Link>
            
            <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
              {!isAuthenticated ? (
                <>
                  <Link to="/about" className="hover:text-blue-600">About</Link>
                  <Link to="/how-it-works" className="hover:text-blue-600">How It Works</Link>
                  <Link to="/jobs" className="hover:text-blue-600">Jobs</Link>
                  <Link to="/community" className="hover:text-blue-600">Community</Link>
                  <Link to="/auth" className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Join Now</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                  <Link to="/job-search" className="hover:text-blue-600">Find Jobs</Link>
                  <Link to="/community" className="hover:text-blue-600">Community</Link>
                  <Link to="/messages" className="hover:text-blue-600">Messages</Link>
                  <Link to="/profile" className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">JD</Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 text-sm">Logout</button>
                </>
              )}
            </div>

            {/* Mobile Menu Placeholder (Simplified) */}
            <div className="md:hidden">
              <Link to="/auth" className="text-blue-600 font-bold underline">Login</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/community" element={<Community />} />
            <Route path="/why-mymittr" element={<WhyMyMittr />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
            
            {/* Protected-ish routes (for demo purposes) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/job-search" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/help" element={<Help />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold text-blue-800 mb-4">MyMittr</h3>
              <p className="text-gray-600 max-w-sm mb-6 text-lg">
                A respectful space for experienced people to connect, share wisdom, and find meaningful opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/why-mymittr">Why MyMittr</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/contact">Contact Support</Link></li>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 pt-8 mt-8 border-t border-gray-100 text-center text-gray-500">
            © 2024 MyMittr. Built with respect for experience.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
