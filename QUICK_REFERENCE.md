# Quick Reference Card - Event Ingestion Setup

## ✅ Checklist

- [ ] **Step 1:** Run SQL in Supabase Dashboard (creates tables + test events)
- [ ] **Step 2:** Get API keys from Meetup, Eventbrite, OpenAI
- [ ] **Step 3:** Add keys to `.env.local`
- [ ] **Step 4:** Restart dev server (`Ctrl+C` then `npm run dev`)
- [ ] **Step 5:** Test ingestion with curl command
- [ ] **Step 6:** Set up cron job at cron-job.org
- [ ] **Step 7:** Deploy to Vercel with environment variables

---

## 🔑 Where to Get API Keys

| Service | URL | What You Get |
|---------|-----|--------------|
| **Meetup** | https://secure.meetup.com/meetup_api/key/ | API Key (letters/numbers) |
| **Eventbrite** | https://www.eventbrite.com/platform/ | OAuth Token (create app first) |
| **OpenAI** | https://platform.openai.com/api-keys | API Key (starts with `sk-`) |

---

## 📝 .env.local Template

```bash
# Existing Supabase keys (don't change)
NEXT_PUBLIC_SUPABASE_URL=https://gcimtxgtzudsaopxdctu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# Add these new lines:
MEETUP_API_KEY=your_meetup_key_here
EVENTBRITE_API_KEY=your_eventbrite_token_here
OPENAI_API_KEY=your_openai_key_here
CRON_SECRET=any_random_password_you_choose
```

---

## 🧪 Test Command

```bash
curl -X POST http://localhost:3001/api/events/ingest \
  -H "Authorization: Bearer your_cron_secret"
```

Replace `your_cron_secret` with whatever you set as `CRON_SECRET`

---

## 🌐 URLs You'll Need

| What | URL |
|------|-----|
| **Supabase Dashboard** | https://supabase.com/dashboard |
| **Your Project** | https://supabase.com/dashboard/project/gcimtxgtzudsaopxdctu |
| **Local Website** | http://localhost:3001/services/companionship |
| **Production Website** | https://www.mymittr.com/services/companionship |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Cron Job Setup** | https://cron-job.org/ |

---

## 🎯 Expected Results

After running ingestion:
- **Fetched:** 100-200 events from APIs
- **New Events:** 20-50 events added
- **Rejected:** 50-150 events (not senior-relevant)

On your website:
- Test events (12) + Real events (20-50) = **30-60 total events**
- Filters work (city, category, online/offline)
- Events have future dates
- Registration links work

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| "No events found" | Run SQL in Supabase first |
| "Unauthorized" error | Check CRON_SECRET matches in curl command |
| API keys not working | Restart dev server after adding to .env.local |
| Events not on production | Add env vars in Vercel, then redeploy |

---

## 📞 Files to Check

- **SQL Script:** `c:\Users\vijay\Downloads\mymittr-v2\supabase\INSTANT_SETUP.sql`
- **Environment:** `c:\Users\vijay\Downloads\mymittr-v2\.env.local`
- **Complete Guide:** See COMPLETE_GUIDE.md artifact

---

**Need detailed steps? See COMPLETE_GUIDE.md**
