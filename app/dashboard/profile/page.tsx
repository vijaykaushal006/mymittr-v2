"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1e4d45] mb-8">
        My Profile
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow max-w-2xl">

        {/* Basic Info */}
        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 border rounded-xl"
          />

          {/* Role Specific Fields */}

          {role === "senior" && (
            <>
              <input
                type="number"
                placeholder="Age"
                className="w-full p-4 border rounded-xl"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full p-4 border rounded-xl"
              />
            </>
          )}

          {role === "family" && (
            <>
              <input
                type="text"
                placeholder="Linked Senior Name"
                className="w-full p-4 border rounded-xl"
              />
            </>
          )}

          {role === "volunteer" && (
            <>
              <input
                type="text"
                placeholder="Skills"
                className="w-full p-4 border rounded-xl"
              />
              <input
                type="text"
                placeholder="Availability"
                className="w-full p-4 border rounded-xl"
              />
            </>
          )}

          {role === "provider" && (
            <>
              <input
                type="text"
                placeholder="Service Type"
                className="w-full p-4 border rounded-xl"
              />
              <input
                type="number"
                placeholder="Years of Experience"
                className="w-full p-4 border rounded-xl"
              />
            </>
          )}

          <button className="bg-[#1e4d45] text-white px-6 py-3 rounded-xl">
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}
