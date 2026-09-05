import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function createServer() {
  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    let filePath = path.join(process.cwd(), 'dist', reqPath === '/' ? 'index.html' : reqPath);

    if (!fs.existsSync(filePath)) {
      if (reqPath.startsWith('/maison-stone')) {
        filePath = path.join(process.cwd(), 'dist', 'index.html');
      } else if (reqPath.startsWith('/vanguard')) {
        filePath = path.join(process.cwd(), 'dist', 'vanguard', 'index.html');
      } else if (reqPath.startsWith('/aura')) {
        filePath = path.join(process.cwd(), 'dist', 'aura', 'index.html');
      } else if (reqPath.startsWith('/zingwrap')) {
        filePath = path.join(process.cwd(), 'dist', 'zingwrap', 'index.html');
      } else {
        filePath = path.join(process.cwd(), 'dist', 'index.html');
      }
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
}

// Rock-solid step-based smooth scrolling that NEVER hangs
async function smoothScroll(page, totalY, durationMs) {
  const steps = 30;
  const stepDelay = Math.max(durationMs / steps, 16);
  const stepY = totalY / steps;
  for (let i = 0; i < steps; i++) {
    await page.evaluate((y) => window.scrollBy({ top: y, behavior: 'instant' }), stepY);
    await page.waitForTimeout(stepDelay);
  }
}

async function smoothScrollHorizontal(page, selector, totalX, durationMs) {
  const steps = 25;
  const stepDelay = Math.max(durationMs / steps, 16);
  const stepX = totalX / steps;
  for (let i = 0; i < steps; i++) {
    await page.evaluate(({ sel, x }) => {
      const el = document.querySelector(sel);
      if (el) el.scrollBy({ left: x, behavior: 'instant' });
    }, { sel: selector, x: stepX });
    await page.waitForTimeout(stepDelay);
  }
}

async function recordVideo(browser, port, options) {
  const { name, url, script, outputFile } = options;
  console.log(`\n▶ Recording: ${name}...`);

  const recordingsDir = path.join(process.cwd(), 'recordings');
  fs.mkdirSync(recordingsDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: recordingsDir,
      size: { width: 1080, height: 1920 }
    }
  });

  const page = await context.newPage();
  await page.goto(`http://localhost:${port}${url}`, { waitUntil: 'networkidle' });

  await script(page);

  const video = page.video();
  await page.close();

  const finalPath = path.join(recordingsDir, outputFile);
  await video.saveAs(finalPath);
  await context.close();

  const stats = fs.statSync(finalPath);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`  ✓ Successfully Saved: ${outputFile} (${sizeMb} MB)`);
}

