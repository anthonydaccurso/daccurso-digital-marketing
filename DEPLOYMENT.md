# Deployment Guide

This guide explains how to deploy your website with all APIs working correctly in production.

## Overview

Your site uses three main API integrations:

1. **Ask Ant Chat** - Uses OpenRouter AI API via Netlify Functions
2. **News Analyzer** - Fetches financial news via Supabase Edge Function
3. **ETF Health Predictor** - Fetches ETF market data via Supabase Edge Function

## Prerequisites

- Netlify account (for hosting and Netlify Functions)
- Supabase account (for Edge Functions)
- OpenRouter API key (for Ask Ant chat feature)

## 1. Netlify Deployment

### A. Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build settings should auto-detect:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`

### B. Set Environment Variables in Netlify

Go to your site's **Site configuration** → **Environment variables** and add:

```
OPENROUTER_API_KEY=your-actual-openrouter-api-key
VITE_SUPABASE_URL=https://bvevrurqtidadhfsuoee.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Important:** Replace `OPENROUTER_API_KEY` with your real API key from [OpenRouter](https://openrouter.ai/).

The current placeholder `sk-your-secret-key` in `.env` will NOT work in production.

## 2. Supabase Edge Functions Deployment

Your site has two Edge Functions that need to be deployed to Supabase:

### A. Install Supabase CLI

```bash
npm install -g supabase
```

### B. Login to Supabase

```bash
supabase login
```

### C. Link to Your Project

```bash
supabase link --project-ref bvevrurqtidadhfsuoee
```

### D. Deploy Edge Functions

Deploy all functions at once:

```bash
supabase functions deploy financial-news
supabase functions deploy etf-data
```

Or deploy all functions:

```bash
supabase functions deploy
```

### E. Verify Deployment

Check if your functions are deployed:

```bash
supabase functions list
```

You should see:
- `financial-news` - ✓ Deployed
- `etf-data` - ✓ Deployed

## 3. Testing Your Deployment

### Test Ask Ant Chat

1. Visit your deployed site
2. Click the "Ask Ant" chat button
3. Send a message
4. You should receive a response

If it fails, check:
- Netlify environment variable `OPENROUTER_API_KEY` is set correctly
- Netlify Functions are deployed (check Netlify dashboard → Functions)

### Test News Analyzer

1. Go to "Live Tools" section
2. The News Analyzer should load financial news
3. Check browser console for errors if it fails

If it fails, check:
- Supabase Edge Function `financial-news` is deployed
- Function URL is accessible: `https://bvevrurqtidadhfsuoee.supabase.co/functions/v1/financial-news`

### Test ETF Health Predictor

1. Go to "Live Tools" section
2. ETF data should load for selected tickers
3. Check browser console for errors if it fails

If it fails, check:
- Supabase Edge Function `etf-data` is deployed
- Function URL is accessible: `https://bvevrurqtidadhfsuoee.supabase.co/functions/v1/etf-data`

## 4. Common Issues & Solutions

### Issue: "Ask Ant is temporarily unavailable"

**Cause:** OpenRouter API key is missing or invalid

**Solution:**
1. Get a valid API key from [OpenRouter](https://openrouter.ai/)
2. Add it to Netlify environment variables
3. Redeploy your site

### Issue: "Unable to fetch financial news"

**Cause:** Supabase Edge Function not deployed

**Solution:**
```bash
supabase functions deploy financial-news
```

### Issue: "Failed to fetch ETF data"

**Cause:** Supabase Edge Function not deployed

**Solution:**
```bash
supabase functions deploy etf-data
```

### Issue: CORS errors in browser console

**Cause:** Edge Functions not properly configured

**Solution:**
- Edge Functions already have CORS headers configured
- Ensure functions are deployed
- Check function logs: `supabase functions logs financial-news`

## 5. Local Development

To test locally:

1. **Start Vite dev server:**
   ```bash
   npm run dev
   ```

2. **Test Netlify Functions locally:**
   ```bash
   netlify dev
   ```

3. **Test Supabase Edge Functions locally:**
   ```bash
   supabase functions serve
   ```

## 6. Monitoring & Logs

### Netlify Function Logs
- Go to Netlify Dashboard → Your Site → Functions
- Click on `openrouter-proxy` to view logs

### Supabase Edge Function Logs
```bash
supabase functions logs financial-news
supabase functions logs etf-data
```

## 7. Cost Considerations

- **Netlify:** Free tier includes 125k function invocations/month
- **Supabase:** Free tier includes 500k edge function invocations/month
- **OpenRouter:** Mistral-7B-Instruct is a free model (rate limited)

## Summary Checklist

Before going live, ensure:

- [ ] Site is deployed to Netlify
- [ ] `OPENROUTER_API_KEY` environment variable is set in Netlify
- [ ] Supabase Edge Functions are deployed (`financial-news`, `etf-data`)
- [ ] Ask Ant chat works
- [ ] News Analyzer loads financial news
- [ ] ETF Health Predictor shows market data
- [ ] No console errors in browser

## Need Help?

If you encounter issues:

1. Check browser console for errors
2. Check Netlify function logs
3. Check Supabase function logs
4. Verify all environment variables are set
5. Ensure all functions are deployed
