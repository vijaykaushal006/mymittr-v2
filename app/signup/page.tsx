"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

interface FormData {
  full_name?: string;
  phone?: string;
  email?: string;
  password?: string;
  // Senior fields
  age?: string;
  service_needs?: string;
  hobbies?: string;
  emergency_contact?: string;
  // Parent fields
  relationship?: string;
  parent_age?: string;
  parent_city?: string;
  child_contact?: string;
  // Volunteer fields
  skills?: string;
  availability?: string;
  motivation?: string;
  // Vendor fields
  business_name?: string;
  category?: string;
  gst_number?: string;
  // Job poster fields
  company_name?: string;
  industry?: string;
  hiring_manager_contact?: string;
}

type Role = "myself" | "parent" | "volunteer" | "vendor" | "job_poster" | "";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get("role") as Role;

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>("");
  const [form, setForm] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep(2);
    setForm({});
    setError("");
  };

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      // Sign up user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email!,
        password: form.password!,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      const userId = data.user?.id;

      if (!userId) {
        setError("Failed to create user");
        setLoading(false);
        return;
      }

      // Insert into profiles
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        full_name: form.full_name,
        phone: form.phone,
        role: role,
      });

      if (profileError) {
        setError("Failed to create profile");
        setLoading(false);
        return;
      }

      // Role-specific inserts
      if (role === "myself") {
        await supabase.from("profile_senior").insert({
          user_id: userId,
          age: form.age,
          service_needs: form.service_needs ? [form.service_needs] : [],
          hobbies: form.hobbies ? [form.hobbies] : [],
          emergency_contact: form.emergency_contact,
        });
      }

      if (role === "parent") {
        await supabase.from("profile_parent").insert({
          user_id: userId,
          relationship: form.relationship,
          parent_age: form.parent_age,
          parent_city: form.parent_city,
          child_contact: form.child_contact,
        });
      }

      if (role === "volunteer") {
        await supabase.from("profile_volunteer").insert({
          user_id: userId,
          skills: form.skills ? [form.skills] : [],
          availability: form.availability,
          motivation: form.motivation,
        });
      }

      if (role === "vendor") {
        await supabase.from("profile_vendor").insert({
          user_id: userId,
          business_name: form.business_name,
          category: form.category,
          gst_number: form.gst_number,
        });
      }

      if (role === "job_poster") {
        await supabase.from("profile_job_poster").insert({
          user_id: userId,
          company_name: form.company_name,
          industry: form.industry,
          hiring_manager_contact: form.hiring_manager_contact,
        });
      }

      router.push("/services/community");
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  const getRoleIcon = (roleType: string) => {
    const icons: Record<string, string> = {
      myself: "👤",
      parent: "👨‍👩‍👧",
      volunteer: "🤝",
      vendor: "🏪",
      job_poster: "💼",
    };
    return icons[roleType] || "";
  };

  const getRoleDescription = (roleType: string) => {
    const descriptions: Record<string, string> = {
      myself: "I'm a senior looking for services and community",
      parent: "I'm signing up on behalf of my parents",
      volunteer: "I want to volunteer and help seniors",
      vendor: "I'm a business offering senior services",
      job_poster: "I'm looking to hire senior talent",
    };
    return descriptions[roleType] || "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 py-8">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e4d45] mb-2">
            Welcome to MyMittr
          </h1>
          <p className="text-gray-600">
            {step === 1 ? "Let's get you started" : "Complete your profile"}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-[#1e4d45] text-white' : 'bg-gray-200 text-gray-500'} font-semibold`}>
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#1e4d45]' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-[#1e4d45] text-white' : 'bg-gray-200 text-gray-500'} font-semibold`}>
            2
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Who are you?</h2>

            <div className="grid gap-4">
              {[
                { value: "myself", label: "Myself (Senior)" },
                { value: "parent", label: "For my Parents" },
                { value: "volunteer", label: "Volunteer" },
                { value: "vendor", label: "Vendor" },
                { value: "job_poster", label: "Job Poster" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleRoleSelect(option.value as Role)}
                  className="group relative overflow-hidden p-6 border-2 border-gray-200 rounded-2xl hover:border-[#1e4d45] hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{getRoleIcon(option.value)}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#1e4d45] transition-colors">
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {getRoleDescription(option.value)}
                      </p>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-[#1e4d45] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 2 && (
          <form onSubmit={handleSignup} className="space-y-5">

            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#1e4d45] transition-colors mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to role selection
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {getRoleIcon(role)} Complete Your Profile
            </h2>

            {/* Common fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="full_name"
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                  value={form.full_name || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                  value={form.phone || ""}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                onChange={handleChange}
                value={form.email || ""}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                required
                minLength={6}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                onChange={handleChange}
                value={form.password || ""}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Role-specific fields */}
            {role === "myself" && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Senior Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      name="age"
                      type="number"
                      placeholder="Your age"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange}
                      value={form.age || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Needs</label>
                    <input
                      name="service_needs"
                      placeholder="e.g., Companionship, Health"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange}
                      value={form.service_needs || ""}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies</label>
                  <input
                    name="hobbies"
                    placeholder="Your interests and hobbies"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                    onChange={handleChange}
                    value={form.hobbies || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    name="emergency_contact"
                    type="tel"
                    placeholder="Emergency contact number"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                    onChange={handleChange}
                    value={form.emergency_contact || ""}
                  />
                </div>
              </div>
            )}

            {role === "parent" && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Parent Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <select
                      name="relationship"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange as any}
                      value={form.relationship || ""}
                    >
                      <option value="">Select relationship</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Both Parents">Both Parents</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parent Age</label>
                    <input
                      name="parent_age"
                      type="number"
                      placeholder="Parent's age"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange}
                      value={form.parent_age || ""}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent City</label>
                  <input
                    name="parent_city"
                    placeholder="City where your parent lives"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                    onChange={handleChange}
                    value={form.parent_city || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Contact Number</label>
                  <input
                    name="child_contact"
                    type="tel"
                    placeholder="Your contact number"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                    onChange={handleChange}
                    value={form.child_contact || ""}
                  />
                </div>
              </div>
            )}

            {role === "volunteer" && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Volunteer Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                    <input
                      name="skills"
                      placeholder="e.g., Yoga, Tech Support"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange}
                      value={form.skills || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <input
                      name="availability"
                      placeholder="e.g., Weekends, Evenings"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange}
                      value={form.availability || ""}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join MyMittr?</label>
                  <textarea
                    name="motivation"
                    placeholder="Share your motivation to volunteer..."
                    rows={4}
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all resize-none"
                    onChange={handleChange}
                    value={form.motivation || ""}
                  />
                </div>
              </div>
            )}

            {role === "vendor" && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Business Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    name="business_name"
                    placeholder="Your business name"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                    onChange={handleChange}
                    value={form.business_name || ""}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange as any}
                      value={form.category || ""}
                    >
                      <option value="">Select category</option>
                      <option value="Medical">Medical</option>
                      <option value="Home Care">Home Care</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Food & Nutrition">Food & Nutrition</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                    <input
                      name="gst_number"
                      placeholder="GST number (if applicable)"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange}
                      value={form.gst_number || ""}
                    />
                  </div>
                </div>
              </div>
            )}

            {role === "job_poster" && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Company Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    name="company_name"
                    placeholder="Your company name"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                    onChange={handleChange}
                    value={form.company_name || ""}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      name="industry"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange as any}
                      value={form.industry || ""}
                    >
                      <option value="">Select industry</option>
                      <option value="NGO">NGO</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hiring Manager Contact</label>
                    <input
                      name="hiring_manager_contact"
                      type="tel"
                      placeholder="Contact number"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#1e4d45] focus:border-transparent outline-none transition-all"
                      onChange={handleChange}
                      value={form.hiring_manager_contact || ""}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1e4d45] to-[#2d7566] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-[#1e4d45] font-semibold hover:underline">
                Sign in
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}