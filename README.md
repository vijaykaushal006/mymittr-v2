# MyMittr - Full-Featured Social Media Platform

A comprehensive social media platform built with Next.js 15, Supabase, and modern web technologies. Features include posts with media, reactions, stories, groups, events, and much more.

## 🚀 Features

### Core Social Features
- ✅ **Enhanced Posts** - Create posts with photos, videos, feelings, activities, and location
- ✅ **6 Reaction Types** - Like, Love, Haha, Wow, Sad, Angry
- ✅ **Media Carousel** - Multiple images/videos per post
- ✅ **Comments & Replies** - Threaded conversations
- ✅ **Privacy Controls** - Public, Friends, or Private posts
- ✅ **Save Posts** - Bookmark posts for later

### Groups & Communities
- ✅ **Create Groups** - Public, Private, or Secret groups
- ✅ **Member Roles** - Admin, Moderator, Member
- ✅ **Group Posts** - Dedicated group feeds
- ✅ **Join Requests** - Approval system for private groups

### Events
- ✅ **Create Events** - Online or in-person events
- ✅ **RSVP System** - Going, Interested, Not Going
- ✅ **Event Invitations** - Invite friends to events
- ✅ **Event Discovery** - Browse upcoming public events

### Media & Albums
- ✅ **Photo Albums** - Organize photos into albums
- ✅ **Photo Tagging** - Tag friends in photos
- ✅ **Supabase Storage** - Secure media uploads
- ✅ **Profile & Cover Photos** - Customize your profile

### Advanced Features
- ✅ **Stories** - 24-hour expiring stories (backend ready)
- ✅ **Polls** - Create polls in posts
- ✅ **Hashtags** - Tag and discover content
- ✅ **Mentions** - Tag users in posts
- ✅ **Content Reporting** - Report inappropriate content
- ✅ **User Blocking** - Block unwanted users
- ✅ **Marketplace** - Buy and sell items (backend ready)
- ✅ **Live Streaming** - Live video sessions (backend ready)
- ✅ **Business Pages** - Create brand pages (backend ready)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Real-time**: Supabase Realtime (ready for implementation)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mymittr-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   Follow the instructions in [`DATABASE_SETUP.md`](./DATABASE_SETUP.md) to:
   - Apply database migrations
   - Set up storage buckets
   - Regenerate TypeScript types

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The platform uses 25+ database tables including:

- **Posts & Interactions**: `community_posts`, `post_reactions`, `post_comments`, `post_media`
- **Stories**: `stories`, `story_views`
- **Groups**: `groups`, `group_members`, `group_posts`
- **Events**: `events`, `event_attendees`
- **Media**: `photo_albums`, `album_photos`
- **Polls**: `post_polls`, `poll_options`, `poll_votes`
- **Social**: `saved_posts`, `hashtags`, `post_mentions`, `blocked_users`
- **Marketplace**: `marketplace_categories`, `marketplace_listings`
- **Pages**: `pages`, `page_followers`
- **Live**: `live_streams`, `stream_viewers`
- **Moderation**: `content_reports`, `user_activities`

All tables include Row Level Security (RLS) policies for data protection.

## 📁 Project Structure

```
mymittr-v2/
├── app/
│   ├── actions/              # Server actions
│   │   ├── social.ts        # Posts, reactions, stories
│   │   ├── groups.ts        # Group management
│   │   ├── events.ts        # Event management
│   │   └── media.ts         # Media uploads, albums
│   ├── services/
│   │   ├── community/       # Community feed
│   │   ├── groups/          # Groups pages
│   │   └── events/          # Events pages
│   └── ...
├── components/              # Reusable components
├── lib/                     # Utilities
├── supabase/
│   └── migrations/          # Database migrations
├── types/
│   └── supabase.ts         # TypeScript types
└── ...
```

## 🎨 Key Components

### CreatePost Component
- Multi-media upload with previews
- Feeling and activity selectors
- Location tagging
- Privacy controls
- Rich text support

### PostCard Component
- 6 reaction types with picker
- Media carousel
- Inline comments
- Save/delete options
- Feeling/activity/location display

### Groups & Events
- Listing pages
- Create forms
- Member/attendee management
- Discovery features

## 🔒 Security

- **Row Level Security (RLS)** on all database tables
- **Authentication** via Supabase Auth
- **Input validation** in server actions
- **Content moderation** system
- **Privacy controls** for all content

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted

## 📝 Next Steps

### Implement UI for Backend-Ready Features

1. **Stories Feature**
   - Stories bar component
   - Story creator with camera
   - Story viewer with swipe navigation

2. **Messaging System**
   - Chat inbox
   - Real-time messaging
   - Message notifications

3. **Notifications**
   - Notification bell
   - Real-time updates
   - Mark as read

4. **Search**
   - Global search
   - Filter by type
   - Hashtag search

5. **Marketplace**
   - Listing pages
   - Product details
   - Category browsing

6. **Live Streaming**
   - Stream creator
   - Live viewer
   - Chat integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For issues and questions:
- Check the [DATABASE_SETUP.md](./DATABASE_SETUP.md) for setup help
- Review the [walkthrough.md](./walkthrough.md) for feature documentation
- Open an issue on GitHub

---

**Built with ❤️ for senior citizens and their families**
