export const metadata = {
  title: "Health & Wellness | MyMittr",
};

export default function HealthPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">

      <section className="pt-28 pb-20 bg-[#f4f9f7] px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Health & <span className="text-[#1e4d45]">Wellness</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Physical and mental wellbeing programs tailored for seniors.
        </p>
      </section>

      <section className="py-24 px-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-3xl shadow-sm">
          Yoga Sessions
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl shadow-sm">
          Nutrition Guidance
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl shadow-sm">
          Mental Wellness Support
        </div>
      </section>

    </main>
  );
}
