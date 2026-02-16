import Link from "next/link";

export const metadata = {
  title: "Jobs for Seniors | MyMittr",
};

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">

      <section className="pt-28 pb-20 bg-[#f4f9f7] px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Jobs for <span className="text-[#1e4d45]">You</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Meaningful part-time opportunities designed for seniors.
        </p>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-gray-50 p-10 rounded-3xl shadow-sm">
            <h3 className="text-2xl font-bold mb-4">Consulting Roles</h3>
            <p className="text-gray-600">
              Share your experience with startups and young professionals.
            </p>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl shadow-sm">
            <h3 className="text-2xl font-bold mb-4">Flexible Part-Time Work</h3>
            <p className="text-gray-600">
              Stay active while working at your own pace.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
