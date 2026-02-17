import { ReactNode } from 'react';

export interface HealthTopic {
    id: string;
    title: string;
    icon: string;
    content: string; // We'll keep it as a string for now, or could use components
}

export const healthTopics = [
    {
        id: "healthy-living",
        title: "Healthy Living After 60",
        icon: "🌟",
        content: `
      <p class="lead">Turning 60 isn't the end of an active life—it's the beginning of a new chapter filled with wisdom, freedom, and opportunities to prioritize your well-being.</p>
      
      <p>In India, we've always respected our elders. The years after 60 bring unique freedom—children are settled, careers built, and there's finally time to focus on yourself. But this freedom comes with responsibility: taking care of your health so you can truly enjoy these golden years.</p>
      
      <h3>Simple Daily Habits That Make a Difference</h3>
      
      <p>Small, consistent changes create the foundation for a healthier, happier life. You don't need to overhaul your entire lifestyle overnight.</p>
      
      <ul>
        <li><strong>Start with movement:</strong> Just 10 minutes of stretching or a short walk in the morning can energize your entire day and keep joints flexible.</li>
        <li><strong>Stay hydrated:</strong> As we age, our sense of thirst diminishes. Keep water handy and sip throughout the day, even if you don't feel thirsty.</li>
        <li><strong>Prioritize sleep:</strong> Aim for 7-8 hours of quality sleep. A consistent localized schedule helps regulate your body's internal clock.</li>
        <li><strong>Stay connected:</strong> Make time for friends, family, and community. Social interaction is as vital as exercise.</li>
        <li><strong>Keep your mind active:</strong> Read the newspaper, solve puzzles, or learn a new skill like using a smartphone app.</li>
      </ul>

      <div class="highlight-box">
        <strong>Remember:</strong> It's never too late to start. Whether you start at 60 or 80, your body responds positively to care and attention.
      </div>
    `
    },
    {
        id: "physical-activity",
        title: "Physical Activity & Mobility",
        icon: "🚶",
        content: `
      <p class="lead">Movement is medicine. Regular physical activity is the single most important thing you can do to maintain independence and vitality.</p>
      
      <p>Exercise becomes even more important as we age. It's not about building big muscles; it's about maintaining functionality—being able to walk to the market, play with grandchildren, and travel comfortably. Studies show active seniors have better heart health, stronger bones, improved balance, and sharper minds.</p>
      
      <h3>Gentle Ways to Stay Active</h3>
      
      <p>You don't need a gym membership to stay fit. The best exercise is the one you enjoy and will do consistently.</p>

      <h4>1. Walking</h4>
      <p>It's free, requires no equipment, and can be done anywhere. A 30-minute walk in your local park or even around your housing society is excellent for heart health. Join a morning walking group to make it social.</p>

      <h4>2. Chair Exercises</h4>
      <p>Perfect if you have mobility issues or balance concerns. You can do leg lifts, arm circles, and gentle twists while seated comfortably. These help maintain joint flexibility without strain.</p>

      <h4>3. Swimming</h4>
      <p>If you have access to a pool, swimming is fantastic because the water supports your weight, taking stress off your knees and back while providing a full-body workout.</p>

      <div class="warning-box">
        <strong>Safety First:</strong> Always consult your doctor before starting a new exercise routine. Start slow, listen to your body, and wear supportive footwear to prevent falls.
      </div>
    `
    },
    {
        id: "mental-wellness",
        title: "Mental & Emotional Wellness",
        icon: "🧠",
        content: `
      <p class="lead">A healthy mind is just as important as a healthy body. Mental well-being directly impacts your physical health and quality of life.</p>
      
      <p>The years after 60 can bring unique emotional challenges. Retirement, children moving away (empty nest syndrome), or the loss of a spouse/friend can lead to feelings of loneliness or lack of purpose. These are real, valid feelings, and acknowledging them is the first step to feeling better.</p>
      
      <h3>Nurturing Your Emotional Health</h3>
      
      <ul>
        <li><strong>Talk about your feelings:</strong> Don't bottle things up. Share your thoughts with a trusted friend, family member, or counselor. In India, we often hesitate to discuss mental health, but talking is a sign of strength, not weakness.</li>
        <li><strong>Keep learning:</strong> Neuroplasticity—the brain's ability to change—continues throughout life. Learn a new language, pick up a musical instrument, or master a new recipe.</li>
        <li><strong>Find purpose:</strong> Purpose predicts longevity. Verified volunteers on MyMittr often say that helping others gives them a renewed sense of meaning.</li>
        <li><strong>Practice gratitude:</strong> Take five minutes each evening to think of three small things that went well today. It shifts your focus from what's missing to what's present.</li>
      </ul>

      <p>If you've felt persistently sad, anxious, or hopeless for more than two weeks, please reach out to a professional. Mental health services for seniors are accessible and effective.</p>
    `
    },
    {
        id: "yoga-meditation",
        title: "Yoga & Meditation",
        icon: "🕉️",
        content: `
      <p class="lead">Ancient Indian wisdom aimed at unifying the mind, body, and spirit. For seniors, yoga is a gentle yet powerful practice.</p>
      
      <p>Yoga isn't about twisting your body into impossible shapes. It's about connecting your breath with gentle movement, building strength safely, and improving flexibility. Modern science now backs what our ancestors knew: yoga reduces stress, lowers blood pressure, and improves balance (reducing the risk of falls).</p>
      
      <h3>Senior-Friendly Asanas</h3>
      
      <ul>
        <li><strong>Tadasana (Mountain Pose):</strong> Simply standing tall with proper alignment improves posture and balance.</li>
        <li><strong>Vrikshasana (Tree Pose):</strong> Can be done with wall support. Excellent for concentration and stability.</li>
        <li><strong>Setu Bandhasana (Bridge Pose):</strong> Strengthens the back and glutes, helping relieve back pain.</li>
        <li><strong>Shavasana (Corpse Pose):</strong> Deep relaxation that calms the nervous system and lowers stress hormones.</li>
      </ul>

      <h3>The Power of Pranayama</h3>
      <p>Even if physical movement is difficult, <strong>Pranayama (breath control)</strong> is accessible to everyone. Simple practices like <em>Anulom Vilom</em> (Alternate Nostril Breathing) balance the nervous system and clear the mind of anxiety.</p>
      
      <p>Start with just 5 minutes of meditation daily. Sit comfortably, close your eyes, and focus on your natural breath. When your mind wanders (and it will), gently bring it back to the breath.</p>
    `
    },
    {
        id: "preventive-care",
        title: "Preventive Care & Checkups",
        icon: "⚕️",
        content: `
      <p class="lead">Prevention is better than cure. Regular checkups help catch potential issues early when they are easiest to treat.</p>
      
      <p>In India, we often have a culture of visiting the doctor only when we are seriously ill. We need to shift this mindset to proactive health management. Think of your body like a classic car—it needs regular maintenance to keep running smoothly.</p>
      
      <h3>Essential Checkups for Seniors</h3>
      
      <ul>
        <li><strong>Blood Pressure:</strong> High BP is a "silent killer" with often no symptoms. Check it regularly at home or at a pharmacy.</li>
        <li><strong>Blood Sugar (HbA1c):</strong> India is the diabetes capital of the world. Testing every 3-6 months helps manage or prevent diabetes complications.</li>
        <li><strong>Lipid Profile (Cholesterol):</strong> Keeps a check on heart health.</li>
        <li><strong>Eye Exam:</strong> Include checking for cataracts and glaucoma. Vision loss can often be prevented.</li>
        <li><strong>Bone Density Test:</strong> Especially for women post-menopause, to screen for osteoporosis.</li>
      </ul>

      <p><strong>Vaccinations aren't just for kids.</strong> Ask your doctor about the annual Flu shot, Pneumonia vaccine, and Shingles vaccine. They provide vital protection as our immune systems naturally weaken with age.</p>
    `
    },
    {
        id: "nutrition",
        title: "Nutrition Tips for the Elderly",
        icon: "🥗",
        content: `
      <p class="lead">You are what you eat. As metabolism slows, every calorie needs to be packed with nutrition.</p>
      
      <p>The traditional Indian diet—rich in lentils, vegetables, whole grains, and spices—is naturally healthy, but we often consume too much rice/wheat and not enough protein. As we age, we need <em>fewer</em> calories but <em>more</em> nutrients.</p>
      
      <h3>Key Nutrients for Seniors</h3>
      
      <ul>
        <li><strong>Calcium & Vitamin D:</strong> Critical for bone health. Include milk, curd (dahi), paneer, Ragi, and sesame seeds. Don't forget 15 minutes of morning sunlight!</li>
        <li><strong>Protein:</strong> Essential to prevent muscle loss (sarcopenia). Include dal, pulses (rajma, chana), eggs, fish, or soya in every meal.</li>
        <li><strong>Fiber:</strong> Prevents constipation and controls blood sugar. Choose whole fruits over juice, brown rice/millets over white rice, and plenty of vegetables.</li>
        <li><strong>Omega-3 Fatty Acids:</strong> Good for the brain and heart. Found in walnuts, flaxseeds (alsi), and fatty fish.</li>
      </ul>

      <h3>Healthy Eating Habits</h3>
      <p>Try to eat smaller, more frequent meals if a large thali feels heavy. Limit salt to keep blood pressure in check, and reduce sugar to manage weight and inflammation. And remember, drink water even before you feel thirsty!</p>
    `
    },
    {
        id: "social-wellbeing",
        title: "Social Wellbeing & Active Aging",
        icon: "👥",
        content: `
      <p class="lead">Human connection is a fundamental need. Strong relationships are as vital to your health as diet and exercise.</p>
      
      <p>Research consistently shows that seniors with active social lives live longer, have stronger immune systems, and lower risks of dementia. Loneliness isn't just a feeling; it's a health risk comparable to smoking 15 cigarettes a day.</p>
      
      <h3>Ways to Stay socially Active</h3>
      
      <ul>
        <li><strong>Join Community Groups:</strong> Most Indian neighborhoods have Senior Citizen Associations. Join them for festivals, outings, and chats.</li>
        <li><strong>Pursue Hobbies:</strong> Join a singing group, a book club, or a gardening society. Shared interests create instant bonds.</li>
        <li><strong>Volunteer:</strong> Your experience is invaluable. Teach underserved children, mentor young professionals, or help at a local NGO. Giving back provides a powerful sense of purpose.</li>
        <li><strong>Embrace Technology:</strong> Video calls allow you to see grandchildren miles away. WhatsApp groups keep you connected with school friends. Don't be afraid to learn—MyMittr offers guidance on using tech safely.</li>
      </ul>

      <p><strong>Principles of Active Aging:</strong> Stay curious, maintain your independence, focus on what you <em>can</em> do, and adapt to changes with a positive spirit. Your golden years should be filled with connection and joy.</p>
    `
    }
];
