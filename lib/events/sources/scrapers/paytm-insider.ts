// Paytm Insider Web Scraper
// Scrapes senior-relevant events from Paytm Insider (insider.in)

import type { RawEvent } from '@/types/events';
import { SCRAPING_CONFIG, INGESTION_CONFIG } from '../config';

export async function scrapePaytmInsiderEvents(): Promise<RawEvent[]> {
    if (!SCRAPING_CONFIG.paytmInsider.enabled) {
        console.log('Paytm Insider scraping disabled');
        return [];
    }

    const events: RawEvent[] = [];

    try {
        for (const city of SCRAPING_CONFIG.paytmInsider.cities) {
            const cityEvents = await scrapePaytmInsiderCity(city);
            events.push(...cityEvents);

            // Rate limiting
            await new Promise(resolve =>
                setTimeout(resolve, SCRAPING_CONFIG.paytmInsider.rateLimit)
            );
        }

        console.log(`Scraped ${events.length} events from Paytm Insider`);
        return events;
    } catch (error) {
        console.error('Error scraping Paytm Insider:', error);
        return events;
    }
}

async function scrapePaytmInsiderCity(city: string): Promise<RawEvent[]> {
    try {
        // Paytm Insider events page
        const url = `${SCRAPING_CONFIG.paytmInsider.baseUrl}/${city}`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': SCRAPING_CONFIG.userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();

        // Parse HTML and extract events
        const events = parsePaytmInsiderHTML(html, city);

        return events;
    } catch (error) {
        console.error(`Error scraping Paytm Insider for ${city}:`, error);
        return [];
    }
}

function parsePaytmInsiderHTML(html: string, city: string): RawEvent[] {
    const events: RawEvent[] = [];

    // Placeholder implementation
    // In production, use Playwright + cheerio similar to BookMyShow
    // Paytm Insider has a different DOM structure:
    // - Event cards: .event-card or .listing-card
    // - Title: .event-title or h3
    // - Date: .event-date or .date-info
    // - Venue: .venue-info
    // - Category: .category-tag

    return events;
}

// ============================================================================
// PRODUCTION IMPLEMENTATION WITH PLAYWRIGHT
// ============================================================================

/*
import { chromium, Browser } from 'playwright';

export async function scrapePaytmInsiderEventsWithPlaywright(): Promise<RawEvent[]> {
  let browser: Browser | null = null;
  const events: RawEvent[] = [];

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: SCRAPING_CONFIG.userAgent,
    });

    for (const city of SCRAPING_CONFIG.paytmInsider.cities) {
      const page = await context.newPage();
      
      try {
        await page.goto(`${SCRAPING_CONFIG.paytmInsider.baseUrl}/${city}`, {
          waitUntil: 'networkidle',
          timeout: SCRAPING_CONFIG.timeout,
        });

        // Scroll to load lazy-loaded events
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        await page.waitForTimeout(2000);

        // Extract events
        const cityEvents = await page.evaluate(() => {
          const eventCards = document.querySelectorAll('.event-card, .listing-card');
          const results: any[] = [];

          eventCards.forEach(card => {
            const title = card.querySelector('.event-title, h3')?.textContent?.trim();
            const description = card.querySelector('.event-description, .description')?.textContent?.trim();
            const dateStr = card.querySelector('.event-date, .date-info')?.textContent?.trim();
            const venue = card.querySelector('.venue-info, .location')?.textContent?.trim();
            const link = card.querySelector('a')?.getAttribute('href');
            const imageUrl = card.querySelector('img')?.getAttribute('src');
            const category = card.querySelector('.category-tag')?.textContent?.trim();

            if (title && dateStr) {
              results.push({
                title,
                description,
                dateStr,
                venue,
                link,
                imageUrl,
                category,
              });
            }
          });

          return results;
        });

        // Filter for senior-relevant categories
        const seniorCategories = ['wellness', 'health', 'yoga', 'meditation', 'spiritual', 'classical'];
        
        cityEvents
          .filter(event => {
            const text = `${event.title} ${event.description} ${event.category}`.toLowerCase();
            return seniorCategories.some(cat => text.includes(cat));
          })
          .forEach(event => {
            events.push({
              title: event.title,
              description: event.description || '',
              start_datetime: parseDateString(event.dateStr),
              location: { city, venue: event.venue },
              is_online: event.venue?.toLowerCase().includes('online') || false,
              registration_url: event.link ? `${SCRAPING_CONFIG.paytmInsider.baseUrl}${event.link}` : undefined,
              organizer_name: 'Paytm Insider',
              source_platform: 'paytm_insider',
              image_url: event.imageUrl,
            });
          });

        await page.close();
      } catch (error) {
        console.error(`Error scraping ${city}:`, error);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, SCRAPING_CONFIG.paytmInsider.rateLimit));
    }

    await browser.close();
    return events;
  } catch (error) {
    console.error('Paytm Insider scraping error:', error);
    if (browser) await browser.close();
    return events;
  }
}

function parseDateString(dateStr: string): string {
  // Paytm Insider uses formats like "Sat, 15 Feb" or "15 Feb onwards"
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      return futureDate.toISOString();
    }
    return date.toISOString();
  } catch {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    return futureDate.toISOString();
  }
}
*/
