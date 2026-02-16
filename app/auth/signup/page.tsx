"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/app/actions/auth";
import type { Database } from "@/types/supabase";

type Role = Database['public']['Tables']['profiles']['Row']['role'];

export default function SignupPage() {
  const router = useRouter()

  const [role, setRole] = useState<Role>('senior')
  const [loading, setLoading] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Role specific states
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [medicalNotes, setMedicalNotes] = useState('')

  const [seniorName, setSeniorName] = useState('')
  const [relationship, setRelationship] = useState('')

  const [skills, setSkills] = useState('')
  const [availability, setAvailability] = useState('')

  const [serviceType, setServiceType] = useState('')
  const [experience, setExperience] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signupUser({
        email,
        password,
        fullName,
        role,
        age,
        city,
        medicalNotes,
        seniorName,
        relationship,
        skills,
        availability,
        serviceType,
        experience
      });

      if (result.error) {
        alert(result.error);
      } else if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      }

    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the MyMittr community
          </p>
        </div>

        <form onSubmit={handleSignup} className="mt-8 space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700">I am a...</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md border"
            >
              <option value="senior">Senior Citizen</option>
              <option value="family">Family Member</option>
              <option value="volunteer">Volunteer</option>
              <option value="provider">Service Provider</option>
            </select>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <input
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          {/* Senior Fields */}
          {role === 'senior' && (
            <div className="space-y-4">
              <input placeholder="Age" onChange={(e) => setAge(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              <input placeholder="City" onChange={(e) => setCity(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              <textarea placeholder="Medical Notes (Optional)" onChange={(e) => setMedicalNotes(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          )}

          {/* Family Fields */}
          {role === 'family' && (
            <div className="space-y-4">
              <input placeholder="Senior Name" onChange={(e) => setSeniorName(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              <input placeholder="Relationship" onChange={(e) => setRelationship(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          )}

          {/* Volunteer Fields */}
          {role === 'volunteer' && (
            <div className="space-y-4">
              <input placeholder="Skills" onChange={(e) => setSkills(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              <input placeholder="Availability" onChange={(e) => setAvailability(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          )}

          {/* Provider Fields */}
          {role === 'provider' && (
            <div className="space-y-4">
              <input placeholder="Service Type" onChange={(e) => setServiceType(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              <input placeholder="Experience Years" onChange={(e) => setExperience(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}
