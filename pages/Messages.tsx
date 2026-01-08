
import React from 'react';

const Messages: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl text-blue-900 mb-8">Your Conversations</h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex overflow-hidden min-h-[600px]">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-100 p-4 space-y-4 bg-gray-50/50">
          <div className="p-4 bg-white rounded-2xl shadow-sm border-l-4 border-blue-600">
            <p className="font-bold text-gray-900">SME Connect</p>
            <p className="text-sm text-gray-500 line-clamp-1">We'd love to schedule a quick chat about your...</p>
            <p className="text-xs text-blue-600 mt-2 font-bold uppercase">1 Unread</p>
          </div>
          <div className="p-4 rounded-2xl hover:bg-white transition cursor-pointer">
            <p className="font-bold text-gray-900">Robert Chen</p>
            <p className="text-sm text-gray-500 line-clamp-1">That wisdom you shared was truly inspiring!</p>
            <p className="text-xs text-gray-400 mt-2">Yesterday</p>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-grow flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-sm">SME</div>
             <div>
               <h3 className="font-bold text-lg">SME Connect</h3>
               <p className="text-sm text-green-500 flex items-center gap-1">
                 <span className="w-2 h-2 bg-green-500 rounded-full"></span> Active now
               </p>
             </div>
          </div>

          <div className="flex-grow p-8 space-y-6 overflow-y-auto bg-gray-50/20">
             <div className="flex justify-start">
               <div className="max-w-[80%] bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-lg">
                 Hello John! We reviewed your profile on MyMittr and we're very impressed with your 30+ years in operations. We have a few small business clients who could really use your guidance.
               </div>
             </div>
             <div className="flex justify-start">
               <div className="max-w-[80%] bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-lg">
                 Would you be free for a 15-minute phone call next Tuesday to discuss how you could help as a Mentor?
               </div>
             </div>
             <div className="flex justify-end">
               <div className="max-w-[80%] bg-blue-600 text-white p-6 rounded-2xl rounded-tr-none shadow-md text-lg">
                 Hello! Thank you for reaching out. Tuesday afternoon works well for me. I'm excited to hear more about the businesses you're working with.
               </div>
             </div>
          </div>

          <div className="p-6 border-t border-gray-100">
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Type your message with respect..." 
                className="flex-grow bg-gray-50 border border-gray-200 rounded-full px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-100"
              />
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
