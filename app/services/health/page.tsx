import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Health & Wellness for Seniors in India | MyMittr - Healthy Aging Tips',
  description: 'Comprehensive health and wellness guide for senior citizens in India. Learn about nutrition, fitness, mental health, preventive care, and active aging after 60.',
  keywords: 'senior health India, elderly wellness, healthy aging, senior fitness, nutrition for elderly, mental health seniors, preventive healthcare',
};

export default function HealthWellnessPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#f4f9f7] to-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Health & <span className="text-[#1e4d45]">Wellness</span>
            <br />
            <span className="text-2xl md:text-3xl text-gray-600 font-normal">for a Vibrant Life After 60</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Your health is your wealth. Discover practical, India-focused guidance on staying healthy, active, and happy as you age gracefully.
          </p>
        </div>
      </section>

      {/* Main Content - Accordion Style */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Section 1: Healthy Living After 60 */}
        <details className="group mb-4 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#1e4d45] transition-colors" open>
          <summary className="cursor-pointer p-6 bg-gradient-to-r from-[#f4f9f7] to-white hover:from-[#e6f0ed] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🌟
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Healthy Living After 60</h2>
                <p className="text-sm text-gray-600 mt-1">Essential habits for a vibrant life in your golden years</p>
              </div>
              <svg className="w-6 h-6 text-gray-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </summary>

          <div className="p-6 pt-2 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg text-gray-600 italic border-l-4 border-[#1e4d45] pl-4 py-2 mb-4">
              Turning 60 isn't the end of an active life—it's the beginning of a new chapter filled with wisdom, freedom, and opportunities to prioritize your well-being.
            </p>

            <p className="mb-4">
              In India, we've always respected our elders. The years after 60 bring unique freedom—children are settled, careers built, and there's finally time to focus on yourself. But this freedom comes with responsibility: taking care of your health so you can truly enjoy these golden years.
            </p>

            <div className="bg-[#f4f9f7] rounded-xl p-5 my-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simple Daily Habits That Make a Difference</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#1e4d45] font-bold mt-0.5">✓</span>
                  <span><strong>Start with movement:</strong> 10 minutes of stretching or a short walk energizes your day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1e4d45] font-bold mt-0.5">✓</span>
                  <span><strong>Stay hydrated:</strong> Keep water handy and sip throughout the day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1e4d45] font-bold mt-0.5">✓</span>
                  <span><strong>Prioritize sleep:</strong> 7-8 hours with consistent schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1e4d45] font-bold mt-0.5">✓</span>
                  <span><strong>Stay connected:</strong> Make time for friends, family, and community</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1e4d45] font-bold mt-0.5">✓</span>
                  <span><strong>Keep mind active:</strong> Read, solve puzzles, learn new skills</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-gray-600 bg-[#e6f0ed] p-4 rounded-lg">
              <strong>Remember:</strong> It's never too late to start. Small, consistent changes create a foundation for a healthier, happier life.
            </p>
          </div>
        </details>

        {/* Section 2: Physical Activity */}
        <details className="group mb-4 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#1e4d45] transition-colors">
          <summary className="cursor-pointer p-6 bg-gradient-to-r from-[#f4f9f7] to-white hover:from-[#e6f0ed] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🚶
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Physical Activity for Seniors</h2>
                <p className="text-sm text-gray-600 mt-1">Movement is medicine - stay active, stay independent</p>
              </div>
              <svg className="w-6 h-6 text-gray-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </summary>

          <div className="p-6 pt-2 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg italic border-l-4 border-[#1e4d45] pl-4 py-2 mb-4">
              Regular physical activity can prevent, delay, and even reverse many age-related health issues.
            </p>

            <p className="mb-4 text-sm">
              Exercise becomes even more important as we age. It's about maintaining independence, preventing falls, managing chronic conditions, and feeling good. Studies show active seniors have better heart health, stronger bones, improved balance, and sharper minds.
            </p>

            <div className="grid md:grid-cols-3 gap-3 my-4">
              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <h4 className="font-bold text-base mb-2">🚶‍♂️ Walking</h4>
                <p className="text-sm text-gray-700">Free, no equipment needed. 30 minutes daily in your local park. Join morning walking groups for social connection.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <h4 className="font-bold text-base mb-2">🪑 Chair Exercises</h4>
                <p className="text-sm text-gray-700">Perfect for mobility issues. Seated leg lifts, arm circles, gentle twists while watching TV.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <h4 className="font-bold text-base mb-2">🏊 Swimming</h4>
                <p className="text-sm text-gray-700">Gentle on joints, excellent full-body workout. Many housing societies have pools with senior timings.</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg text-sm">
              <p className="font-bold text-gray-900 mb-2">⚠️ Safety First:</p>
              <ul className="space-y-1 text-gray-700 ml-4">
                <li>• Consult doctor before starting new exercise</li>
                <li>• Start slow, listen to your body</li>
                <li>• Wear proper footwear to prevent falls</li>
                <li>• Stay hydrated in India's hot climate</li>
              </ul>
            </div>
          </div>
        </details>

        {/* Section 3: Mental Wellness */}
        <details className="group mb-4 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#1e4d45] transition-colors">
          <summary className="cursor-pointer p-6 bg-gradient-to-r from-[#f4f9f7] to-white hover:from-[#e6f0ed] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🧠
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Mental Wellness & Emotional Health</h2>
                <p className="text-sm text-gray-600 mt-1">A healthy mind is just as important as a healthy body</p>
              </div>
              <svg className="w-6 h-6 text-gray-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </summary>

          <div className="p-6 pt-2 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-sm mb-4">
              Mental health is health. The years after 60 can bring unique emotional challenges—retirement, children moving away, loss of loved ones, physical limitations. These are real challenges, and it's okay to acknowledge them.
            </p>

            <div className="grid md:grid-cols-2 gap-3 my-4">
              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <h4 className="font-bold text-base mb-2">💬 Talk About Feelings</h4>
                <p className="text-sm">Share with trusted friends, family, or counselors. Many cities have senior support groups.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <h4 className="font-bold text-base mb-2">📚 Keep Learning</h4>
                <p className="text-sm">Take up hobbies—painting, gardening, music. Community centers offer free classes.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <h4 className="font-bold text-base mb-2">🤝 Stay Connected</h4>
                <p className="text-sm">Call friends, video chat with grandchildren, join clubs, volunteer. Human connection is fundamental.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <h4 className="font-bold text-base mb-2">🎯 Find Purpose</h4>
                <p className="text-sm">Mentor young people, volunteer at NGOs, share your skills. Purpose predicts happiness.</p>
              </div>
            </div>

            <p className="text-sm bg-[#e6f0ed] p-4 rounded-lg font-semibold">
              If you've felt persistently sad, anxious, or hopeless for 2+ weeks, talk to a professional. Mental health services for seniors are improving in India. There's no shame in seeking help—it's self-care.
            </p>
          </div>
        </details>

        {/* Section 4: Yoga & Meditation */}
        <details className="group mb-4 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#1e4d45] transition-colors">
          <summary className="cursor-pointer p-6 bg-gradient-to-r from-[#f4f9f7] to-white hover:from-[#e6f0ed] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🕉️
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Yoga, Meditation & Mindfulness</h2>
                <p className="text-sm text-gray-600 mt-1">Ancient Indian wisdom backed by modern science</p>
              </div>
              <svg className="w-6 h-6 text-gray-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </summary>

          <div className="p-6 pt-2 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-sm mb-4">
              Yoga isn't about impossible positions. It's connecting breath with movement, building strength gently, improving flexibility. For seniors, yoga offers improved balance (reduces falls), better flexibility, stress reduction, and better sleep.
            </p>

            <div className="grid md:grid-cols-3 gap-3 my-4">
              <div className="bg-[#f4f9f7] rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🪑</div>
                <h4 className="font-bold text-sm mb-1">Chair Pose</h4>
                <p className="text-xs text-gray-700">Sit in chair, raise arms overhead. Hold 5 breaths. Strengthens legs.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🌳</div>
                <h4 className="font-bold text-sm mb-1">Tree Pose</h4>
                <p className="text-xs text-gray-700">Stand near wall, balance on one foot. Hold 5 breaths. Improves balance.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">😌</div>
                <h4 className="font-bold text-sm mb-1">Child's Pose</h4>
                <p className="text-xs text-gray-700">Kneel, sit back, stretch arms forward. Hold 1-2 min. Deeply relaxing.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#e6f0ed] to-white rounded-xl p-4 text-sm">
              <h4 className="font-bold mb-2">🧘 Simple Meditation (5 Minutes)</h4>
              <ol className="space-y-1 ml-4">
                <li>1. Sit comfortably, close eyes</li>
                <li>2. Take three deep breaths</li>
                <li>3. Focus on your breath</li>
                <li>4. When mind wanders, gently return to breath</li>
                <li>5. Start with 5 minutes, increase gradually</li>
              </ol>
            </div>
          </div>
        </details>

        {/* Section 5: Preventive Health */}
        <details className="group mb-4 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#1e4d45] transition-colors">
          <summary className="cursor-pointer p-6 bg-gradient-to-r from-[#f4f9f7] to-white hover:from-[#e6f0ed] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ⚕️
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Preventive Health & Regular Checkups</h2>
                <p className="text-sm text-gray-600 mt-1">Prevention is better than cure - catch problems early</p>
              </div>
              <svg className="w-6 h-6 text-gray-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </summary>

          <div className="p-6 pt-2 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-sm mb-4">
              In India, we often visit doctors only when seriously ill. But preventive healthcare is about being proactive. Many screenings are available at government hospitals at subsidized rates.
            </p>

            <div className="space-y-3 my-4">
              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-3 rounded-r-lg">
                <h4 className="font-bold text-sm mb-1">🩺 Blood Pressure (Every Visit)</h4>
                <p className="text-xs text-gray-700">Prevents heart attacks, strokes, kidney disease. Get home monitor.</p>
              </div>
              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-3 rounded-r-lg">
                <h4 className="font-bold text-sm mb-1">🩸 Blood Sugar (Every 3-6 Months)</h4>
                <p className="text-xs text-gray-700">Diabetes is common in India. Test fasting sugar and HbA1c.</p>
              </div>
              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-3 rounded-r-lg">
                <h4 className="font-bold text-sm mb-1">💓 Cholesterol (Yearly)</h4>
                <p className="text-xs text-gray-700">Heart disease is leading cause of death. Simple blood test.</p>
              </div>
              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-3 rounded-r-lg">
                <h4 className="font-bold text-sm mb-1">👁️ Eye Exam (Yearly)</h4>
                <p className="text-xs text-gray-700">Cataracts, glaucoma prevention. Cataract surgery often free at govt hospitals.</p>
              </div>
            </div>

            <div className="bg-[#e6f0ed] p-4 rounded-lg text-sm">
              <p className="font-bold mb-2">💉 Important Vaccinations:</p>
              <ul className="space-y-1 ml-4 text-xs">
                <li>• Flu vaccine (yearly)</li>
                <li>• Pneumonia vaccine</li>
                <li>• Shingles vaccine (if had chickenpox)</li>
                <li>• COVID-19 booster (as recommended)</li>
              </ul>
            </div>
          </div>
        </details>

        {/* Section 6: Nutrition */}
        <details className="group mb-4 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#1e4d45] transition-colors">
          <summary className="cursor-pointer p-6 bg-gradient-to-r from-[#f4f9f7] to-white hover:from-[#e6f0ed] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🥗
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Nutrition Tips for the Elderly</h2>
                <p className="text-sm text-gray-600 mt-1">You are what you eat - good nutrition is the foundation</p>
              </div>
              <svg className="w-6 h-6 text-gray-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </summary>

          <div className="p-6 pt-2 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-sm mb-4">
              Traditional Indian diet with whole grains, lentils, vegetables, and spices is ideal for seniors. As we age, metabolism slows—we need fewer calories but more nutrients. Every bite must count.
            </p>

            <div className="grid md:grid-cols-2 gap-3 my-4">
              <div className="bg-[#f4f9f7] rounded-xl p-3 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-sm mb-1">🦴 Calcium & Vitamin D</h4>
                <p className="text-xs text-gray-700 mb-2">Critical for bones. Prevents osteoporosis.</p>
                <p className="text-xs text-gray-600"><strong>Sources:</strong> Milk, yogurt, paneer, ragi, sesame, greens. 15-20 min morning sun.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-3 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-sm mb-1">💪 Protein</h4>
                <p className="text-xs text-gray-700 mb-2">Prevents muscle loss, supports immunity.</p>
                <p className="text-xs text-gray-600"><strong>Sources:</strong> Dal, rajma, chana, eggs, chicken, fish, paneer, nuts.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-3 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-sm mb-1">🌾 Fiber</h4>
                <p className="text-xs text-gray-700 mb-2">Prevents constipation, controls blood sugar.</p>
                <p className="text-xs text-gray-600"><strong>Sources:</strong> Whole wheat, brown rice, oats, fruits, vegetables, beans.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-3 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-sm mb-1">🧠 Omega-3</h4>
                <p className="text-xs text-gray-700 mb-2">Brain health, reduces inflammation.</p>
                <p className="text-xs text-gray-600"><strong>Sources:</strong> Fish, walnuts, flaxseeds, chia seeds.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#e6f0ed] rounded-xl p-4 text-sm">
              <h4 className="font-bold mb-2">🍽️ Sample Meal Plan</h4>
              <div className="space-y-2 text-xs">
                <p><strong>Breakfast:</strong> Oats upma, ragi dosa, poha with peanuts, boiled eggs</p>
                <p><strong>Lunch:</strong> Brown rice with dal and sabzi, roti with rajma, khichdi with curd</p>
                <p><strong>Dinner:</strong> Light soup, roti with paneer, moong dal cheela (keep light and early)</p>
                <p><strong>Snacks:</strong> Roasted chana, nuts, fruits, buttermilk, sprouts</p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg text-xs mt-3">
              <p className="font-bold mb-1">⚠️ Limit:</p>
              <p>Excess salt (↑ BP), refined sugar (↑ diabetes), deep-fried foods (hard to digest), processed foods (high sodium)</p>
            </div>
          </div>
        </details>

        {/* Section 7: Social Wellbeing */}
        <details className="group mb-4 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#1e4d45] transition-colors">
          <summary className="cursor-pointer p-6 bg-gradient-to-r from-[#f4f9f7] to-white hover:from-[#e6f0ed] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                👥
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Social Wellbeing & Active Aging</h2>
                <p className="text-sm text-gray-600 mt-1">Strong relationships are as vital as diet and exercise</p>
              </div>
              <svg className="w-6 h-6 text-gray-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </summary>

          <div className="p-6 pt-2 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-sm mb-4">
              Strong social connections predict healthy aging better than exercise or diet. Seniors with active social lives have stronger immune systems, lower depression rates, better cognitive function, and greater sense of purpose. Loneliness is a health risk comparable to smoking 15 cigarettes daily.
            </p>

            <div className="grid md:grid-cols-2 gap-3 my-4">
              <div className="bg-[#f4f9f7] rounded-xl p-4 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-base mb-2">🏘️ Join Community Groups</h4>
                <p className="text-sm text-gray-700">Most neighborhoods have senior associations. They organize activities, celebrate festivals, arrange health camps. If yours doesn't, start one!</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-base mb-2">🎨 Pursue Hobbies</h4>
                <p className="text-sm text-gray-700">Join painting, music, book clubs, gardening societies. Shared interests create instant bonds. MyMittr helps you discover local groups.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-base mb-2">🙏 Volunteer</h4>
                <p className="text-sm text-gray-700">Teach children, help at temple/gurudwara, mentor professionals, work with NGOs. Your experience is valuable. Volunteering increases life satisfaction.</p>
              </div>
              <div className="bg-[#f4f9f7] rounded-xl p-4 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-base mb-2">💻 Embrace Technology</h4>
                <p className="text-sm text-gray-700">Video calls with grandchildren, WhatsApp groups with friends. Libraries offer free tech classes for seniors. Start simple with video calling.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#e6f0ed] to-white rounded-xl p-4 text-sm">
              <h4 className="font-bold mb-2">🌟 Principles of Active Aging</h4>
              <ul className="space-y-1 ml-4 text-xs">
                <li>• <strong>Stay curious:</strong> Never stop learning new skills</li>
                <li>• <strong>Maintain independence:</strong> Do things yourself as long as you can</li>
                <li>• <strong>Stay positive:</strong> Focus on what you can do, not what you can't</li>
                <li>• <strong>Contribute:</strong> Share knowledge, help others</li>
                <li>• <strong>Adapt:</strong> Be flexible, find new ways to do what you love</li>
              </ul>
            </div>

            <p className="text-sm font-semibold bg-[#e6f0ed] p-4 rounded-lg mt-3">
              Your golden years should be golden. You deserve joy, purpose, and connection. Social engagement isn't luxury—it's necessity. Reach out. Connect. Your best years can still be ahead.
            </p>
          </div>
        </details>

      </div>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Charge of Your Health?
          </h2>
          <p className="text-lg mb-6 text-white/90">
            Join MyMittr's community of active, engaged seniors. Discover local health events and wellness groups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services/companionship"
              className="bg-white text-[#1e4d45] px-8 py-3 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              Find Health Events Near You
            </Link>
            <Link
              href="/services/community"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-600">
            <strong>Disclaimer:</strong> Information provided is for educational purposes only and not a substitute for professional medical advice. Always consult your healthcare provider before making health changes.
          </p>
        </div>
      </section>
    </main>
  );
}
