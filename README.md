# Stable Diffusion Prompt Generator

A Next.js app for generating optimized Stable Diffusion XL prompts with organized sections and drag-and-drop reordering.

## Features

- ✅ Organized prompt sections (#subject, #details, #style, etc.)
- ✅ Comprehensive keyword library (200+ prompt pieces)
- ✅ Drag-and-drop section reordering
- ✅ Collapsible sections with dropdowns for additional options
- ✅ Real-time prompt preview
- ✅ Copy to clipboard
- ✅ Share to Discord via webhook
- ✅ Save/load presets
- ✅ Mobile-friendly design
- ✅ Comma-separated keyword count

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file (optional, for Discord webhook):
```
NEXT_PUBLIC_DISCORD_WEBHOOK_URL=your_webhook_url_here
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Discord Webhook Setup

1. Go to your Discord server
2. Navigate to Server Settings → Integrations → Webhooks
3. Create a new webhook
4. Copy the webhook URL
5. Add it to `.env.local` as `NEXT_PUBLIC_DISCORD_WEBHOOK_URL`

## Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variable `NEXT_PUBLIC_DISCORD_WEBHOOK_URL` if using Discord sharing
4. Deploy!

## Build

```bash
npm run build
npm start
```
