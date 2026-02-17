"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/update-password",
    });

    setMessage("Password reset email sent.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-xl font-bold mb-6 text-center">
          Reset Password
        </h1>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full border rounded-xl p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="w-full bg-[#1e4d45] text-white py-3 rounded-xl">
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="text-green-600 text-sm mt-4 text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
