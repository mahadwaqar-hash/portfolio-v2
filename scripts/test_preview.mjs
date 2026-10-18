import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  console.log('Title:', await page.title());
  console.log('Console Errors count:', errors.length);
  if (errors.length > 0) console.log('Errors:', errors);

  // Check iframes in showroom
  const iframes = await page.locator('#showroom iframe').count();
  console.log('Showroom iframes mounted:', iframes);

  // Check feedback button
  const feedbackBtn = page.locator('a[href="/feedback"]').first();
  const exists = (await feedbackBtn.count()) > 0;
  console.log('Feedback button exists:', exists);

  // Click feedback button
  await feedbackBtn.click();
  await page.waitForTimeout(500);
  console.log('URL after clicking feedback button:', page.url());
  const h1 = await page.locator('h1').first().textContent();
  console.log('Page heading on feedback page:', h1);

  await browser.close();
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
