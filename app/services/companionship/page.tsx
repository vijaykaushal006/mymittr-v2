export const metadata = {
  title: "Companionship | MyMittr",
};

export default function CompanionshipPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">

      <section className="pt-28 pb-20 bg-[#f4f9f7] px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Companion<span className="text-[#1e4d45]">ship</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Friendly volunteers for meaningful conversations and activities.
        </p>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto text-lg text-gray-600">
        <p>
          Our companionship program connects seniors with trusted volunteers
          for walks, hobbies, and regular check-ins.
        </p>
      </section>

    </main>
  );
}
