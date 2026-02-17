# Senior Events System - Quick Setup Guide

## ⚡ Quick Start (5 Steps)

### 1. Run Database Migration

```bash
# Using Supabase CLI
npx supabase db push
```

Or manually via Supabase Dashboard:
1. Go to SQL Editor
2. Copy contents of `supabase/migrations/20260217_senior_events.sql`
3. Execute

### 2. Get API Keys

**Meetup** → https://www.meetup.com/api/
**Eventbrite** → https://www.eventbrite.com/platform/
**OpenAI** → https://platform.openai.com/

### 3. Add Environment Variables

Create/update `.env.local`:

```bash
# Existing
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# New - Add these
MEETUP_API_KEY=your_meetup_key
EVENTBRITE_API_KEY=your_eventbrite_key
OPENAI_API_KEY=your_openai_key
CRON_SECRET=random_secret_string
```

### 4. Generate Supabase Types

```bash
npx supabase gen types typescript --local > types/supabase.ts
```

This fixes the TypeScript errors.

### 5. Test Locally

```bash
npm run dev

# In another terminal, test ingestion:
curl -X POST http://localhost:3000/api/events/ingest \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Visit: http://localhost:3000/services/companionship

---

## 🤖 Set Up Automated Ingestion

### Option A: Vercel Cron (Pro Plan Required)

Create `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/events/ingest",
    "schedule": "0 */6 * * *"
  }]
}
```

### Option B: Free External Cron

Use **cron-job.org** or **GitHub Actions**:

**Endpoint:** `https://www.mymittr.com/api/events/ingest`
**Method:** POST
**Header:** `Authorization: Bearer YOUR_CRON_SECRET`
**Schedule:** Every 6 hours (`0 */6 * * *`)

---

## 🚀 Deploy

```bash
git add .
git commit -m "Add Senior Events Aggregation System"
git push origin main
```

Add environment variables in Vercel dashboard, then redeploy.

---

## 📍 What You Get

✅ **Automated event discovery** from Meetup & Eventbrite
✅ **AI-powered relevance scoring** for seniors
✅ **Duplicate detection** to prevent redundancy
✅ **Community submissions** for grassroots events
✅ **Senior-friendly UI** with large fonts & high contrast
✅ **Moderation workflow** for quality control
✅ **Trust & safety** features (verified badges, source attribution)

---

## 🎯 Key Files

- **Database:** `supabase/migrations/20260217_senior_events.sql`
- **Frontend:** `app/services/companionship/page.tsx`
- **Components:** `components/events/`
- **Ingestion:** `lib/events/ingest-orchestrator.ts`
- **Config:** `lib/events/config.ts`
- **Types:** `types/events.ts`

---

## 💡 Tips

1. **Start with test data:** Run ingestion manually first to see results
2. **Monitor logs:** Check `event_ingestion_logs` table for issues
3. **Adjust relevance threshold:** Edit `INGESTION_CONFIG.minRelevanceScore` in config.ts
4. **Add more cities:** Update `INDIAN_CITIES` array in config.ts
5. **Customize categories:** Modify `CATEGORY_CONFIG` for your needs

---

## 🐛 Troubleshooting

**TypeScript errors?** → Run `npx supabase gen types typescript --local > types/supabase.ts`

**No events showing?** → Check if migration ran successfully, verify API keys

**Ingestion failing?** → Check `event_ingestion_logs` table for error messages

**Rate limited?** → Reduce batch sizes in `config.ts`

---

For detailed documentation, see [walkthrough.md](file:///C:/Users/vijay/.gemini/antigravity/brain/74510bf0-280d-4286-b8b1-c8df9fd18b7e/walkthrough.md)
