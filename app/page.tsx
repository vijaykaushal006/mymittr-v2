
import Counter from "@/components/ui/Counter";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "MyMittr – Companion for Seniors in India",
  description:
    "Verified services, companionship and community for senior citizens in India.",
};

export default function Home() {
  const services = [
    {
      title: "Jobs for You",
      icon: "💼",
      desc: "Meaningful post-retirement opportunities tailored to your experience and pace.",
      link: "/services/jobs",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      title: "Health & Wellness",
      icon: "🧘",
      desc: "Expert-led blogs and programs focused on holistic physical and mental well-being.",
      link: "/services/health",
      badge: "Blog",
      color: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
    },
    {
      title: "Companionship",
      icon: "🤝",
      desc: "Connect with friendly volunteers for conversations, walks, and shared hobbies.",
      link: "/services/companionship",
      color: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      title: "Medical Services",
      icon: "🩺",
      desc: "Access to verified healthcare professionals and home-care assistance.",
      link: "/services/medical",
      color: "bg-red-50",
      hoverColor: "hover:bg-red-100",
    },
    {
      title: "Emergency Help",
      icon: "🚨",
      desc: "Rapid response support and emergency protocols to keep you safe 24/7.",
      link: "/services/emergency",
      color: "bg-rose-50",
      hoverColor: "hover:bg-rose-100",
    },
    {
      title: "Mittr Community",
      icon: "🏛️",
      desc: "Join a vibrant circle of peers for events, social gatherings, and lifelong learning.",
      link: "/services/community",
      color: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
  ];

  const testimonials = [
    {
      name: "Anita Sharma",
      role: "Retired Teacher",
      location: "Mumbai",
      text: "MyMittr gave my father a new purpose after retirement. The companionship program changed everything.",
      rating: 5,
    },
    {
      name: "Rajiv Mehta",
      role: "Grandparent",
      location: "Delhi",
      text: "The emergency support system gives us peace of mind knowing someone is always there at a button's click.",
      rating: 5,
    },
    {
      name: "Seema Verma",
      role: "Family Member",
      location: "Bangalore",
      text: "From health blogs to social events, this platform truly understands what Indian seniors need today.",
      rating: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FCFDFD] to-gray-50 text-gray-900 font-sans selection:bg-[#1e4d45] selection:text-white">
      {/* HERO SECTION - Enhanced with better hierarchy */}
      <section className="relative pt-24 pb-24 md:pt-40 md:pb-48 px-6 overflow-hidden">
        {/* Background Decorative Elements - More subtle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-5%] w-[35%] h-[35%] bg-[#e6f0ed] rounded-full blur-[140px] opacity-40"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-blue-50 rounded-full blur-[140px] opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] bg-orange-50 rounded-full blur-[100px] opacity-30"></div>
        </div>

        <FadeIn>
          <div className="max-w-6xl mx-auto text-center">
            {/* Trust Badge - More prominent */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-10 text-sm font-bold tracking-wider text-[#1e4d45] uppercase bg-white/80 backdrop-blur-sm rounded-full border-2 border-[#1e4d45]/20 shadow-sm hover:shadow-md transition-shadow">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1e4d45] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1e4d45]"></span>
              </span>
              India's Most Trusted Senior Network
            </div>

            {/* Hero Headline - Better typography scale */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-gray-900 tracking-tight mb-8">
              Dignity, Care & <br />
              <span className="bg-gradient-to-r from-[#1e4d45] to-[#2a6b5e] bg-clip-text text-transparent italic font-serif">
                Independence.
              </span>
            </h1>

            {/* Subheadline - Better readability */}
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium px-4">
              A holistic ecosystem for India's elders. Access verified medical care,
              meaningful careers, and a community that feels like home.
            </p>

            {/* CTA Section - Improved spacing and hierarchy */}
            <div className="mt-14 flex flex-col items-center gap-6">
              <Link
                href="/signup"
                className="group relative bg-[#1e4d45] text-white px-10 sm:px-14 py-5 sm:py-6 rounded-2xl text-lg sm:text-xl font-bold hover:bg-[#153a33] transition-all duration-300 shadow-[0_20px_50px_rgba(30,77,69,0.3)] hover:shadow-[0_25px_60px_rgba(30,77,69,0.45)] transform hover:-translate-y-1 active:translate-y-0"
              >
                Join MyMittr Today
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free to join
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Verified by 1,000+ families
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* TRUST STATS SECTION - Enhanced cards */}
      <section className="px-6 -mt-16 mb-32 relative z-10">
        <Suspense fallback={null}>
          <FadeIn>
            <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-[2.5rem] p-8 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.06)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {[
                  { label: "Seniors Supported", val: 1000 },
                  { label: "Verified Volunteers", val: 300 },
                  { label: "Service Providers", val: 50 },
                  { label: "Cities Reached", val: 10 },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center group"
                  >
                    <div className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e] bg-clip-text text-transparent mb-4 transition-transform duration-300 group-hover:scale-110">
                      <Counter end={stat.val} />
                    </div>

                    <div className="h-1 w-12 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full mb-5 transition-all duration-300 group-hover:w-16"></div>

                    <p className="text-gray-600 text-xs md:text-sm uppercase tracking-[0.15em] font-bold text-center leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Suspense>
      </section>

      {/* SERVICES SECTION - Enhanced grid and interactions */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Better hierarchy */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <span className="inline-block text-sm font-bold tracking-wider text-[#1e4d45] uppercase mb-4 bg-[#1e4d45]/5 px-4 py-2 rounded-full">
                Our Services
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                Tailored for your <br />
                <span className="bg-gradient-to-r from-[#1e4d45] to-[#2a6b5e] bg-clip-text text-transparent">
                  best years.
                </span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed">
              We've hand-picked services that prioritize safety, ease of use, and human connection.
            </p>
          </header>

          {/* Service Cards - Enhanced with better hover states */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 0.08}>
                <Link href={service.link} className="group block h-full">
                  <article
                    className={`h-full p-8 md:p-10 rounded-[2rem] transition-all duration-500 border-2 border-transparent hover:border-[#1e4d45]/30 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden ${service.color} ${service.hoverColor}`}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Icon */}
                    <div className="relative w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg z-10">
                      {service.icon}
                    </div>

                    {/* Title and Badge */}
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#1e4d45] transition-colors duration-300">
                        {service.title}
                      </h3>
                      {service.badge && (
                        <span className="bg-white/90 backdrop-blur-sm text-orange-700 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider border border-orange-200 shadow-sm">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed grow text-base md:text-lg mb-6 relative z-10">
                      {service.desc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center text-[#1e4d45] font-bold gap-2 text-base relative z-10">
                      Explore Service
                      <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Enhanced cards with ratings */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#1e4d45] to-[#153a33] rounded-[3rem] md:rounded-[4rem] mx-4 md:mx-10 my-16 md:my-20 text-white overflow-hidden relative">
        {/* Decorative quote mark */}
        <div className="absolute top-0 right-0 p-12 md:p-20 opacity-5 pointer-events-none">
          <span className="text-[200px] md:text-[300px] leading-none font-black italic">"</span>
        </div>

        {/* Decorative circles */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-sm font-bold tracking-wider text-white/80 uppercase mb-4 bg-white/10 px-4 py-2 rounded-full">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Stories from our Mittrs</h2>
            <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
              Real experiences from families who trust MyMittr
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((review, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <article className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] group h-full flex flex-col">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, index) => (
                      <svg key={index} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-lg md:text-xl leading-relaxed mb-8 text-blue-50/90 grow">
                    "{review.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center font-bold text-xl border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
                      {review.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{review.name}</h4>
                      <p className="text-white/70 text-sm">{review.role}</p>
                      <p className="text-white/50 text-xs mt-0.5">{review.location}</p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE + TEXT SECTION - Enhanced with better visual balance */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image Column */}
          <FadeIn direction="left">
            <div className="relative group">
              {/* Background decoration */}
              <div className="absolute -inset-6 bg-gradient-to-br from-[#1e4d45]/10 to-orange-100/40 rounded-[3rem] rotate-3 group-hover:rotate-1 transition-all duration-700 blur-sm"></div>

              {/* Image container */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border-8 md:border-12 border-white group-hover:shadow-[0_50px_120px_-20px_rgba(0,0,0,0.25)] transition-shadow duration-500">
                <Image
                  src="/images/senior-care.png"
                  alt="Senior support and care services"
                  width={600}
                  height={700}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </FadeIn>

          {/* Content Column */}
          <FadeIn direction="right">
            <div>
              <span className="inline-block text-sm font-bold tracking-wider text-[#1e4d45] uppercase mb-6 bg-[#1e4d45]/5 px-4 py-2 rounded-full">
                Our Mission
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 md:mb-8">
                Built with care. <br />
                <span className="bg-gradient-to-r from-[#1e4d45] to-[#2a6b5e] bg-clip-text text-transparent">
                  For those who cared for us.
                </span>
              </h2>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 md:mb-10">
                MyMittr was born from a simple realization: our elders deserve more than just physical assistance—they deserve a life of purpose, security, and vibrant social connection.
              </p>

              {/* Feature list with icons */}
              <ul className="space-y-5 mb-10 md:mb-12">
                {[
                  { text: "Human-centric design", icon: "❤️" },
                  { text: "Culturally rooted in India", icon: "🇮🇳" },
                  { text: "Rigorous safety standards", icon: "🛡️" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-base md:text-lg font-semibold text-gray-800 group/item">
                    <span className="h-10 w-10 bg-gradient-to-br from-green-100 to-green-50 text-[#1e4d45] rounded-xl flex items-center justify-center text-lg shadow-sm group-hover/item:scale-110 group-hover/item:shadow-md transition-all duration-300">
                      {item.icon}
                    </span>
                    <span className="group-hover/item:text-[#1e4d45] transition-colors duration-300">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="group/link inline-flex items-center gap-2 text-[#1e4d45] text-lg font-black border-b-2 border-[#1e4d45]/20 hover:border-[#1e4d45] transition-all pb-1.5 hover:gap-3"
              >
                Our Story
                <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA - Enhanced with better visual hierarchy */}
      <section className="py-24 md:py-40 px-6 bg-gradient-to-b from-white to-gray-50">
        <FadeIn>
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#1e4d45] to-[#153a33] rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 lg:p-24 text-center text-white relative overflow-hidden shadow-[0_40px_100px_rgba(30,77,69,0.35)]">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-48 h-32 md:h-48 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 md:mb-8">
                Ready to redefine your <br /> golden years?
              </h2>

              <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of families across India who have found peace, purpose, and community with MyMittr.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                <Link
                  href="/signup"
                  className="group bg-white text-[#1e4d45] px-10 md:px-14 py-5 md:py-6 rounded-2xl text-lg md:text-xl font-black hover:shadow-2xl transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95 text-center"
                >
                  Join MyMittr Now
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 md:px-14 py-5 md:py-6 rounded-2xl text-lg md:text-xl font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-center"
                >
                  Speak to us
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Secure
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  24/7 Support
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Services
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER SPACING */}
      <div className="h-16"></div>
    </main>
  );
}
