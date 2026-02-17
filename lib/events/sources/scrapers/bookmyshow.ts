// BookMyShow Web Scraper
// Scrapes senior-relevant events from BookMyShow India

import type { RawEvent } from '@/types/events';
import { SCRAPING_CONFIG, INGESTION_CONFIG } from '../config';

// Note: This is a simplified scraper. In production, you'd use Playwright for robust scraping
// For now, we'll use fetch with cheerio-like parsing

export async function scrapeBookMyShowEvents(): Promise<RawEvent[]> {
    if (!SCRAPING_CONFIG.bookmyshow.enabled) {
        console.log('BookMyShow scraping disabled');
        return [];
    }

    const events: RawEvent[] = [];

    try {
        for (const city of SCRAPING_CONFIG.bookmyshow.cities) {
            const cityEvents = await scrapeBookMyShowCity(city);
            events.push(...cityEvents);

            // Rate limiting
            await new Promise(resolve =>
                setTimeout(resolve, SCRAPING_CONFIG.bookmyshow.rateLimit)
            );
        }

        console.log(`Scraped ${events.length} events from BookMyShow`);
        return events;
    } catch (error) {
        console.error('Error scraping BookMyShow:', error);
        return events;
    }
}

async function scrapeBookMyShowCity(city: string): Promise<RawEvent[]> {
    try {
        // BookMyShow activities/workshops page
        const url = `${SCRAPING_CONFIG.bookmyshow.baseUrl}/${city}/activities`;

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
        // This is a simplified version - in production, use Playwright + cheerio
        const events = parseBookMyShowHTML(html, city);

        return events;
    } catch (error) {
        console.error(`Error scraping BookMyShow for ${city}:`, error);
        return [];
    }
}

function parseBookMyShowHTML(html: string, city: string): RawEvent[] {
    const events: RawEvent[] = [];

    // This is a placeholder implementation
    // In production, you would:
    // 1. Use Playwright to render JavaScript
    // 2. Use cheerio or similar to parse DOM
    // 3. Extract event cards with selectors like:
    //    - Title: .event-title
    //    - Date: .event-date
    //    - Venue: .venue-name
    //    - Link: .event-card a[href]

    // For now, return empty array
    // The actual implementation would look like:
    /*
    const $ = cheerio.load(html);
    $('.event-card').each((i, elem) => {
      const title = $(elem).find('.event-title').text().trim();
      const description = $(elem).find('.event-description').text().trim();
      const dateStr = $(elem).find('.event-date').text().trim();
      const venue = $(elem).find('.venue-name').text().trim();
      const link = $(elem).find('a').attr('href');
      const imageUrl = $(elem).find('img').attr('src');
  
      if (title && dateStr) {
        events.push({
          title,
          description,
          start_datetime: parseDateString(dateStr),
          location: { city, venue },
          is_online: false,
          registration_url: link ? `${SCRAPING_CONFIG.bookmyshow.baseUrl}${link}` : undefined,
          organizer_name: 'BookMyShow',
          source_platform: 'bookmyshow',
          image_url: imageUrl,
        });
      }
    });
    */

    return events;
}

// Helper to parse various date formats from BookMyShow
function parseDateString(dateStr: string): string {
    // BookMyShow uses formats like "Sat, 15 Feb" or "15 Feb 2026"
    // This is a simplified parser
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            // Fallback: assume event is in the next 30 days
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

// ============================================================================
// PRODUCTION IMPLEMENTATION WITH PLAYWRIGHT
// ============================================================================

/*
import { chromium, Browser, Page } from 'playwright';

export async function scrapeBookMyShowEventsWithPlaywright(): Promise<RawEvent[]> {
  let browser: Browser | null = null;
  const events: RawEvent[] = [];

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: SCRAPING_CONFIG.userAgent,
    });

    for (const city of SCRAPING_CONFIG.bookmyshow.cities) {
      const page = await context.newPage();
      
      try {
        await page.goto(`${SCRAPING_CONFIG.bookmyshow.baseUrl}/${city}/activities`, {
          waitUntil: 'networkidle',
          timeout: SCRAPING_CONFIG.timeout,
        });

        // Wait for event cards to load
        await page.waitForSelector('.event-card', { timeout: 10000 });

        // Extract events
        const cityEvents = await page.evaluate(() => {
          const eventCards = document.querySelectorAll('.event-card');
          const results: any[] = [];

          eventCards.forEach(card => {
            const title = card.querySelector('.event-title')?.textContent?.trim();
            const description = card.querySelector('.event-description')?.textContent?.trim();
            const dateStr = card.querySelector('.event-date')?.textContent?.trim();
            const venue = card.querySelector('.venue-name')?.textContent?.trim();
            const link = card.querySelector('a')?.getAttribute('href');
            const imageUrl = card.querySelector('img')?.getAttribute('src');

            if (title && dateStr) {
              results.push({
                title,
                description,
                dateStr,
                venue,
                link,
                imageUrl,
              });
            }
          });

          return results;
        });

        // Convert to RawEvent format
        cityEvents.forEach(event => {
          events.push({
            title: event.title,
            description: event.description || '',
            start_datetime: parseDateString(event.dateStr),
            location: { city, venue: event.venue },
            is_online: false,
            registration_url: event.link ? `${SCRAPING_CONFIG.bookmyshow.baseUrl}${event.link}` : undefined,
            organizer_name: 'BookMyShow',
            source_platform: 'bookmyshow',
            image_url: event.imageUrl,
          });
        });

        await page.close();
      } catch (error) {
        console.error(`Error scraping ${city}:`, error);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, SCRAPING_CONFIG.bookmyshow.rateLimit));
    }

    await browser.close();
    return events;
  } catch (error) {
    console.error('BookMyShow scraping error:', error);
    if (browser) await browser.close();
    return events;
  }
}
*/
