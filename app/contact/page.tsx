"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ type: "success", message: data.message });
        setForm({
          name: "",
          email: "",
          phone: "",
          role: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({ type: "error", message: data.message });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <main className="bg-gradient-to-br from-green-50 to-white min-h-screen py-16 px-6">
      {/* HERO */}
      <section className="text-center mb-14">
        <span className="bg-green-100 text-green-800 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest">
          We're Listening
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mt-6">
          Contact MyMittr
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Whether you’re seeking support for a parent or looking to join our
          community, our team is ready to assist you with warmth and respect.
        </p>
      </section>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border">
            <h3 className="text-xl font-semibold text-green-900 mb-3">
              Reach Us Directly
            </h3>
            <p className="text-gray-600">
              <strong>Registered Office</strong>
              <br />
              MyMittr Services Pvt. Ltd.
              <br />
              India
            </p>
            <p className="mt-4 text-gray-700 font-medium">
              📞 +91 9810960928
            </p>
          </div>

          <div className="bg-green-100 p-8 rounded-3xl">
            <h3 className="text-xl font-semibold text-green-900 mb-3">
              Support Hours
            </h3>
            <p>
              <strong>Mon – Sat:</strong> 9:00 AM – 6:00 PM
              <br />
              <span className="text-sm text-gray-600">
                Emergency messages are monitored 24/7.
              </span>
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border">
            <h3 className="text-xl font-semibold text-green-900 mb-3">
              Direct Emails
            </h3>
            <p>Senior Support: connect@mymittr.com</p>
            <p>Partnerships: connect@mymittr.com</p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border">
          <h3 className="text-2xl font-semibold text-green-900 mb-6">
            Send Us a Message
          </h3>

          {status.message && (
            <div
              className={`mb-6 p-4 rounded-xl font-medium ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              required
              className="w-full p-4 rounded-xl border bg-gray-50"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="p-4 rounded-xl border bg-gray-50"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="p-4 rounded-xl border bg-gray-50"
              />
            </div>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border bg-gray-50"
            >
              <option value="">You Are...</option>
              <option>Senior Citizen</option>
              <option>Family Member</option>
              <option>Companion / Volunteer</option>
              <option>Partner / Vendor</option>
            </select>

            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border bg-gray-50"
            >
              <option value="">How can we help?</option>
              <option>Daily Help & Errands</option>
              <option>Companionship & Well-Being</option>
              <option>Safety & Emergency Support</option>
              <option>General Query</option>
            </select>

            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Share your thoughts..."
              required
              className="w-full p-4 rounded-xl border bg-gray-50"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-900 text-white py-4 rounded-full font-semibold hover:bg-green-800 transition"
            >
              {loading ? "Submitting..." : "Submit Message"}
            </button>
          </form>
        </div>
      </div>

      {/* WhatsApp Floating */}
      <a
  href="https://wa.me/918756891154"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-8 right-8 bg-green-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition duration-300"
>
  <FaWhatsapp size={28} />
</a>
    </main>
  );
}