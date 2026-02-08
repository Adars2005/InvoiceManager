const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  page.on('response', res => {
    if (res.status() >= 400) console.log('BROWSER RESPONSE ERROR:', res.status(), res.url());
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('PAGE TITLE:', await page.title());
    const html = await page.content();
    console.log('PAGE HTML LENGTH:', html.length);
    await page.screenshot({ path: 'frontend/screenshot.png', fullPage: true });
    console.log('Saved screenshot to frontend/screenshot.png');
  } catch (err) {
    console.log('NAVIGATE ERROR:', err.toString());
  }

  await browser.close();
})();
