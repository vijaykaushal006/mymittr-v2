import Link from "next/link";

export const metadata = {
  title: "About | MyMittr",
  description:
    "Learn about the story behind MyMittr and our mission to support senior citizens in India.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* HERO */}
      <section className="pt-28 pb-20 bg-[#f4f9f7] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold">
            About <span className="text-[#1e4d45]">MyMittr</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            A platform built with heart, technology, and respect for our elders.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-lg text-gray-600 leading-relaxed space-y-6">
          <p>
            MyMittr was created from a simple observation — many senior citizens
            feel isolated in a fast-moving digital world.
          </p>

          <p>
            Finding trusted help, companionship, or meaningful engagement
            shouldn't be difficult. So we decided to build a platform that
            connects seniors with verified services and a caring community.
          </p>

          <p>
            MyMittr isn’t just a website — it’s a mission to restore dignity,
            connection, and purpose in the golden years of life.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28 px-6">
        <div className="max-w-4xl mx-auto bg-[#e6f0ed] rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-[#1e4d45] mb-6">
            Join Our Growing Community
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-[#1e4d45] text-white px-8 py-3 rounded-xl font-semibold"
            >
              Join Now
            </Link>

            <Link
              href="/contact"
              className="border border-[#1e4d45] text-[#1e4d45] px-8 py-3 rounded-xl font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
