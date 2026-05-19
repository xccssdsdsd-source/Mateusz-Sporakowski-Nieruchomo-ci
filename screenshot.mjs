import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const url = process.argv[2] || 'http://localhost:3000'
const dir = path.join(__dirname, 'temporary screenshots')
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const files = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-'))
const n = files.length + 1

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)
const out = path.join(dir, `screenshot-${n}.png`)
await page.screenshot({ path: out, fullPage: false })
await browser.close()
console.log(out)
