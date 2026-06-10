import puppeteer from 'puppeteer';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173/#';

const pages = [
  { path: '/', name: '01_Home' },
  { path: '/about', name: '02_About' },
  { path: '/medical-facilities', name: '03_MedicalFacilities' },
  { path: '/gallery', name: '04_Gallery' },
  { path: '/csr-activities', name: '05_CSRActivities' },
  { path: '/admin/login', name: '06_AdminLogin' },
];

(async () => {
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to a standard desktop size
  await page.setViewport({ width: 1440, height: 900 });

  for (const { path, name } of pages) {
    console.log(`Navigating to ${path}...`);
    try {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle0', timeout: 10000 });
      // Small delay to ensure all framer-motion animations have settled
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fileName = `screenshots/${name}.png`;
      await page.screenshot({ path: fileName, fullPage: true });
      console.log(`Screenshot saved to ${fileName}`);
    } catch (e) {
      console.log(`Failed to screenshot ${path}:`, e.message);
    }
  }

  await browser.close();
  console.log('Finished capturing screenshots!');
})();
