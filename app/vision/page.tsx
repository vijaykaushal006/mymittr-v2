import Link from "next/link";

export const metadata = {
  title: "Our Vision | MyMittr",
  description:
    "Learn about the mission and vision behind MyMittr — India’s trusted companion platform for seniors.",
};

export default function Vision() {
  const values = [
    {
      title: "Self-Respect First",
      desc: "Getting older shouldn't mean losing your voice. We build everything to ensure seniors feel capable and respected.",
      icon: "🤝",
    },
    {
      title: "Real Trust",
      desc: "We verify everyone like they were going into our own parents' homes.",
      icon: "🛡️",
    },
    {
      title: "Simple Technology",
      desc: "Technology should help, not confuse. We design with seniors in mind.",
      icon: "📱",
    },
    {
      title: "No One Alone",
      desc: "Isolation is real. MyMittr brings back the community feeling in a digital world.",
      icon: "🏠",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* HERO SECTION */}
      <section className="pt-28 pb-20 bg-[#f4f9f7] px-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-[#1e4d45] font-bold uppercase text-xs bg-[#1e4d45]/10 px-3 py-1 rounded-full">
            Why We Started MyMittr
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
            Because our elders deserve <br />
            <span className="text-[#1e4d45]">more than just help.</span>
          </h1>

          <p className="mt-8 text-lg text-gray-600 max-w-2xl leading-relaxed">
            In a world moving fast toward AI and apps, our parents and grandparents
            shouldn't feel left behind. MyMittr bridges that gap with heart and technology.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">The Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be the friend (Mittr) every senior needs. From part-time jobs
              to medical help or companionship, we make everything safe and simple.
            </p>
          </div>

          <div className="bg-[#1e4d45] text-white p-10 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">The Big Picture</h2>
            <p className="text-blue-50/90 text-lg leading-relaxed">
              We want to change how India sees aging — not dependency,
              but a new chapter for growth, wisdom, and connection.
            </p>
          </div>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What We Stand For
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-gray-100"
              >
                <div className="text-4xl mb-4">{val.icon}</div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            From Our Founder’s Heart
          </h2>

          <p className="text-xl text-gray-600 italic leading-relaxed">
            "MyMittr isn’t just a business idea — it’s a tribute to the
            generation that raised us. We saw the struggle to find reliable help,
            and we decided to build the solution ourselves."
          </p>

          <div className="mt-10">
            <p className="font-bold"></p>
            <p className="text-sm text-gray-500">
              Founder, MyMittr
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-28 px-6">
        <div className="max-w-5xl mx-auto bg-[#e6f0ed] rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e4d45] mb-6">
            Let’s build this together.
          </h2>

          <p className="text-gray-700 mb-8">
            Join as a senior member or volunteer. There’s a place for you here.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/services/community"
              className="bg-[#1e4d45] text-white px-8 py-3 rounded-xl font-semibold text-center"
            >
              Join the Community
            </Link>

            <Link
              href="/contact"
              className="border border-[#1e4d45] text-[#1e4d45] px-8 py-3 rounded-xl font-semibold text-center"
            >
              Write to Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}