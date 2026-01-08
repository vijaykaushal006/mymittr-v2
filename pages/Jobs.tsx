
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_JOBS } from '../constants';
import { JobType } from '../types';

const Jobs: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const filteredJobs = filter === 'All' 
    ? MOCK_JOBS 
    : MOCK_JOBS.filter(job => job.type === filter);

  const categories = ['All', ...Object.values(JobType)];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div className="max-w-xl">
          <h1 className="text-4xl text-blue-900 mb-4">Discover Meaningful Roles</h1>
          <p className="text-lg text-gray-600">All opportunities on MyMittr are vetted to ensure they value experience and offer a respectful work environment.</p>
        </div>
        
        <div className="w-full md:w-auto">
          <p className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Filter by Type</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full border text-sm transition ${filter === cat ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-200 transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg uppercase">{job.type}</span>
                <span className="text-gray-400 text-sm">{job.postedAt}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
              <p className="text-blue-700 font-medium mb-4">{job.company} • {job.location}</p>
              <p className="text-gray-600 text-lg line-clamp-2 mb-6">{job.description}</p>
            </div>
            <Link to={`/job/${job.id}`} className="block text-center py-4 border-2 border-blue-100 text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition">
              View Details & Apply
            </Link>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-xl text-gray-500 italic">We couldn't find any jobs in this category right now. Try checking another one!</p>
        </div>
      )}
    </div>
  );
};

export default Jobs;
