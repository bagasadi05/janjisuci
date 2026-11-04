import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';

async function testInteractions() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const results = {};

  try {
    // 1. Retro Editorial Birthday RSVP & Copy
    console.log('Testing Retro Editorial Birthday RSVP...');
    const pageRetro = await browser.newPage();
    await pageRetro.setViewport({ width: 1024, height: 768 });
    await pageRetro.goto(`${BASE_URL}/?template=retro-editorial-birthday`, { waitUntil: 'domcontentloaded' });
    await pageRetro.waitForSelector('button', { timeout: 3000 });

    // Open invitation
    const buttonsRetro = await pageRetro.$$('button');
    for (const b of buttonsRetro) {
      const txt = await pageRetro.evaluate(el => el.textContent, b);
      if (txt && txt.includes('Buka Undangan')) {
        await b.click();
        await new Promise(r => setTimeout(r, 600));
        break;
      }
    }

    // Scroll to RSVP form
    await pageRetro.evaluate(() => {
      const rsvp = document.querySelector('form');
      if (rsvp) rsvp.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 300));

    // Type into inputs
    const nameInputRetro = await pageRetro.$('form input[type="text"]');
    if (nameInputRetro) {
      await nameInputRetro.type('Challenger Aurelia Fan');
    }

    const songInputRetro = await pageRetro.$('input[placeholder*="Penjaga Hati"]');
    if (songInputRetro) {
      await songInputRetro.type('Taylor Swift - 22 (Special Version)');
    }

    const textareaRetro = await pageRetro.$('form textarea');
    if (textareaRetro) {
      await textareaRetro.type('Happy Sweet 17th Birthday Aurelia! Hope all your dreams come true.');
    }

    const submitBtnRetro = await pageRetro.$('form button[type="submit"]');
    if (submitBtnRetro) {
      await submitBtnRetro.click();
      await new Promise(r => setTimeout(r, 600));
    }

    // Check wishes wall
    const bodyTextRetro = await pageRetro.evaluate(() => document.body.textContent || '');
    results.retroRsvp = bodyTextRetro.includes('Challenger Aurelia Fan') && bodyTextRetro.includes('Taylor Swift - 22');
    console.log(`Retro RSVP with DJ Song Request: ${results.retroRsvp ? 'PASS' : 'FAIL'}`);
    await pageRetro.close();

    // 2. Emerald Botanical Aqiqah RSVP & Copy & Modals
    console.log('\nTesting Emerald Botanical Aqiqah RSVP...');
    const pageEmerald = await browser.newPage();
    await pageEmerald.setViewport({ width: 1024, height: 768 });
    await pageEmerald.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah`, { waitUntil: 'domcontentloaded' });
    await pageEmerald.waitForSelector('button', { timeout: 3000 });

    // Open invitation
    const buttonsEmerald = await pageEmerald.$$('button');
    for (const b of buttonsEmerald) {
      const txt = await pageEmerald.evaluate(el => el.textContent, b);
      if (txt && txt.includes('Buka Undangan')) {
        await b.click();
        await new Promise(r => setTimeout(r, 600));
        break;
      }
    }

    // Scroll to RSVP form
    await pageEmerald.evaluate(() => {
      const rsvp = document.querySelector('form');
      if (rsvp) rsvp.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 300));

    // Type into name input
    const nameInputEmerald = await pageEmerald.$('form input[placeholder*="Ahmad Dahlan"]');
    if (nameInputEmerald) {
      await nameInputEmerald.type('K.H. Ahmad Dahlan & Rombongan');
    }

    // Click Virtual status
    const virtualBtn = await pageEmerald.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('form button'));
      return btns.find(b => b.textContent.includes('Virtual'));
    });
    if (virtualBtn && virtualBtn.click) {
      await virtualBtn.click();
      await new Promise(r => setTimeout(r, 100));
    }

    const textareaEmerald = await pageEmerald.$('form textarea');
    if (textareaEmerald) {
      await textareaEmerald.type('Barakallahu fiik untuk ananda Muhammad Rayyan, semoga menjadi anak soleh kebanggaan orang tua.');
    }

    const submitBtnEmerald = await pageEmerald.$('form button[type="submit"]');
    if (submitBtnEmerald) {
      await submitBtnEmerald.click();
      await new Promise(r => setTimeout(r, 600));
    }

    // Check wishes wall
    const bodyTextEmerald = await pageEmerald.evaluate(() => document.body.textContent || '');
    results.emeraldRsvp = bodyTextEmerald.includes('K.H. Ahmad Dahlan') && bodyTextEmerald.includes('Virtual');
    console.log(`Emerald RSVP Submission: ${results.emeraldRsvp ? 'PASS' : 'FAIL'}`);

    // Check QRIS modal
    const qrisBtn = await pageEmerald.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.textContent.includes('QRIS'));
    });
    if (qrisBtn && qrisBtn.click) {
      await qrisBtn.click();
      await new Promise(r => setTimeout(r, 400));
      const hasQrisModal = await pageEmerald.evaluate(() => {
        const modal = document.querySelector('.fixed.inset-0.z-50');
        return Boolean(modal);
      });
      results.emeraldQrisModal = hasQrisModal;
      console.log(`Emerald QRIS Modal: ${hasQrisModal ? 'PASS' : 'FAIL'}`);
    }

    await pageEmerald.close();

  } finally {
    await browser.close();
  }

  console.log('\nInteraction Test Summary:');
  console.log(JSON.stringify(results, null, 2));
}

testInteractions().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
