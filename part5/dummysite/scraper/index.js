import scrape from 'website-scraper'
import { v4 as uuidv4 } from 'uuid'

const website_url = process.env.WEBSITE_URL || 'https://example.com/'

const options = {
  urls: [website_url],
  directory: `/usr/src/app/sites/${uuidv4()}`
}

// with async/await
const result = await scrape(options)