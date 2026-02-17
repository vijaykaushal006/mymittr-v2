# 🚀 HOW TO GET REAL EVENTS FROM MEETUP & EVENTBRITE

## What You Have Now
- ✅ **Test events** (12 sample events in database)
- ✅ **Real-time fetching code** (already built and ready!)
- ⚠️ **Missing:** API keys to activate real fetching

## What Happens When You Add API Keys

**Without API keys (current state):**
- Shows only test events
- No real data from Meetup/Eventbrite

**With API keys (after setup):**
- Fetches **real events** from Meetup.com
- Fetches **real events** from Eventbrite.com
- AI scores them for senior relevance
- Automatically adds them to your website
- Updates every 6 hours

---

## 🎯 Quick Setup (10 Minutes)

### Step 1: Get Meetup API Key (FREE)

1. **Go to:** https://www.meetup.com/
2. **Log in** (or create free account)
3. **Go to:** https://secure.meetup.com/meetup_api/key/
4. **Copy your API key** (looks like: `a1b2c3d4e5f6...`)
5. **Save it** in a text file

### Step 2: Get Eventbrite OAuth Token (FREE)

1. **Go to:** https://www.eventbrite.com/
2. **Log in** (or create free account)
3. **Go to:** https://www.eventbrite.com/platform/
4. **Click "Create New App"**
5. **Fill in:**
   - App Name: `MyMittr Events`
   - Website: `https://www.mymittr.com`
   - Description: `Fetch senior-friendly events`
6. **Click "Create App"**
7. **Copy "Private Token"** (looks like: `ABCDEFGH123...`)
8. **Save it** in a text file

### Step 3: Add Keys to .env.local

1. **Open:** `c:\Users\vijay\Downloads\mymittr-v2\.env.local`
2. **Find these lines:**
   ```bash
   #MEETUP_API_KEY=REPLACE_WITH_YOUR_MEETUP_KEY
   #EVENTBRITE_API_KEY=REPLACE_WITH_YOUR_EVENTBRITE_TOKEN
   ```
3. **Remove the #** and **replace** with your actual keys:
   ```bash
   MEETUP_API_KEY=a1b2c3d4e5f6g7h8i9j0
   EVENTBRITE_API_KEY=ABCDEFGH123456789
   ```
4. **Save the file** (Ctrl+S)

### Step 4: Restart Dev Server

In your terminal:
1. **Stop server:** Press `Ctrl+C`
2. **Start again:** Type `npm run dev` and press Enter
3. **Wait** for "Ready" message

### Step 5: Fetch Real Events

**Open a new terminal** and run:

```bash
curl -X POST http://localhost:3001/api/events/ingest -H "Authorization: Bearer mySecretPassword123"
```

**Wait 30-60 seconds.** You'll see:

```json
{
  "success": true,
  "stats": {
    "total_fetched": 150,
    "new_events": 45,
    "rejected_events": 67
  }
}
```

### Step 6: See Real Events!

**Refresh:** http://localhost:3001/services/companionship

**You'll now see:**
- ✅ Real yoga classes from Meetup
- ✅ Real wellness events from Eventbrite
- ✅ Real senior meetups
- ✅ Real health talks
- ✅ All automatically fetched and filtered!

---

## 🔍 What Gets Fetched

### From Meetup.com:
- Events in: Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, Jaipur, Lucknow
- Keywords: "senior", "elderly", "60+", "yoga", "wellness", "health"
- Both online and in-person events

### From Eventbrite.com:
- Events in same cities
- Categories: Wellness, Learning, Social, Culture
- Senior-relevant activities

### AI Filtering:
- Only events with senior relevance score ≥ 0.6
- Automatically categorizes (Health, Spiritual, Social, etc.)
- Removes duplicates
- Normalizes city names

---

## 📊 Expected Results

**First run:**
- Fetched: 100-200 events
- New events added: 20-50
- Rejected (not senior-relevant): 50-150

**Your website will show:**
- Test events (12) + Real events (20-50) = **30-60 total events**

---

## 🤖 Optional: Add OpenAI for Better AI Scoring

**Without OpenAI:**
- Uses rule-based keyword matching
- Works fine, but less accurate

**With OpenAI:**
- Uses GPT-4o-mini AI
- Better relevance scoring
- Costs ~$0.10 per 1000 events

**To add:**
1. Go to: https://platform.openai.com/api-keys
2. Create account, add payment method
3. Create API key (starts with `sk-`)
4. Add to `.env.local`:
   ```bash
   OPENAI_API_KEY=sk-proj-abc123...
   ```

---

## 🔄 Automation (Events Update Every 6 Hours)

Once you verify it works, set up automation:

**Use cron-job.org (FREE):**
1. Go to: https://cron-job.org/
2. Create account
3. Create new cron job:
   - URL: `https://www.mymittr.com/api/events/ingest`
   - Schedule: Every 6 hours
   - Header: `Authorization: Bearer mySecretPassword123`

Events will automatically update 4 times per day!

---

## ✅ Summary

**The real-time fetching code is already built!** You just need to:

1. ✅ Get Meetup API key (5 min)
2. ✅ Get Eventbrite token (5 min)
3. ✅ Add to `.env.local` (1 min)
4. ✅ Restart server (30 sec)
5. ✅ Run ingestion command (1 min)
6. ✅ See real events! (instant)

**Total time: ~15 minutes to go from test data to real events!**

---

## 🐛 Troubleshooting

**"No events fetched":**
- Check API keys are correct
- Make sure you removed the `#` from the lines
- Verify you restarted the dev server

**"Unauthorized" error:**
- Make sure `Authorization: Bearer mySecretPassword123` matches your `CRON_SECRET`

**Low number of events:**
- This is normal! Only senior-relevant events are kept
- Try running ingestion multiple times (events update daily on Meetup/Eventbrite)

---

**Your code is ready. Just add the API keys and real events will flow!** 🎉
