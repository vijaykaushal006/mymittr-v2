
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_JOBS } from '../constants';

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const job = MOCK_JOBS.find(j => j.id === id);

  if (!job) return <div className="p-20 text-center">Job not found.</div>;

  const handleApply = () => {
    // Simulating API call
    setTimeout(() => {
      setIsSuccess(true);
      setIsApplying(false);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-8">🎉</div>
        <h1 className="text-4xl text-green-600 font-bold mb-6">Application Sent!</h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Your profile has been shared with <strong>{job.company}</strong>. They'll review your experience and reach out to you directly through MyMittr messages if they'd like to talk more.
        </p>
        <Link to="/dashboard" className="px-10 py-4 bg-blue-600 text-white text-xl rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/jobs" className="text-blue-600 font-bold flex items-center gap-2 mb-8">
        ← Back to all jobs
      </Link>

      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-lg uppercase tracking-wide mb-4 inline-block">{job.type}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{job.title}</h1>
            <p className="text-2xl text-blue-800">{job.company} • {job.location}</p>
          </div>
          <div className="text-gray-400 font-medium">Posted {job.postedAt}</div>
        </div>

        <div className="prose prose-xl text-gray-700 space-y-8 mb-12">
          <p className="text-2xl leading-relaxed">{job.description}</p>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 italic">About the Role</h3>
            <p>This position is specifically designed for an experienced individual who can provide guidance and high-level strategy. We value reliability, clear communication, and the perspective that comes from years in the field.</p>
          </div>
        </div>

        {!isApplying ? (
          <button 
            onClick={() => setIsApplying(true)}
            className="w-full py-6 bg-green-600 text-white text-2xl rounded-2xl font-bold hover:bg-green-700 transition shadow-xl"
          >
            Express Interest & Apply
          </button>
        ) : (
          <div className="bg-gray-50 p-10 rounded-3xl border-2 border-dashed border-blue-200">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Easy Apply with MyMittr</h3>
            <p className="text-lg text-gray-600 mb-8">
              We will share your **Name**, **About Me**, and **Experience Summary** with {job.company}. You don't need to upload any documents.
            </p>
            <div className="mb-8">
              <label className="block font-bold mb-2">Message to Employer (Optional)</label>
              <textarea 
                rows={3} 
                className="w-full p-4 rounded-xl border-gray-200 outline-none focus:ring-2 focus:ring-blue-100" 
                placeholder="Share a short note about why this role interests you..."
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleApply}
                className="flex-grow py-5 bg-blue-600 text-white text-xl rounded-2xl font-bold hover:bg-blue-700 shadow-lg"
              >
                Confirm & Send Profile
              </button>
              <button 
                onClick={() => setIsApplying(false)}
                className="px-8 py-5 text-gray-500 font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-12 p-8 bg-blue-50 rounded-3xl text-center">
        <p className="text-blue-800 italic">"Remember, you're not just applying for a job; you're offering your expertise to a company that values it."</p>
      </div>
    </div>
  );
};

export default JobDetails;
