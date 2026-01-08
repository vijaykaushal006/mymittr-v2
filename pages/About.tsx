
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl text-blue-900 mb-8">About MyMittr</h1>
      
      <div className="prose prose-lg text-gray-700 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Heartbeat</h2>
          <p className="text-xl leading-relaxed">
            In a digital world that often moves too fast, MyMittr was created to slow things down—to focus on quality over quantity, and depth over data. We noticed that many brilliant, experienced individuals felt 'left behind' by modern professional platforms.
          </p>
          <p className="text-xl leading-relaxed">
            MyMittr is our answer to that. "Mittr" means friend. We want to be the friend who reminds you that your 25, 35, or 45 years of life experience is exactly what the world needs right now.
          </p>
        </section>

        <section className="bg-blue-50 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Our Mission</h2>
          <p className="text-xl italic">
            "To empower experienced individuals through respectful connection and meaningful opportunity, ensuring that no wisdom goes to waste."
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p>To become the most trusted platform for experienced talent globally, fostering a culture where age is celebrated as a peak of achievement, not a hurdle to overcome.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Our Values</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Dignity:</strong> Treating every user with the respect they've earned.</li>
              <li><strong>Simplicity:</strong> Removing the barriers between you and your goals.</li>
              <li><strong>Wisdom:</strong> Valuing life experience as much as technical skills.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
