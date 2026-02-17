import type { Metadata } from 'next';
import HealthLayout from '@/components/services/HealthLayout';

export const metadata: Metadata = {
  title: 'Health & Wellness for Seniors | MyMittr India',
  description: 'Comprehensive health guide for seniors: fitness, nutrition, mental wellness, and preventive care. Written with care for the Indian context.',
  keywords: 'senior health India, elderly wellness, nutrition for seniors, yoga for elderly, mental health seniors',
};

export default function HealthWellnessPage() {
  return (
    <main className="min-h-screen bg-[#f4f9f7]">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-[#f4f9f7] text-[#1e4d45] text-sm font-bold uppercase tracking-wider mb-6">
            Wellness Center
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Your Guide to a <br />
            <span className="text-[#1e4d45]">Healthy & Vibrant Life</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our curated library of health wisdom, designed to help you age with strength, dignity, and joy.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <HealthLayout />

      {/* Footer Note */}
      <section className="py-12 bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 italic">
            <strong>Medical Disclaimer:</strong> The content provided here is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.
          </p>
        </div>
      </section>
    </main>
  );
}
