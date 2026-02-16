export const metadata = {
  title: "Medical Services | MyMittr",
};

export default function MedicalPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">

      <section className="pt-28 pb-20 bg-[#f4f9f7] px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Medical <span className="text-[#1e4d45]">Support</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Verified healthcare professionals at your doorstep.
        </p>
      </section>

      <section className="py-24 px-6 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-gray-50 p-10 rounded-3xl shadow-sm">
          Home Doctor Visits
        </div>
        <div className="bg-gray-50 p-10 rounded-3xl shadow-sm">
          Nursing Assistance
        </div>
      </section>

    </main>
  );
}