async function run() {
  const PORT = 4176;
  const server = createServer();

  server.listen(PORT, async () => {
    console.log(`Server active on http://localhost:${PORT}`);
    const browser = await chromium.launch({
      headless: true,
      executablePath: 'C:\\Users\\Mahad\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      // 1. Portfolio Main Teaser (15s)
      await recordVideo(browser, PORT, {
        name: '[1/5] Main Portfolio 15s High-Energy Teaser',
        url: '/',
        outputFile: '01_portfolio_main_teaser_9x16.webm',
        script: async (page) => {
          console.log('  -> Glitch Preloader at 67%...');
          await page.waitForTimeout(4600);

          console.log('  -> Hero Reveal & Subtitle Decoding...');
          await smoothScroll(page, 280, 1000);
          await page.waitForTimeout(1600);

          console.log('  -> Manifesto Illuminated Scrub...');
          await smoothScroll(page, 650, 1400);
          await page.waitForTimeout(1800);

          console.log('  -> Terminal Telemetry Typing...');
          await smoothScroll(page, 750, 1200);
          await page.waitForTimeout(2000);

          console.log('  -> Live Showroom Swipe...');
          await smoothScroll(page, 700, 1000);
          await page.waitForTimeout(600);
          await smoothScrollHorizontal(page, '#showroom div.overflow-x-auto', 600, 1500);
          await page.waitForTimeout(1400);

          console.log('  -> Contact Nexus Glowing Orb...');
          await smoothScroll(page, 800, 1000);
          await page.waitForTimeout(1400);
        }
      });

      // 2. Vanguard & Partners
      await recordVideo(browser, PORT, {
        name: '[2/5] Vanguard & Partners Corporate Law Showroom',
        url: '/vanguard/index.html',
        outputFile: '02_vanguard_partners_9x16.webm',
        script: async (page) => {
          await page.waitForTimeout(1200);
          console.log('  -> Gold & Obsidian Luxury Hero...');
          await smoothScroll(page, 400, 1400);
          await page.waitForTimeout(1600);

          console.log('  -> Corporate Practice Areas...');
          await smoothScroll(page, 750, 1800);
          await page.waitForTimeout(2000);

          console.log('  -> M&A Credentials & High-Trust Metrics...');
          await smoothScroll(page, 750, 1800);
          await page.waitForTimeout(2000);

          console.log('  -> Retainer Consultation Nexus...');
          await smoothScroll(page, 800, 1400);
          await page.waitForTimeout(1800);
        }
      });

      // 3. Aura Cosmetic Dentistry
      await recordVideo(browser, PORT, {
        name: '[3/5] Aura Cosmetic Dentistry Zen Spa Showroom',
        url: '/aura/index.html',
        outputFile: '03_aura_dentistry_9x16.webm',
        script: async (page) => {
          await page.waitForTimeout(1200);
          console.log('  -> Zen Aesthetic Typography & Palette...');
          await smoothScroll(page, 450, 1400);
          await page.waitForTimeout(1600);

          console.log('  -> Porcelain Studio & Cosmetic Treatments...');
          await smoothScroll(page, 750, 1800);
          await page.waitForTimeout(2000);

          console.log('  -> Private Surgical Suites & Philosophy...');
          await smoothScroll(page, 750, 1800);
          await page.waitForTimeout(2000);

          console.log('  -> VIP Consultation Booking Suite...');
          await smoothScroll(page, 800, 1400);
          await page.waitForTimeout(1800);
        }
      });

      // 4. Zing & Wrap Fast Food
      await recordVideo(browser, PORT, {
        name: '[4/5] Zing & Wrap Fast-Food & WhatsApp Commerce',
        url: '/zingwrap/index.html',
        outputFile: '04_zing_wrap_9x16.webm',
        script: async (page) => {
          await page.waitForTimeout(1200);
          console.log('  -> Sizzling Pastel Pop Hero...');
          await smoothScroll(page, 380, 1400);
          await page.waitForTimeout(1600);

          console.log('  -> Interactive Loaded Menu...');
          await smoothScroll(page, 550, 1600);
          await page.waitForTimeout(1600);

          console.log('  -> Simulating 1-Tap Cart Add...');
          const addBtn = await page.$('button:has-text("Add"), button:has-text("Order"), button:has-text("+")');
          if (addBtn) {
            await addBtn.click();
            await page.waitForTimeout(1200);
          }

          console.log('  -> WhatsApp 1-Click Direct Order Checkout...');
          await smoothScroll(page, 850, 1600);
          await page.waitForTimeout(2200);
        }
      });

      // 5. Maison & Stone Architecture
      await recordVideo(browser, PORT, {
        name: '[5/5] Maison & Stone Haute Couture Architecture',
        url: '/maison-stone',
        outputFile: '05_maison_stone_9x16.webm',
        script: async (page) => {
          await page.waitForTimeout(1500);
          console.log('  -> Architectural Bronze Hero Parallax...');
          await smoothScroll(page, 450, 1400);
          await page.waitForTimeout(1600);

          console.log('  -> Architectural Vision & Spatial Philosophy...');
          await smoothScroll(page, 700, 1600);
          await page.waitForTimeout(1800);

          console.log('  -> Selected Estates Horizontal Showcase...');
          await smoothScroll(page, 750, 1400);
          await page.waitForTimeout(600);
          await smoothScrollHorizontal(page, 'div.snap-x', 500, 1600);
          await page.waitForTimeout(1800);

          console.log('  -> Private Commission Inquiry...');
          await smoothScroll(page, 900, 1600);
          await page.waitForTimeout(2000);
        }
      });

      console.log('\n======================================================');
      console.log('✨ ALL 5 SHORT-FORM VIDEOS RECORDED IN CRISP 1080x1920!');
      console.log('======================================================');
    } catch (err) {
      console.error('Recording error:', err);
    } finally {
      await browser.close();
      server.close();
    }
  });
}

run();
