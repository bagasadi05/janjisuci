import puppeteer from 'puppeteer-core';

async function diagnose() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));
  await page.goto('http://localhost:5173/?template=retro-editorial-birthday', { waitUntil: 'domcontentloaded' });

  // Open invitation
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const txt = await page.evaluate(el => el.textContent, b);
    if (txt && txt.includes('Buka Undangan')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  const nameEl = await page.$('form input[placeholder*="Nadia"]');
  const songEl = await page.$('form input[placeholder*="Penjaga Hati"]');
  const msgEl = await page.$('form textarea');

  await nameEl.click();
  await page.keyboard.type('Aurelia VIP Guest');

  await songEl.click();
  await page.keyboard.type('Nadhif - Penjaga Hati');

  await msgEl.click();
  await page.keyboard.type('Selamat 17 tahun Aurelia! Sukses selalu.');

  console.log('Submitting form via requestSubmit()...');
  const submitResult = await page.evaluate(() => {
    const form = document.querySelector('form');
    if (!form) return { error: 'No form found' };
    try {
      form.requestSubmit();
      return { success: true };
    } catch (e) {
      return { error: e.message };
    }
  });
  console.log('submitResult:', submitResult);

  await new Promise(r => setTimeout(r, 800));

  const afterSubmit = await page.evaluate(() => {
    const text = document.body.textContent || '';
    const wishesCount = document.querySelectorAll('section:nth-of-type(9) .relative.bg-white').length;
    return {
      hasGuest: text.includes('Aurelia VIP Guest'),
      hasSong: text.includes('Nadhif - Penjaga Hati'),
      wishesCount,
      toast: document.querySelector('[role="status"]')?.textContent || document.body.textContent.includes('Terima kasih')
    };
  });
  console.log('After submit result:', afterSubmit);

  await browser.close();
}

diagnose();
