import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const RECORDINGS_DIR = path.resolve('recordings');
if (!fs.existsSync(RECORDINGS_DIR)) {
  fs.mkdirSync(RECORDINGS_DIR);
}

const CHROME_PATH = 'C:\\Users\\Mahad\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe';

const sites = [
  {
    name: '01_portfolio_pc',
    url: 'https://mahad-works.vercel.app/',
    viewport: { width: 1920, height: 1080 },
    steps: async (page) => {
      await page.waitForTimeout(3000); // let preloader / animations finish
      
      // Scroll to Hero/About
      await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'smooth' }));
      await page.waitForTimeout(2500);
      
      // Scroll into Showroom start
      await page.evaluate(() => {
        const sr = document.getElementById('showroom');
        if (sr) window.scrollTo({ top: sr.offsetTop, behavior: 'smooth' });
      });
      await page.waitForTimeout(2000);
      
      // Slowly scroll down to trigger horizontal motion
      for (let i = 0; i < 4; i++) {
        await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
        await page.waitForTimeout(1000);
      }
      
      await page.waitForTimeout(2000);
    }
  }
];

async function run() {
  console.log('🎬 Starting Cinematic Asset Capture...');
  
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true
  });

  for (const site of sites) {
    console.log(`\n🎥 Recording: ${site.name}`);
    const context = await browser.newContext({
      viewport: site.viewport,
      recordVideo: {
        dir: RECORDINGS_DIR,
        size: site.viewport
      },
      deviceScaleFactor: 1
    });

    const page = await context.newPage();
    try {
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await site.steps(page);
    } catch (e) {
      console.log(`Error on ${site.name}:`, e.message);
    }
    
    // CRITICAL: Close page first, then save video, then close context
    await page.close();
    
    const videoPath = await page.video().path();
    const finalPath = path.join(RECORDINGS_DIR, `${site.name}.webm`);
    
    fs.renameSync(videoPath, finalPath);
    console.log(`✅ Saved raw footage: ${finalPath}`);
    
    await context.close();
  }

  await browser.close();
  console.log('\n✨ All camera recordings complete!');
}

run().catch(console.error);
