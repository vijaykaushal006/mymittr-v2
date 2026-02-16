import Link from "next/link";

export const metadata = {
  title: "Services | MyMittr",
  description: "Explore all services offered by MyMittr for senior citizens.",
};

export default function ServicesPage() {
  const services = [
    { name: "Jobs for You", path: "/services/jobs" },
    { name: "Health & Wellness", path: "/services/health" },
    { name: "Companionship", path: "/services/companionship" },
    { name: "Medical Services", path: "/services/medical" },
    { name: "Emergency Help", path: "/services/emergency" },
    { name: "Mittr Community", path: "/services/community" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">

      <section className="pt-28 pb-20 bg-[#f4f9f7] px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Our <span className="text-[#1e4d45]">Services</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Everything seniors need in one trusted platform.
        </p>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.name}
              href={service.path}
              className="bg-gray-50 p-10 rounded-3xl shadow-sm hover:shadow-lg transition text-center font-semibold text-[#1e4d45]"
            >
              {service.name}
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
