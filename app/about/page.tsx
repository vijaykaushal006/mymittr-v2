import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About MyMittr - Our Vision & Mission for Senior Citizens in India',
  description: 'MyMittr is building a dignified, connected future for senior citizens in India. Learn about our vision for meaningful aging and our mission to provide companionship, services, and community.',
  keywords: 'MyMittr vision, senior citizens India, elderly care mission, aging with dignity, senior community platform',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#f4f9f7] to-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            About <span className="text-[#1e4d45]">MyMittr</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A platform built with heart, technology, and deep respect for the wisdom and dignity of our elders.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-3xl">
              🌟
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Our Vision</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-2xl font-semibold text-[#1e4d45] leading-relaxed">
              A future where no senior citizen in India feels lonely, helpless, or invisible.
            </p>

            <p className="text-lg">
              We envision a society where aging is celebrated, not feared. Where the years after 60 are filled with purpose, connection, and joy. Where every senior citizen has access to the support they need, the companionship they deserve, and the respect that is their right.
            </p>

            <p className="text-lg">
              In our vision, technology serves as a bridge, not a barrier. It connects generations instead of dividing them. It empowers seniors to live independently while staying connected to family, friends, and community. It makes quality healthcare, trusted services, and meaningful engagement accessible to all, regardless of location or economic status.
            </p>

            <div className="bg-gradient-to-r from-[#e6f0ed] to-white rounded-2xl p-8 my-8 border-l-4 border-[#1e4d45]">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">We Believe In:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-2xl font-bold">✓</span>
                  <div>
                    <strong className="text-gray-900">Dignity in Aging:</strong>
                    <span className="text-gray-700"> Growing older should be a journey of grace, not a burden. Every senior deserves to live with independence, choice, and self-respect.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-2xl font-bold">✓</span>
                  <div>
                    <strong className="text-gray-900">Connection Over Isolation:</strong>
                    <span className="text-gray-700"> Loneliness should never be the price of aging. Human connection, community, and companionship are fundamental human needs at every age.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-2xl font-bold">✓</span>
                  <div>
                    <strong className="text-gray-900">Purpose Beyond Retirement:</strong>
                    <span className="text-gray-700"> Retirement from work doesn't mean retirement from life. Seniors have wisdom, skills, and experiences that enrich our society. They deserve opportunities to contribute, learn, and grow.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-2xl font-bold">✓</span>
                  <div>
                    <strong className="text-gray-900">Accessible Care for All:</strong>
                    <span className="text-gray-700"> Quality healthcare, trusted services, and community support shouldn't be privileges reserved for the wealthy. Every senior, in every corner of India, deserves access to care.</span>
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-lg">
              We dream of an India where grandparents aren't relegated to the sidelines but remain active participants in family and society. Where their voices are heard, their needs are met, and their contributions are valued. Where aging is seen not as decline, but as a new chapter full of possibilities.
            </p>

            <p className="text-lg font-semibold text-gray-900">
              This is the future we're building, one connection at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-[#f4f9f7]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-3xl">
              🎯
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Our Mission</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-2xl font-semibold text-[#1e4d45] leading-relaxed">
              To build India's most trusted and comprehensive platform for senior citizens—connecting them with companionship, services, and community.
            </p>

            <p className="text-lg">
              MyMittr exists to solve real problems that seniors face every day. We're not here to sell products or chase profits. We're here to serve, support, and empower the generation that built modern India.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">What We Do:</h3>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#e6f0ed] hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Connect Seniors with Companionship</h4>
                <p className="text-gray-700">
                  We help seniors find friends, join communities, attend events, and build meaningful relationships. Because no one should face their golden years alone.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#e6f0ed] hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🏥</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Provide Access to Trusted Services</h4>
                <p className="text-gray-700">
                  From healthcare to home help, from legal advice to financial planning—we connect seniors with verified, reliable service providers they can trust.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#e6f0ed] hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">👥</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Build Vibrant Communities</h4>
                <p className="text-gray-700">
                  We create spaces—both online and offline—where seniors can connect, share experiences, support each other, and build lasting friendships.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#e6f0ed] hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🎓</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Enable Continuous Learning & Growth</h4>
                <p className="text-gray-700">
                  Through workshops, classes, and resources, we help seniors learn new skills, explore hobbies, and stay mentally active and engaged.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#e6f0ed] hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🚨</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Ensure Safety & Security</h4>
                <p className="text-gray-700">
                  We verify all service providers, moderate our community, and provide emergency support features to keep seniors safe both online and offline.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#e6f0ed] hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">💡</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Empower Through Technology</h4>
                <p className="text-gray-700">
                  We design our platform to be senior-friendly—large fonts, simple navigation, clear language. Technology should empower, not frustrate.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">How We're Different:</h3>

            <div className="bg-white rounded-2xl p-8 border-l-4 border-[#1e4d45]">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">India-First Approach:</strong>
                    <span className="text-gray-700"> We understand Indian families, culture, and the unique challenges seniors face in India. We're not a foreign platform adapted for India—we're built for India from the ground up.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Trust & Verification:</strong>
                    <span className="text-gray-700"> Every service provider on our platform is verified. Every community member is real. We take safety seriously because we're building a platform we'd trust for our own parents and grandparents.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Human-Centered Design:</strong>
                    <span className="text-gray-700"> We design with seniors, not just for them. Our platform is tested with real seniors to ensure it's truly accessible and easy to use.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Community, Not Commerce:</strong>
                    <span className="text-gray-700"> While we connect seniors with services, our heart is in building community. Many of our features are free because connection shouldn't have a price tag.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-3xl">
              📖
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Our Story</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg">
              MyMittr was born from a simple but powerful observation: in a country that has always revered its elders, too many senior citizens feel isolated, overlooked, and disconnected in today's fast-paced digital world.
            </p>

            <p className="text-lg">
              We saw grandparents struggling to find reliable help for basic needs. We saw widows and widowers facing loneliness after losing their life partners. We saw retired professionals with decades of wisdom having no outlet to share their knowledge. We saw seniors wanting to stay active and engaged but not knowing where to start.
            </p>

            <p className="text-lg">
              The transition from joint families to nuclear families, children moving to different cities or countries, and the rapid pace of technological change have created a perfect storm of isolation for many seniors. Meanwhile, the services and support systems that exist are often fragmented, hard to find, or difficult to trust.
            </p>

            <p className="text-lg">
              We asked ourselves: What if there was one place where seniors could find everything they need? What if technology, instead of being a barrier, became a bridge? What if we could recreate the sense of community that joint families once provided, but in a way that fits modern India?
            </p>

            <p className="text-lg font-semibold text-gray-900">
              That's why we built MyMittr.
            </p>

            <p className="text-lg">
              "Mittr" means friend in Hindi. And that's exactly what we aim to be—a trusted friend who's always there, connecting seniors with the people, services, and experiences that make life richer and more meaningful.
            </p>

            <p className="text-lg">
              We're a team of technologists, healthcare professionals, social workers, and caregivers who have seen firsthand the challenges seniors face. Many of us have elderly parents or grandparents whose struggles inspired us to create something better. We're building the platform we wish existed for our own loved ones.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#e6f0ed] to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Commitment to You
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy & Security</h3>
              <p className="text-gray-700 text-sm">
                Your data is yours. We never sell your information. We use industry-standard security to protect your privacy.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Quality</h3>
              <p className="text-gray-700 text-sm">
                Every service provider is thoroughly vetted. We maintain high standards because your trust is our most valuable asset.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">💙</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Always Improving</h3>
              <p className="text-gray-700 text-sm">
                We listen to your feedback and constantly improve. This platform is built for you, and your voice shapes its future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Join the MyMittr Family
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Whether you're a senior looking for connection and support, or a family member wanting the best for your loved ones, MyMittr is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-[#1e4d45] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              Join MyMittr Today
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Values Footer */}
      <section className="py-12 px-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-lg">
            <strong className="text-gray-900">Our Promise:</strong> We will always put seniors first. We will always prioritize trust over growth. We will always treat every member of our community with the dignity and respect they deserve.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Because every senior citizen deserves to age with grace, purpose, and joy.
          </p>
        </div>
      </section>
    </main>
  );
}
