
import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    tagline: 'Former Director of Operations | Passionate about Mentorship',
    about: 'I have spent over 30 years in the manufacturing sector. Now, I am looking to give back by helping younger businesses optimize their workflows and develop strong leadership cultures.',
    skills: ['Operations', 'Team Building', 'Strategic Planning', 'Public Speaking'],
    experience: '32 Years in Manufacturing & Logistics',
    availability: 'Part-time, Remote (Up to 15 hours/week)'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="h-40 bg-blue-900"></div>
        <div className="px-10 pb-10">
          <div className="relative -mt-16 flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="w-32 h-32 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-700">JD</div>
            </div>
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-xl text-gray-500">{profile.tagline}</p>
            </div>
            <div className="ml-auto mb-4">
              <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition">Edit Profile</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 italic">About Me</h3>
                <p className="text-xl text-gray-600 leading-relaxed">{profile.about}</p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 italic">Experience Summary</h3>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xl text-blue-900 font-bold">{profile.experience}</p>
                </div>
              </section>
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">{skill}</span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider">Availability</h3>
                <p className="text-lg text-gray-600">{profile.availability}</p>
              </section>

              <div className="p-6 bg-green-50 rounded-2xl text-center">
                <p className="text-sm font-bold text-green-800 uppercase mb-2">Visibility</p>
                <p className="text-green-700 italic">Your profile is visible to verified age-friendly employers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
