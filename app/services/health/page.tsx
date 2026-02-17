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
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#f4f9f7] to-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Health & <span className="text-[#1e4d45]">Wellness</span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-600 font-normal">for a Vibrant Life After 60</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your health is your wealth, especially in your golden years. Discover practical, India-focused guidance on staying healthy, active, and happy as you age gracefully.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-10 backdrop-blur-lg bg-white/95">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex flex-wrap gap-3 justify-center text-sm">
            <a href="#healthy-living" className="px-4 py-2 bg-[#e6f0ed] text-[#1e4d45] rounded-full font-medium hover:bg-[#1e4d45] hover:text-white transition-colors">Healthy Living</a>
            <a href="#physical-activity" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-[#1e4d45] hover:text-white transition-colors">Physical Activity</a>
            <a href="#mental-wellness" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-[#1e4d45] hover:text-white transition-colors">Mental Wellness</a>
            <a href="#yoga-meditation" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-[#1e4d45] hover:text-white transition-colors">Yoga & Meditation</a>
            <a href="#preventive-health" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-[#1e4d45] hover:text-white transition-colors">Preventive Care</a>
            <a href="#nutrition" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-[#1e4d45] hover:text-white transition-colors">Nutrition</a>
            <a href="#social-wellbeing" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-[#1e4d45] hover:text-white transition-colors">Social Wellbeing</a>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* Section 1: Healthy Living After 60 */}
        <article id="healthy-living" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-2xl">
              🌟
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Healthy Living After 60</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 italic border-l-4 border-[#1e4d45] pl-6 py-2">
              Turning 60 isn't the end of an active life—it's the beginning of a new chapter filled with wisdom, freedom, and opportunities to prioritize your well-being.
            </p>

            <p>
              In India, we've always respected our elders, and for good reason. The years after 60 bring a unique kind of freedom—children are settled, careers have been built, and there's finally time to focus on yourself. But this freedom comes with a responsibility: taking care of your health so you can truly enjoy these golden years.
            </p>

            <p>
              Healthy living after 60 doesn't mean running marathons or following extreme diets. It's about making small, sustainable changes that add up to a big difference. It's about listening to your body, understanding what it needs, and giving it the care it deserves.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Does Healthy Aging Look Like?</h3>

            <p>
              Healthy aging is different for everyone, but some common threads run through all successful stories. It's about maintaining your independence, staying mentally sharp, keeping your body mobile, and finding joy in everyday moments. It's waking up without pain, being able to play with your grandchildren, traveling to places you've always wanted to see, and feeling confident in your own skin.
            </p>

            <p>
              In Indian culture, we often see aging as a time to slow down completely. But modern medicine and research tell us that staying active—both physically and mentally—is the key to longevity and happiness. The seniors who thrive are those who stay engaged with life, maintain their social connections, and continue to learn and grow.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Simple Daily Habits That Make a Difference</h3>

            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">✓</span>
                <span><strong>Start your day with movement:</strong> Even 10 minutes of gentle stretching or a short walk can energize your entire day.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">✓</span>
                <span><strong>Stay hydrated:</strong> Many health issues in seniors stem from simple dehydration. Keep a water bottle handy and sip throughout the day.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">✓</span>
                <span><strong>Prioritize sleep:</strong> Quality sleep is when your body repairs itself. Aim for 7-8 hours and maintain a consistent sleep schedule.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">✓</span>
                <span><strong>Stay socially connected:</strong> Loneliness can be as harmful as smoking. Make time for friends, family, and community activities.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">✓</span>
                <span><strong>Keep your mind active:</strong> Read, solve puzzles, learn new skills. Your brain needs exercise just like your body.</span>
              </li>
            </ul>

            <p>
              Remember, it's never too late to start. Whether you're 60 or 80, your body responds positively to good habits. The key is consistency, not perfection. Start with one small change, make it a habit, then add another. Over time, these small steps create a foundation for a healthier, happier life.
            </p>
          </div>
        </article>

        {/* Section 2: Physical Activity for Seniors */}
        <article id="physical-activity" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-2xl">
              🚶
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Importance of Physical Activity for Seniors</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 italic border-l-4 border-[#1e4d45] pl-6 py-2">
              Movement is medicine. Regular physical activity can prevent, delay, and even reverse many age-related health issues.
            </p>

            <p>
              There's a common misconception that exercise is only for the young. Nothing could be further from the truth. In fact, physical activity becomes even more important as we age. It's not about building muscles or losing weight—though those can be nice side effects. It's about maintaining your independence, preventing falls, managing chronic conditions, and simply feeling good in your body.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Exercise Matters More After 60</h3>

            <p>
              As we age, our bodies naturally lose muscle mass, bone density decreases, balance becomes shakier, and joints can become stiff. But here's the good news: regular physical activity can slow down or even reverse many of these changes. Studies show that seniors who stay active have better heart health, stronger bones, improved balance, sharper minds, and a lower risk of chronic diseases like diabetes and high blood pressure.
            </p>

            <p>
              In India, where joint families are becoming less common and many seniors live independently, maintaining physical fitness is crucial for self-reliance. Being able to climb stairs, carry groceries, and take care of daily tasks without assistance isn't just about physical health—it's about dignity and independence.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Exercises for Indian Seniors</h3>

            <div className="bg-[#f4f9f7] rounded-2xl p-6 my-6">
              <h4 className="font-bold text-lg text-gray-900 mb-4">🚶‍♂️ Walking - The Perfect Exercise</h4>
              <p className="mb-4">
                Walking is free, requires no equipment, and can be done anywhere. A 30-minute walk in your local park or even around your neighborhood can work wonders. Many Indian cities have morning walking groups where seniors meet, walk together, and build friendships. It's exercise and social connection in one.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tip:</strong> Start with 10 minutes if 30 feels too much. Gradually increase. The best time is early morning when the air is fresh and parks are lively.
              </p>
            </div>

            <div className="bg-[#f4f9f7] rounded-2xl p-6 my-6">
              <h4 className="font-bold text-lg text-gray-900 mb-4">🧘 Chair Exercises - For Those With Mobility Issues</h4>
              <p className="mb-4">
                Not everyone can walk long distances, and that's okay. Chair exercises are perfect for building strength and flexibility without putting stress on joints. Simple movements like seated leg lifts, arm circles, and gentle twists can be done while watching TV.
              </p>
            </div>

            <div className="bg-[#f4f9f7] rounded-2xl p-6 my-6">
              <h4 className="font-bold text-lg text-gray-900 mb-4">🏊 Swimming - Gentle on Joints</h4>
              <p className="mb-4">
                If you have access to a pool, swimming is one of the best full-body workouts for seniors. The water supports your body weight, making it easy on joints while still providing excellent cardiovascular exercise. Many community centers and housing societies in Indian cities now have pools with senior-friendly timings.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Safety First: Important Precautions</h3>

            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">•</span>
                <span>Always consult your doctor before starting a new exercise routine, especially if you have existing health conditions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">•</span>
                <span>Start slow and listen to your body. Mild muscle soreness is normal, but sharp pain is a warning sign.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">•</span>
                <span>Wear proper footwear with good support to prevent falls.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">•</span>
                <span>Stay hydrated, especially in India's hot climate.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">•</span>
                <span>Exercise with a friend or in a group for safety and motivation.</span>
              </li>
            </ul>

            <p className="mt-6">
              The goal isn't to become an athlete. It's to move your body regularly in ways that feel good and keep you functional. Even small amounts of activity are infinitely better than none. Your future self will thank you for every step you take today.
            </p>
          </div>
        </article>

        {/* Section 3: Mental Wellness & Emotional Health */}
        <article id="mental-wellness" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-2xl">
              🧠
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mental Wellness & Emotional Health</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 italic border-l-4 border-[#1e4d45] pl-6 py-2">
              A healthy mind is just as important as a healthy body. Your emotional well-being shapes how you experience every day of your life.
            </p>

            <p>
              In Indian society, we often focus heavily on physical health while mental and emotional well-being gets overlooked. There's still stigma around discussing feelings, seeking therapy, or admitting when we're struggling emotionally. But the truth is, mental health is health. Period.
            </p>

            <p>
              The years after 60 can bring unique emotional challenges. Retirement can leave a void where purpose once was. Children moving away can trigger loneliness. The loss of friends and loved ones becomes more common. Physical limitations can be frustrating. These are real challenges, and it's okay to acknowledge them.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Mental Health Challenges for Seniors</h3>

            <p>
              <strong>Depression</strong> is not a normal part of aging, yet it affects many seniors. It's not just feeling sad—it's a persistent heaviness that makes even simple tasks feel overwhelming. In India, depression in seniors often goes undiagnosed because symptoms are dismissed as "just getting old."
            </p>

            <p>
              <strong>Anxiety</strong> about health, finances, or being a burden on family is common. The worry can become all-consuming, affecting sleep, appetite, and quality of life.
            </p>

            <p>
              <strong>Loneliness</strong> is perhaps the most widespread issue. In a country transitioning from joint families to nuclear ones, many seniors find themselves isolated, especially in urban areas.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Ways to Nurture Your Mental Health</h3>

            <div className="bg-[#f4f9f7] rounded-2xl p-6 my-6 space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">💬 Talk About Your Feelings</h4>
                <p className="text-gray-700">
                  Find someone you trust—a friend, family member, or counselor—and share what you're going through. Bottling up emotions only makes them heavier. Many Indian cities now have senior support groups where you can connect with others facing similar challenges.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">📚 Keep Learning</h4>
                <p className="text-gray-700">
                  Learning new things keeps your brain active and gives you a sense of accomplishment. Take up a hobby you've always been curious about—painting, gardening, learning a musical instrument, or even using technology better. Many community centers offer free or low-cost classes for seniors.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">🤝 Stay Connected</h4>
                <p className="text-gray-700">
                  Make an effort to maintain relationships. Call a friend, video chat with grandchildren, join a club, volunteer for a cause you care about. Human connection is fundamental to mental health. Platforms like MyMittr can help you find local senior communities and events.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">🎯 Find Purpose</h4>
                <p className="text-gray-700">
                  Retirement doesn't mean the end of contribution. Mentor young people in your field, volunteer at a local school or NGO, share your skills with your community. Having a sense of purpose is one of the strongest predictors of happiness in later life.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When to Seek Professional Help</h3>

            <p>
              If you've been feeling persistently sad, anxious, or hopeless for more than two weeks, it's time to talk to a professional. If you've lost interest in activities you once enjoyed, if you're having trouble sleeping or sleeping too much, if you're withdrawing from people—these are signs that you could benefit from support.
            </p>

            <p>
              In India, mental health services for seniors are improving. Many hospitals now have geriatric psychiatry departments. Online therapy platforms make counseling accessible from home. There's no shame in seeking help—it's a sign of strength and self-care.
            </p>

            <p className="font-semibold text-gray-900 bg-[#e6f0ed] p-4 rounded-xl">
              Remember: Your mental health matters. You deserve to feel good, to find joy, to have hope. Don't suffer in silence. Reach out. Help is available, and you are worth it.
            </p>
          </div>
        </article>

        {/* Section 4: Yoga, Meditation & Mindfulness */}
        <article id="yoga-meditation" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-2xl">
              🕉️
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Yoga, Meditation & Mindfulness</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 italic border-l-4 border-[#1e4d45] pl-6 py-2">
              Ancient Indian wisdom meets modern science: Yoga and meditation are powerful tools for healthy aging.
            </p>

            <p>
              India gave the world yoga and meditation thousands of years ago. These practices, rooted in our culture, are now backed by modern scientific research as some of the most effective ways to maintain health and well-being in later life. The beauty is that they're accessible to everyone, regardless of fitness level or flexibility.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Yoga is Perfect for Seniors</h3>

            <p>
              Yoga isn't about twisting yourself into impossible positions. At its core, yoga is about connecting breath with movement, building strength gently, and improving flexibility. For seniors, yoga offers specific benefits that directly address age-related challenges.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-white border-2 border-[#e6f0ed] rounded-xl p-5">
                <h4 className="font-bold text-[#1e4d45] mb-2">✓ Improved Balance</h4>
                <p className="text-sm text-gray-600">Reduces fall risk, one of the biggest dangers for seniors</p>
              </div>
              <div className="bg-white border-2 border-[#e6f0ed] rounded-xl p-5">
                <h4 className="font-bold text-[#1e4d45] mb-2">✓ Better Flexibility</h4>
                <p className="text-sm text-gray-600">Makes daily activities easier and reduces joint pain</p>
              </div>
              <div className="bg-white border-2 border-[#e6f0ed] rounded-xl p-5">
                <h4 className="font-bold text-[#1e4d45] mb-2">✓ Stress Reduction</h4>
                <p className="text-sm text-gray-600">Lowers blood pressure and promotes relaxation</p>
              </div>
              <div className="bg-white border-2 border-[#e6f0ed] rounded-xl p-5">
                <h4 className="font-bold text-[#1e4d45] mb-2">✓ Better Sleep</h4>
                <p className="text-sm text-gray-600">Gentle evening yoga can improve sleep quality</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Simple Yoga Poses for Beginners</h3>

            <p>
              You don't need to join an expensive class to start. Here are some gentle poses you can try at home. Always listen to your body and stop if something hurts.
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-[#f4f9f7] rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-2">🪑 Chair Pose (Modified)</h4>
                <p className="text-gray-700">Sit in a sturdy chair, feet flat on floor. Raise arms overhead, palms together. Hold for 5 breaths. Strengthens legs and improves posture.</p>
              </div>

              <div className="bg-[#f4f9f7] rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-2">🌳 Tree Pose (With Support)</h4>
                <p className="text-gray-700">Stand near a wall for support. Shift weight to one foot, place other foot on ankle or calf (not knee). Hold for 5 breaths each side. Improves balance.</p>
              </div>

              <div className="bg-[#f4f9f7] rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-2">😌 Child's Pose (Gentle)</h4>
                <p className="text-gray-700">Kneel on a mat, sit back on heels, stretch arms forward. Rest forehead on mat or a cushion. Hold for 1-2 minutes. Deeply relaxing.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Power of Meditation</h3>

            <p>
              Meditation is simply training your mind to focus and redirect thoughts. It's not about stopping thoughts (impossible!) but about observing them without judgment. Even 5-10 minutes daily can make a significant difference.
            </p>

            <div className="bg-gradient-to-r from-[#e6f0ed] to-white rounded-2xl p-6 my-6">
              <h4 className="font-bold text-gray-900 mb-4">🧘 Simple Meditation for Beginners</h4>
              <ol className="space-y-3 text-gray-700">
                <li><strong>1.</strong> Find a quiet spot. Sit comfortably in a chair or on the floor.</li>
                <li><strong>2.</strong> Close your eyes. Take three deep breaths.</li>
                <li><strong>3.</strong> Focus on your breath. Notice it entering and leaving your body.</li>
                <li><strong>4.</strong> When your mind wanders (it will!), gently bring attention back to breath.</li>
                <li><strong>5.</strong> Start with 5 minutes. Gradually increase as you get comfortable.</li>
              </ol>
            </div>

            <p>
              Many Indian seniors find comfort in traditional practices like chanting mantras or listening to bhajans—these are forms of meditation too. The key is finding what resonates with you and making it a regular practice.
            </p>

            <p className="font-semibold text-gray-900">
              The best part? Yoga and meditation cost nothing, require no special equipment, and can be done at home. They're gifts from our ancestors that modern science confirms are incredibly valuable for healthy aging.
            </p>
          </div>
        </article>

        {/* Section 5: Preventive Health & Regular Checkups */}
        <article id="preventive-health" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-2xl">
              ⚕️
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Preventive Health & Regular Checkups</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 italic border-l-4 border-[#1e4d45] pl-6 py-2">
              Prevention is better than cure—especially when it comes to aging. Regular health checkups can catch problems early when they're most treatable.
            </p>

            <p>
              In India, there's often a tendency to visit the doctor only when something is seriously wrong. But by then, a condition that could have been managed easily might have progressed significantly. Preventive healthcare is about being proactive, not reactive.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Essential Health Screenings for Seniors</h3>

            <p>
              After 60, certain health screenings become crucial. Many of these are available at government hospitals at subsidized rates or even free under various senior citizen schemes. Don't let cost be a barrier—your health is worth the investment.
            </p>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-5 rounded-r-xl">
                <h4 className="font-bold text-gray-900 mb-2">🩺 Blood Pressure Check (Every Visit)</h4>
                <p className="text-gray-700 mb-2">High blood pressure is called the "silent killer" because it often has no symptoms. Get it checked every time you visit a doctor, or invest in a home monitor.</p>
                <p className="text-sm text-gray-600"><strong>Why it matters:</strong> Prevents heart attacks, strokes, and kidney disease.</p>
              </div>

              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-5 rounded-r-xl">
                <h4 className="font-bold text-gray-900 mb-2">🩸 Blood Sugar Test (Every 3-6 Months)</h4>
                <p className="text-gray-700 mb-2">Diabetes is extremely common in India, especially among seniors. Regular testing helps catch it early or monitor if you're already diabetic.</p>
                <p className="text-sm text-gray-600"><strong>Tests needed:</strong> Fasting blood sugar and HbA1c</p>
              </div>

              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-5 rounded-r-xl">
                <h4 className="font-bold text-gray-900 mb-2">💓 Cholesterol Check (Yearly)</h4>
                <p className="text-gray-700 mb-2">High cholesterol clogs arteries and increases heart disease risk. A simple blood test can check your levels.</p>
                <p className="text-sm text-gray-600"><strong>Why it matters:</strong> Heart disease is the leading cause of death in India.</p>
              </div>

              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-5 rounded-r-xl">
                <h4 className="font-bold text-gray-900 mb-2">👁️ Eye Exam (Yearly)</h4>
                <p className="text-gray-700 mb-2">Cataracts, glaucoma, and macular degeneration become more common with age. Early detection can prevent vision loss.</p>
                <p className="text-sm text-gray-600"><strong>Good news:</strong> Cataract surgery is highly successful and often free at government hospitals.</p>
              </div>

              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-5 rounded-r-xl">
                <h4 className="font-bold text-gray-900 mb-2">🦴 Bone Density Test (Every 2 Years)</h4>
                <p className="text-gray-700 mb-2">Osteoporosis makes bones fragile and prone to fractures. This is especially important for women after menopause.</p>
                <p className="text-sm text-gray-600"><strong>Prevention:</strong> Calcium, vitamin D, and weight-bearing exercise.</p>
              </div>

              <div className="border-l-4 border-[#1e4d45] bg-[#f4f9f7] p-5 rounded-r-xl">
                <h4 className="font-bold text-gray-900 mb-2">🎗️ Cancer Screenings (As Recommended)</h4>
                <p className="text-gray-700 mb-2">Breast, cervical, prostate, and colorectal cancer screenings can save lives by catching cancer early.</p>
                <p className="text-sm text-gray-600"><strong>Talk to your doctor</strong> about which screenings you need based on your risk factors.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Vaccinations for Seniors</h3>

            <p>
              Vaccines aren't just for children. Seniors need them too because the immune system weakens with age.
            </p>

            <ul className="space-y-2 ml-6 my-4">
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">💉</span>
                <span><strong>Flu vaccine (yearly):</strong> Prevents seasonal influenza, which can be serious in seniors.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">💉</span>
                <span><strong>Pneumonia vaccine:</strong> Protects against pneumococcal pneumonia.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">💉</span>
                <span><strong>Shingles vaccine:</strong> Prevents painful shingles outbreak (if you've had chickenpox).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1e4d45] font-bold mt-1">💉</span>
                <span><strong>COVID-19 booster:</strong> As recommended by health authorities.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Managing Medications Safely</h3>

            <p>
              Many seniors take multiple medications, which increases the risk of interactions and side effects. Here's how to stay safe:
            </p>

            <div className="bg-white border-2 border-[#e6f0ed] rounded-2xl p-6 my-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl">✓</span>
                  <span>Keep an updated list of all medications, including over-the-counter drugs and supplements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl">✓</span>
                  <span>Use a pill organizer to avoid missing doses or taking double doses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl">✓</span>
                  <span>Review all medications with your doctor annually—some may no longer be needed.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl">✓</span>
                  <span>Never share medications or take someone else's prescription.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl">✓</span>
                  <span>Ask about generic alternatives to save money without compromising quality.</span>
                </li>
              </ul>
            </div>

            <p className="font-semibold text-gray-900 bg-[#e6f0ed] p-4 rounded-xl">
              Remember: Preventive care is an investment in your future. The time and money spent on regular checkups is nothing compared to the cost—financial and emotional—of treating advanced disease. Take charge of your health. You're worth it.
            </p>
          </div>
        </article>

        {/* Section 6: Nutrition Tips for Elderly */}
        <article id="nutrition" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-2xl">
              🥗
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Nutrition Tips for the Elderly</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 italic border-l-4 border-[#1e4d45] pl-6 py-2">
              You are what you eat—and this becomes even more true as you age. Good nutrition is the foundation of healthy aging.
            </p>

            <p>
              Indian cuisine is incredibly diverse and can be wonderfully nutritious. The traditional Indian diet, with its emphasis on whole grains, lentils, vegetables, and spices, is actually ideal for seniors. The challenge is adapting it to meet changing nutritional needs while respecting taste preferences and cultural traditions.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Nutritional Needs Change After 60</h3>

            <p>
              As we age, our metabolism slows down, we need fewer calories but more nutrients, our sense of taste and smell may diminish, and digestive issues become more common. This means every bite needs to count nutritionally.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Essential Nutrients for Seniors</h3>

            <div className="space-y-4 my-6">
              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-5 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-2">🦴 Calcium & Vitamin D</h4>
                <p className="text-gray-700 mb-3">Critical for bone health. Deficiency leads to osteoporosis and fractures.</p>
                <p className="text-sm text-gray-600"><strong>Sources:</strong> Milk, yogurt, paneer, ragi, sesame seeds, green leafy vegetables. Get 15-20 minutes of morning sunlight for vitamin D.</p>
              </div>

              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-5 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-2">💪 Protein</h4>
                <p className="text-gray-700 mb-3">Prevents muscle loss, supports immune function, helps wound healing.</p>
                <p className="text-sm text-gray-600"><strong>Sources:</strong> Dal, rajma, chana, eggs, chicken, fish, paneer, tofu, nuts. Aim for protein at every meal.</p>
              </div>

              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-5 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-2">🌾 Fiber</h4>
                <p className="text-gray-700 mb-3">Prevents constipation, controls blood sugar, lowers cholesterol.</p>
                <p className="text-sm text-gray-600"><strong>Sources:</strong> Whole wheat, brown rice, oats, fruits, vegetables, beans. Drink plenty of water with fiber.</p>
              </div>

              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-5 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-2">🧠 Omega-3 Fatty Acids</h4>
                <p className="text-gray-700 mb-3">Supports brain health, reduces inflammation, protects heart.</p>
                <p className="text-sm text-gray-600"><strong>Sources:</strong> Fish (especially sardines, mackerel), walnuts, flaxseeds, chia seeds.</p>
              </div>

              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-5 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-2">💊 Vitamin B12</h4>
                <p className="text-gray-700 mb-3">Essential for nerve function and red blood cells. Absorption decreases with age.</p>
                <p className="text-sm text-gray-600"><strong>Sources:</strong> Eggs, dairy, fortified cereals. Vegetarians may need supplements—talk to your doctor.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Eating Tips for Indian Seniors</h3>

            <div className="bg-white border-2 border-[#e6f0ed] rounded-2xl p-6 my-6">
              <h4 className="font-bold text-lg text-gray-900 mb-4">🍽️ Smart Meal Planning</h4>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Breakfast Ideas:</p>
                  <p className="text-gray-700 text-sm">Oats upma with vegetables, ragi dosa with sambar, poha with peanuts, vegetable daliya, boiled eggs with whole wheat toast</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 mb-1">Lunch Ideas:</p>
                  <p className="text-gray-700 text-sm">Brown rice with dal and sabzi, roti with rajma and salad, khichdi with vegetables and curd, fish curry with rice</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 mb-1">Dinner Ideas:</p>
                  <p className="text-gray-700 text-sm">Light vegetable soup, roti with paneer bhurji, moong dal cheela, vegetable khichdi (keep it light and early)</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 mb-1">Healthy Snacks:</p>
                  <p className="text-gray-700 text-sm">Roasted chana, handful of nuts, fruits, buttermilk, sprouts, homemade dhokla</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Foods to Limit</h3>

            <ul className="space-y-2 ml-6 my-4">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">⚠️</span>
                <span><strong>Excess salt:</strong> Increases blood pressure. Use herbs and spices for flavor instead.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">⚠️</span>
                <span><strong>Refined sugar:</strong> Spikes blood sugar. Choose jaggery or fruits for sweetness.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">⚠️</span>
                <span><strong>Deep-fried foods:</strong> Hard to digest, high in unhealthy fats. Opt for grilled, baked, or steamed.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">⚠️</span>
                <span><strong>Processed foods:</strong> High in sodium and preservatives. Stick to fresh, home-cooked meals.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Dealing with Common Eating Challenges</h3>

            <div className="space-y-3 my-6">
              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-1">😐 Loss of Appetite?</p>
                <p className="text-sm text-gray-700">Eat smaller, frequent meals. Make food visually appealing. Eat with family or friends to make it social.</p>
              </div>

              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-1">🦷 Difficulty Chewing?</p>
                <p className="text-sm text-gray-700">Choose softer foods like dal, khichdi, mashed vegetables, yogurt. Get dental issues addressed.</p>
              </div>

              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-1">💧 Not Thirsty?</p>
                <p className="text-sm text-gray-700">Set reminders to drink water. Have buttermilk, coconut water, herbal teas. Keep water visible.</p>
              </div>
            </div>

            <p className="font-semibold text-gray-900 bg-[#e6f0ed] p-4 rounded-xl">
              Good nutrition doesn't mean giving up foods you love. It's about balance, moderation, and making smart choices most of the time. Your body has served you well for decades—nourish it with the respect it deserves.
            </p>
          </div>
        </article>

        {/* Section 7: Social Wellbeing & Active Aging */}
        <article id="social-wellbeing" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-2xl flex items-center justify-center text-2xl">
              👥
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Social Wellbeing & Active Aging</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 italic border-l-4 border-[#1e4d45] pl-6 py-2">
              Humans are social creatures. Strong relationships and community connections are as vital to health as diet and exercise.
            </p>

            <p>
              One of the most important predictors of healthy aging isn't how much you exercise or what you eat—it's the quality of your relationships. Study after study shows that seniors with strong social connections live longer, have better mental health, and even recover faster from illness.
            </p>

            <p>
              Yet loneliness among seniors is reaching epidemic levels in India. The shift from joint families to nuclear families, children moving to different cities or countries, and the loss of spouses and friends creates a perfect storm for isolation. But it doesn't have to be this way.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Social Connection Matters</h3>

            <p>
              Loneliness isn't just an emotional issue—it's a physical health risk. Chronic loneliness has been compared to smoking 15 cigarettes a day in terms of health impact. It increases risk of heart disease, stroke, dementia, depression, and even early death.
            </p>

            <p>
              On the flip side, seniors who maintain active social lives have stronger immune systems, lower rates of depression, better cognitive function, and a greater sense of purpose. Social engagement literally keeps you alive and thriving.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Ways to Build and Maintain Social Connections</h3>

            <div className="space-y-4 my-6">
              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-6 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-3">🏘️ Join Community Groups</h4>
                <p className="text-gray-700 mb-3">
                  Most neighborhoods have senior citizen associations. These groups organize activities, celebrate festivals, arrange health camps, and provide a ready-made community. If your area doesn't have one, consider starting it!
                </p>
                <p className="text-sm text-gray-600">Many housing societies now have dedicated senior activity centers with games, library, and social events.</p>
              </div>

              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-6 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-3">🎨 Pursue Hobbies and Interests</h4>
                <p className="text-gray-700 mb-3">
                  Join a painting class, a music group, a book club, or a gardening society. Shared interests create instant bonds. You'll meet people who share your passions and make friends naturally.
                </p>
                <p className="text-sm text-gray-600">Platforms like MyMittr can help you discover local groups and events tailored for seniors.</p>
              </div>

              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-6 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-3">🙏 Volunteer</h4>
                <p className="text-gray-700 mb-3">
                  Giving back to your community provides purpose and connection. Teach underprivileged children, help at a local temple or gurudwara, mentor young professionals, work with an NGO. Your experience and wisdom are valuable.
                </p>
                <p className="text-sm text-gray-600">Volunteering has been shown to increase life satisfaction and reduce depression in seniors.</p>
              </div>

              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-6 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-3">💻 Embrace Technology</h4>
                <p className="text-gray-700 mb-3">
                  Video calls with grandchildren, WhatsApp groups with old friends, online communities for your interests—technology can bridge distances. Don't be intimidated. Many libraries and community centers offer free tech classes for seniors.
                </p>
                <p className="text-sm text-gray-600">Start simple: learn video calling first, then explore other apps gradually.</p>
              </div>

              <div className="bg-gradient-to-r from-[#f4f9f7] to-white rounded-xl p-6 border-l-4 border-[#1e4d45]">
                <h4 className="font-bold text-gray-900 mb-3">🚶 Regular Meetups</h4>
                <p className="text-gray-700 mb-3">
                  Schedule regular coffee dates with friends, join a morning walking group, have a weekly card game session. Consistency is key. These regular touchpoints create structure and something to look forward to.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Active Aging: It's Not About Age, It's About Attitude</h3>

            <p>
              Active aging means staying engaged with life—physically, mentally, and socially. It's about continuing to participate in society, pursuing your interests, and maintaining your independence for as long as possible.
            </p>

            <div className="bg-white border-2 border-[#e6f0ed] rounded-2xl p-6 my-6">
              <h4 className="font-bold text-lg text-gray-900 mb-4">🌟 Principles of Active Aging</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl font-bold">1.</span>
                  <span><strong>Stay curious:</strong> Never stop learning. Take up new hobbies, learn new skills, explore new places.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl font-bold">2.</span>
                  <span><strong>Maintain independence:</strong> Do things for yourself as long as you can. Ask for help when needed, but don't give up too easily.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl font-bold">3.</span>
                  <span><strong>Stay positive:</strong> Focus on what you can do, not what you can't. Gratitude and optimism are powerful health tools.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl font-bold">4.</span>
                  <span><strong>Contribute:</strong> Share your knowledge, help others, be part of something bigger than yourself.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e4d45] text-xl font-bold">5.</span>
                  <span><strong>Adapt:</strong> Life changes. Be flexible. Find new ways to do things you love.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Overcoming Barriers to Social Engagement</h3>

            <div className="space-y-3 my-6">
              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-1">🚗 "I can't travel easily"</p>
                <p className="text-sm text-gray-700">Look for activities in your immediate neighborhood. Many communities now have senior-friendly transport services. Consider online groups for some connections.</p>
              </div>

              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-1">😔 "I'm too shy"</p>
                <p className="text-sm text-gray-700">Start small. Smile at neighbors. Join a structured activity where the focus is on the activity, not socializing. Friendships will develop naturally.</p>
              </div>

              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-1">💰 "I can't afford activities"</p>
                <p className="text-sm text-gray-700">Many activities are free: walking groups, library programs, community centers, religious gatherings. Look for government schemes for senior citizens.</p>
              </div>

              <div className="bg-[#f4f9f7] rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-1">😢 "I lost my spouse/friends"</p>
                <p className="text-sm text-gray-700">Grief is real and valid. Take your time, but don't isolate yourself. Support groups for widows/widowers can help. New friendships can't replace old ones, but they can bring new joy.</p>
              </div>
            </div>

            <p className="text-lg font-semibold text-gray-900 bg-gradient-to-r from-[#e6f0ed] to-white p-6 rounded-2xl border-l-4 border-[#1e4d45]">
              Your golden years should be just that—golden. You've earned the right to enjoy life, to be surrounded by people who care, to wake up with purpose and go to bed with contentment. Social connection isn't a luxury—it's a necessity. Reach out. Connect. Engage. Your best years can still be ahead of you.
            </p>
          </div>
        </article>

      </div>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Take Charge of Your Health?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join MyMittr's community of active, engaged seniors. Discover local health events, connect with wellness groups, and access trusted healthcare services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services/companionship"
              className="bg-white text-[#1e4d45] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              Find Health Events Near You
            </Link>
            <Link
              href="/services/community"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            <strong>Disclaimer:</strong> The information provided on this page is for educational purposes only and is not a substitute for professional medical advice. Always consult with your healthcare provider before making changes to your health routine.
          </p>
        </div>
      </section>
    </main>
  );
}
