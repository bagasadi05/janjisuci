import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';

async function runIndependentAudit() {
  console.log('====================================================');
  console.log('VICTORY AUDITOR: INDEPENDENT VERIFICATION SUITE');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const auditResults = {
    retro: {},
    emerald: {},
    passedAll: false
  };

  try {
    // =========================================================================
    // 1. AUDIT RETRO EDITORIAL BIRTHDAY (Sweet 17 Milestone)
    // =========================================================================
    console.log('>>> [1/2] Auditing retro-editorial-birthday template...');

    // 1.1 URL Greeting & Malformed Param Resilience
    {
      const page = await browser.newPage();
      let caughtErr = null;
      page.on('pageerror', err => { caughtErr = err.message; });
      await page.goto(`${BASE_URL}/?template=retro-editorial-birthday&to=VIP+Auditor+%26+Rekan+100%`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button', { timeout: 4000 });

      const greetingText = await page.evaluate(() => document.querySelector('h2')?.textContent?.trim() || '');
      auditResults.retro.urlGreetingPass = greetingText.includes('VIP Auditor & Rekan 100%') && !caughtErr;
      console.log(`  1.1 URL Param & Greeting: "${greetingText}" (Pass: ${auditResults.retro.urlGreetingPass})`);
      await page.close();
    }

    // 1.2 Viewport Responsiveness (375px mobile, 1280px desktop)
    {
      const page = await browser.newPage();
      
      // Desktop 1280px
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/?template=retro-editorial-birthday`, { waitUntil: 'domcontentloaded' });
      const showcaseDesktop = await page.evaluate(() => {
        const aside = document.querySelector('aside');
        return aside ? window.getComputedStyle(aside).display : 'none';
      });
      auditResults.retro.showcaseDesktopPass = showcaseDesktop === 'flex';

      // Mobile 375px
      await page.setViewport({ width: 375, height: 667 });
      await new Promise(r => setTimeout(r, 200));
      const mobileMetrics = await page.evaluate(() => {
        const aside = document.querySelector('aside');
        const asideDisplay = aside ? window.getComputedStyle(aside).display : 'none';
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        return { asideDisplay, overflow: docW - winW };
      });
      auditResults.retro.mobile375Pass = mobileMetrics.asideDisplay === 'none' && mobileMetrics.overflow <= 0;
      console.log(`  1.2 Responsiveness: Desktop Showcase=${showcaseDesktop}, Mobile Aside=${mobileMetrics.asideDisplay}, Overflow=${mobileMetrics.overflow}px`);
      await page.close();
    }

    // 1.3 Audio Unlocking on Gate Open
    {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}/?template=retro-editorial-birthday`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button', { timeout: 4000 });

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 700));

      const audioState = await page.evaluate(() => {
        const a = document.querySelector('audio');
        return a ? { found: true, paused: a.paused, src: a.src } : { found: false };
      });
      auditResults.retro.audioUnlocked = audioState.found && !audioState.paused;
      console.log(`  1.3 Audio Unlock: found=${audioState.found}, paused=${audioState.paused}`);
      await page.close();
    }

    // 1.4 Interactive RSVP Form with DJ Song Request & Wishes Wall
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1024, height: 768 });
      await page.goto(`${BASE_URL}/?template=retro-editorial-birthday`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button', { timeout: 4000 });

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 600));

      // Scroll to form
      await page.evaluate(() => {
        const form = document.querySelector('form');
        if (form) form.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 200));

      const nameInput = await page.$('form input[placeholder*="Nadia"]');
      const songInput = await page.$('form input[placeholder*="Penjaga Hati"]');
      const msgInput = await page.$('form textarea');

      if (nameInput && songInput && msgInput) {
        await nameInput.click();
        await page.keyboard.type('Auditor Retro VIP');

        await songInput.click();
        await page.keyboard.type('Taylor Swift - August (Live)');

        await msgInput.click();
        await page.keyboard.type('Selamat Sweet 17th Aurelia! Semoga selalu sukses.');

        await page.evaluate(() => {
          const form = document.querySelector('form');
          if (form) form.requestSubmit();
        });
        await new Promise(r => setTimeout(r, 800));
      }

      const bodyText = await page.evaluate(() => document.body.textContent || '');
      auditResults.retro.rsvpPass =
        bodyText.includes('Auditor Retro VIP') &&
        bodyText.includes('Taylor Swift - August') &&
        bodyText.includes('Selamat Sweet 17th Aurelia');
      console.log(`  1.4 RSVP & DJ Song Request Submission: Pass=${auditResults.retro.rsvpPass}`);
      await page.close();
    }

    // 1.5 Milestone Photo Lightbox Modal
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1024, height: 768 });
      await page.goto(`${BASE_URL}/?template=retro-editorial-birthday`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button', { timeout: 4000 });

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 600));

      // Click photo thumbnail
      await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const photo = imgs.find(img => img.src && img.src.includes('unsplash') && img.closest('[class*="cursor-pointer"]'));
        const card = photo ? photo.closest('[class*="cursor-pointer"]') : null;
        if (card) card.click();
      });
      await new Promise(r => setTimeout(r, 400));

      const lightboxOpened = await page.evaluate(() => {
        const closeBtn = document.querySelector('button[aria-label*="Tutup"]');
        return Boolean(closeBtn);
      });
      auditResults.retro.lightboxPass = lightboxOpened;
      console.log(`  1.5 Milestone Photo Lightbox: Opened=${lightboxOpened}`);
      await page.close();
    }

    // =========================================================================
    // 2. AUDIT EMERALD BOTANICAL AQIQAH (Islamic Botanical Aqiqah)
    // =========================================================================
    console.log('\n>>> [2/2] Auditing emerald-botanical-aqiqah template...');

    // 2.1 URL Greeting & Malformed Param Resilience
    {
      const page = await browser.newPage();
      let caughtErr = null;
      page.on('pageerror', err => { caughtErr = err.message; });
      await page.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah&to=Keluarga+Bpk.+Hendra+%26+Ibu+100%`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button', { timeout: 4000 });

      const greetingText = await page.evaluate(() => document.querySelector('h2')?.textContent?.trim() || '');
      auditResults.emerald.urlGreetingPass = greetingText.includes('Keluarga Bpk. Hendra & Ibu 100%') && !caughtErr;
      console.log(`  2.1 URL Param & Greeting: "${greetingText}" (Pass: ${auditResults.emerald.urlGreetingPass})`);
      await page.close();
    }

    // 2.2 Viewport Responsiveness (375px mobile, 1280px desktop)
    {
      const page = await browser.newPage();

      // Desktop 1280px
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah`, { waitUntil: 'domcontentloaded' });
      const showcaseDesktop = await page.evaluate(() => {
        const aside = document.querySelector('aside');
        return aside ? window.getComputedStyle(aside).display : 'none';
      });
      auditResults.emerald.showcaseDesktopPass = showcaseDesktop === 'flex';

      // Mobile 375px
      await page.setViewport({ width: 375, height: 667 });
      await new Promise(r => setTimeout(r, 200));
      const mobileMetrics = await page.evaluate(() => {
        const aside = document.querySelector('aside');
        const asideDisplay = aside ? window.getComputedStyle(aside).display : 'none';
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        return { asideDisplay, overflow: docW - winW };
      });
      auditResults.emerald.mobile375Pass = mobileMetrics.asideDisplay === 'none' && mobileMetrics.overflow <= 0;
      console.log(`  2.2 Responsiveness: Desktop Showcase=${showcaseDesktop}, Mobile Aside=${mobileMetrics.asideDisplay}, Overflow=${mobileMetrics.overflow}px`);
      await page.close();
    }

    // 2.3 Audio Unlocking on Gate Open
    {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button', { timeout: 4000 });

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 700));

      const audioState = await page.evaluate(() => {
        const a = document.querySelector('audio');
        return a ? { found: true, paused: a.paused, src: a.src } : { found: false };
      });
      auditResults.emerald.audioUnlocked = audioState.found && !audioState.paused;
      console.log(`  2.3 Audio Unlock: found=${audioState.found}, paused=${audioState.paused}`);
      await page.close();
    }

    // 2.4 Interactive RSVP Form with Virtual Attendance & Doa Restu
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1024, height: 768 });
      await page.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button', { timeout: 4000 });

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 600));

      // Scroll to form
      await page.evaluate(() => {
        const form = document.querySelector('form');
        if (form) form.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 200));

      const nameInput = await page.$('form input[placeholder*="Ahmad Dahlan"]');
      const msgInput = await page.$('form textarea');

      // Click Virtual attendance option
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('form button'));
        const vBtn = btns.find(b => b.textContent && b.textContent.includes('Virtual'));
        if (vBtn) vBtn.click();
      });
      await new Promise(r => setTimeout(r, 100));

      if (nameInput && msgInput) {
        await nameInput.click();
        await page.keyboard.type('Ustadz Farhan Al-Mubarak');

        await msgInput.click();
        await page.keyboard.type('Barakallahu fiik ananda Rayyan, semoga tumbuh jadi anak soleh.');

        await page.evaluate(() => {
          const form = document.querySelector('form');
          if (form) form.requestSubmit();
        });
        await new Promise(r => setTimeout(r, 800));
      }

      const bodyText = await page.evaluate(() => document.body.textContent || '');
      auditResults.emerald.rsvpPass =
        bodyText.includes('Ustadz Farhan Al-Mubarak') &&
        bodyText.includes('Virtual') &&
        bodyText.includes('Barakallahu fiik ananda Rayyan');
      console.log(`  2.4 RSVP Submission (Virtual Attendance): Pass=${auditResults.emerald.rsvpPass}`);
      await page.close();
    }

    // 2.5 Modals: Live Streaming & Escape Dismissal
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1024, height: 768 });
      await page.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button', { timeout: 4000 });

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 600));

      // Open Live Streaming modal
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const streamBtn = btns.find(b => b.textContent && b.textContent.includes('Live Streaming'));
        if (streamBtn) streamBtn.click();
      });
      await new Promise(r => setTimeout(r, 400));

      const modalOpened = await page.evaluate(() => Boolean(document.querySelector('[role="dialog"]')));
      console.log(`  2.5a Live Streaming Modal Opened: ${modalOpened}`);

      // Press Escape
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 400));

      const modalClosed = await page.evaluate(() => !document.querySelector('[role="dialog"]'));
      console.log(`  2.5b Live Streaming Modal Closed on Escape: ${modalClosed}`);

      auditResults.emerald.modalPass = modalOpened && modalClosed;
      await page.close();
    }

    // -------------------------------------------------------------------------
    // SUMMARY ASSESSMENT
    // -------------------------------------------------------------------------
    auditResults.passedAll =
      auditResults.retro.urlGreetingPass &&
      auditResults.retro.showcaseDesktopPass &&
      auditResults.retro.mobile375Pass &&
      auditResults.retro.audioUnlocked &&
      auditResults.retro.rsvpPass &&
      auditResults.retro.lightboxPass &&
      auditResults.emerald.urlGreetingPass &&
      auditResults.emerald.showcaseDesktopPass &&
      auditResults.emerald.mobile375Pass &&
      auditResults.emerald.audioUnlocked &&
      auditResults.emerald.rsvpPass &&
      auditResults.emerald.modalPass;

    console.log('\n====================================================');
    console.log(`FINAL INDEPENDENT AUDIT VERDICT: ${auditResults.passedAll ? 'PASS ✅' : 'FAIL ❌'}`);
    console.log('====================================================');
    console.log(JSON.stringify(auditResults, null, 2));

  } finally {
    await browser.close();
  }

  process.exit(auditResults.passedAll ? 0 : 1);
}

runIndependentAudit().catch(err => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
