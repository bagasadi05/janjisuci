import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';

const results = {
  urlMalformedPercent: [],
  urlWhitespaceFallback: [],
  clipboardErrorHandling: [],
  unbrokenStringBlowout: [],
  modalDismissal: []
};

function recordResult(category, testName, passed, details = '') {
  const entry = { testName, passed, details };
  results[category].push(entry);
  const mark = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`  [${mark}] ${testName} ${details ? '— ' + details : ''}`);
}

async function runEmpiricalChallenge() {
  console.log('================================================================');
  console.log('CHALLENGER FINAL: COMPREHENSIVE EMPIRICAL VERIFICATION SUITE');
  console.log('Target: JanjiSuci.id (retro-editorial-birthday & emerald-botanical-aqiqah)');
  console.log('Browser: Google Chrome Headless');
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  try {
    // ========================================================================
    // SUITE 1: MALFORMED PERCENT URL PARAMETERS (ErrorBoundary Prevention)
    // ========================================================================
    console.log('--- SUITE 1: Malformed Percent URL Parameters ---');
    const malformedCases = [
      { slug: 'retro-editorial-birthday', query: 'to=VIP%20Diskon%20100%', expectedName: 'VIP Diskon 100%' },
      { slug: 'retro-editorial-birthday', query: 'to=Diskon%', expectedName: 'Diskon%' },
      { slug: 'retro-editorial-birthday', query: 'to=%2', expectedName: '%2' },
      { slug: 'retro-editorial-birthday', query: 'to=%ZZ', expectedName: '%ZZ' },
      { slug: 'retro-editorial-birthday', query: 'to=Promo%20100%%20Spesial', expectedName: 'Promo 100% Spesial' },
      { slug: 'emerald-botanical-aqiqah', query: 'to=VIP%20Diskon%20100%', expectedName: 'VIP Diskon 100%' },
      { slug: 'emerald-botanical-aqiqah', query: 'to=Diskon%', expectedName: 'Diskon%' },
      { slug: 'emerald-botanical-aqiqah', query: 'to=%2', expectedName: '%2' },
      { slug: 'emerald-botanical-aqiqah', query: 'to=%ZZ', expectedName: '%ZZ' },
      { slug: 'emerald-botanical-aqiqah', query: 'to=Promo%20100%%20Spesial', expectedName: 'Promo 100% Spesial' }
    ];

    for (const c of malformedCases) {
      const page = await browser.newPage();
      let caughtPageError = null;
      page.on('pageerror', err => { caughtPageError = err.message; });

      await page.goto(`${BASE_URL}/?template=${c.slug}&${c.query}`, { waitUntil: 'domcontentloaded' });
      
      // Wait for React useEffect URL param state update
      await page.waitForFunction((expected) => {
        const body = document.body.textContent || '';
        return body.includes(expected) || body.includes('Terjadi Kesalahan Sementara');
      }, { timeout: 3000 }, c.expectedName);

      const pageState = await page.evaluate(() => {
        const bodyText = document.body.textContent || '';
        const isErrorBoundary = bodyText.includes('Terjadi Kesalahan Sementara') ||
                                bodyText.includes('ErrorBoundary');
        const h2 = document.querySelector('h2')?.textContent?.trim() || '';
        return { isErrorBoundary, h2, bodyText };
      });

      const passed = !pageState.isErrorBoundary &&
                     !caughtPageError &&
                     (pageState.h2 === c.expectedName || pageState.bodyText.includes(c.expectedName));

      recordResult(
        'urlMalformedPercent',
        `[${c.slug}] ?${c.query}`,
        passed,
        caughtPageError ? `Error: ${caughtPageError}` : (pageState.isErrorBoundary ? 'CRASHED to ErrorBoundary' : `Rendered: "${pageState.h2}"`)
      );
      await page.close();
    }

    // ========================================================================
    // SUITE 2: WHITESPACE URL PARAMETERS (Fallback to Default Greeting)
    // ========================================================================
    console.log('\n--- SUITE 2: Whitespace URL Parameters Fallback ---');
    const whitespaceCases = [
      { slug: 'retro-editorial-birthday', query: 'to=+++', expected: 'Tamu Spesial' },
      { slug: 'retro-editorial-birthday', query: 'to=%20%20%20', expected: 'Tamu Spesial' },
      { slug: 'retro-editorial-birthday', query: 'to=+%20+%20+', expected: 'Tamu Spesial' },
      { slug: 'emerald-botanical-aqiqah', query: 'to=+++', expected: 'Tamu Undangan' },
      { slug: 'emerald-botanical-aqiqah', query: 'to=%20%20%20', expected: 'Tamu Undangan' },
      { slug: 'emerald-botanical-aqiqah', query: 'to=+%20+%20+', expected: 'Tamu Undangan' }
    ];

    for (const c of whitespaceCases) {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}/?template=${c.slug}&${c.query}`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 500));

      const coverGreeting = await page.evaluate(() => {
        const h2 = document.querySelector('h2');
        return h2 ? h2.textContent.trim() : '';
      });

      // Open invitation and verify main template greeting
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 700));

      const mainBody = await page.evaluate(() => document.body.textContent || '');
      const passed = coverGreeting === c.expected && mainBody.includes(c.expected);

      recordResult(
        'urlWhitespaceFallback',
        `[${c.slug}] ?${c.query}`,
        passed,
        `Cover: "${coverGreeting}", Expected: "${c.expected}"`
      );
      await page.close();
    }

    // ========================================================================
    // SUITE 3: CLIPBOARD COPY REJECTION & FALLBACK RESILIENCE
    // ========================================================================
    console.log('\n--- SUITE 3: Clipboard Copy API Defensive Handling ---');

    // 3.1: Retro Birthday - Permission Denied
    {
      const page = await browser.newPage();
      let uncaughtRejection = null;
      page.on('pageerror', err => { uncaughtRejection = err.message; });

      await page.goto(`${BASE_URL}/?template=retro-editorial-birthday`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 800));

      // Mock navigator.clipboard.writeText to reject
      await page.evaluate(() => {
        window.navigator.clipboard.writeText = () => Promise.reject(new Error('Simulated Permission Denied'));
      });

      const copyClicked = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const copyBtn = btns.find(b => b.textContent && (b.textContent.includes('Salin No. Rekening') || b.textContent.includes('Salin')));
        if (copyBtn) {
          copyBtn.click();
          return true;
        }
        return false;
      });

      await new Promise(r => setTimeout(r, 500));
      const toastText = await page.evaluate(() => document.body.textContent || '');
      const hasFailureToast = toastText.includes('Gagal menyalin');
      const passed = copyClicked && !uncaughtRejection && hasFailureToast;

      recordResult(
        'clipboardErrorHandling',
        'Retro Birthday - clipboard.writeText rejection caught without unhandled rejection',
        passed,
        `uncaughtRejection=${uncaughtRejection}, failureToast=${hasFailureToast}`
      );
      await page.close();
    }

    // 3.2: Retro Birthday - navigator.clipboard undefined
    {
      const page = await browser.newPage();
      let uncaughtError = null;
      page.on('pageerror', err => { uncaughtError = err.message; });

      await page.goto(`${BASE_URL}/?template=retro-editorial-birthday`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 800));

      await page.evaluate(() => {
        Object.defineProperty(navigator, 'clipboard', {
          value: undefined,
          configurable: true,
          writable: true
        });
      });

      const copyClicked = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const copyBtn = btns.find(b => b.textContent && (b.textContent.includes('Salin No. Rekening') || b.textContent.includes('Salin')));
        if (copyBtn) {
          copyBtn.click();
          return true;
        }
        return false;
      });

      await new Promise(r => setTimeout(r, 500));
      const bodyText = await page.evaluate(() => document.body.textContent || '');
      const hasUnsupportedToast = bodyText.includes('Fitur salin tidak didukung');
      const passed = copyClicked && !uncaughtError && hasUnsupportedToast;

      recordResult(
        'clipboardErrorHandling',
        'Retro Birthday - navigator.clipboard undefined handled with fallback toast',
        passed,
        `uncaughtError=${uncaughtError}, unsupportedToast=${hasUnsupportedToast}`
      );
      await page.close();
    }

    // 3.3: Emerald Aqiqah - Permission Denied
    {
      const page = await browser.newPage();
      let uncaughtRejection = null;
      page.on('pageerror', err => { uncaughtRejection = err.message; });

      await page.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 800));

      await page.evaluate(() => {
        window.navigator.clipboard.writeText = () => Promise.reject(new Error('Simulated Permission Denied'));
      });

      const copyClicked = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const copyBtn = btns.find(b => b.textContent && b.textContent.includes('Salin'));
        if (copyBtn) {
          copyBtn.click();
          return true;
        }
        return false;
      });

      await new Promise(r => setTimeout(r, 500));
      const bodyText = await page.evaluate(() => document.body.textContent || '');
      const hasFailureToast = bodyText.includes('Gagal menyalin');
      const passed = copyClicked && !uncaughtRejection && hasFailureToast;

      recordResult(
        'clipboardErrorHandling',
        'Emerald Aqiqah - clipboard.writeText rejection caught without unhandled rejection',
        passed,
        `uncaughtRejection=${uncaughtRejection}, failureToast=${hasFailureToast}`
      );
      await page.close();
    }

    // 3.4: Emerald Aqiqah - navigator.clipboard undefined
    {
      const page = await browser.newPage();
      let uncaughtError = null;
      page.on('pageerror', err => { uncaughtError = err.message; });

      await page.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 800));

      await page.evaluate(() => {
        Object.defineProperty(navigator, 'clipboard', {
          value: undefined,
          configurable: true,
          writable: true
        });
      });

      const copyClicked = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const copyBtn = btns.find(b => b.textContent && b.textContent.includes('Salin'));
        if (copyBtn) {
          copyBtn.click();
          return true;
        }
        return false;
      });

      await new Promise(r => setTimeout(r, 500));
      const bodyText = await page.evaluate(() => document.body.textContent || '');
      const hasUnsupportedToast = bodyText.includes('Fitur salin tidak didukung');
      const passed = copyClicked && !uncaughtError && hasUnsupportedToast;

      recordResult(
        'clipboardErrorHandling',
        'Emerald Aqiqah - navigator.clipboard undefined handled with fallback toast',
        passed,
        `uncaughtError=${uncaughtError}, unsupportedToast=${hasUnsupportedToast}`
      );
      await page.close();
    }

    // ========================================================================
    // SUITE 4: UNBROKEN CONTINUOUS STRING BLOWOUT (break-words verification)
    // ========================================================================
    console.log('\n--- SUITE 4: Wish Cards Unbroken String Blowout Prevention ---');

    // 4.1: Retro Birthday
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 667 });
      await page.goto(`${BASE_URL}/?template=retro-editorial-birthday`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 800));

      const unbrokenName = 'Unbroken_Guest_' + 'X'.repeat(80);
      const unbrokenMsg = 'Unbroken_Wish_' + 'Z'.repeat(120);

      const nameInput = await page.$('form input[placeholder*="Nadia"]');
      const songInput = await page.$('form input[placeholder*="Penjaga Hati"]');
      const msgInput = await page.$('form textarea');

      await nameInput.type(unbrokenName);
      await songInput.type('Taylor Swift - 22');
      await msgInput.type(unbrokenMsg);

      await page.evaluate(() => {
        const form = document.querySelector('form');
        if (form) form.requestSubmit();
      });
      await new Promise(r => setTimeout(r, 700));

      const geo = await page.evaluate((substr) => {
        const cards = Array.from(document.querySelectorAll('section:nth-of-type(9) .relative.bg-white'));
        const c = cards.find(card => card.textContent.includes(substr));
        if (!c) return { found: false };

        const cW = c.clientWidth;
        const sW = c.scrollWidth;
        const p = c.querySelector('p');
        const pCW = p?.clientWidth || 0;
        const pSW = p?.scrollWidth || 0;
        const bodySW = document.body.scrollWidth;
        const winIW = window.innerWidth;

        return {
          found: true,
          cW, sW, pCW, pSW, bodySW, winIW,
          cardBlowout: sW - cW,
          paragraphBlowout: pSW - pCW,
          pageBlowout: bodySW - winIW
        };
      }, 'Unbroken_Guest_');

      const passed = geo.found && geo.cardBlowout <= 2 && geo.paragraphBlowout <= 2 && geo.pageBlowout <= 1;
      recordResult(
        'unbrokenStringBlowout',
        'Retro Birthday - 80+ char unbroken name & message wrap without blowout (375px)',
        passed,
        `cardScrollW=${geo.sW}, cardClientW=${geo.cW}, cardBlowout=${geo.cardBlowout}px, pageBlowout=${geo.pageBlowout}px`
      );
      await page.close();
    }

    // 4.2: Emerald Aqiqah
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 667 });
      await page.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 800));

      const unbrokenName = 'Unbroken_Guest_' + 'X'.repeat(80);
      const unbrokenMsg = 'Unbroken_Doa_' + 'Z'.repeat(120);

      const nameInputEm = await page.$('form input[placeholder*="Ahmad Dahlan"]');
      const msgInputEm = await page.$('form textarea');

      await nameInputEm.type(unbrokenName);
      await msgInputEm.type(unbrokenMsg);

      await page.evaluate(() => {
        const form = document.querySelector('form');
        if (form) form.requestSubmit();
      });
      await new Promise(r => setTimeout(r, 700));

      const geo = await page.evaluate((substr) => {
        const wishesDiv = document.querySelector('.space-y-3.max-h-96');
        const cards = Array.from(wishesDiv ? wishesDiv.children : []);
        const c = cards.find(card => card.textContent.includes(substr));
        if (!c) return { found: false };

        const cW = c.clientWidth;
        const sW = c.scrollWidth;
        const p = c.querySelector('p');
        const pCW = p?.clientWidth || 0;
        const pSW = p?.scrollWidth || 0;
        const bodySW = document.body.scrollWidth;
        const winIW = window.innerWidth;

        return {
          found: true,
          cW, sW, pCW, pSW, bodySW, winIW,
          cardBlowout: sW - cW,
          paragraphBlowout: pSW - pCW,
          pageBlowout: bodySW - winIW
        };
      }, 'Unbroken_Guest_');

      const passed = geo.found && geo.cardBlowout <= 2 && geo.paragraphBlowout <= 2 && geo.pageBlowout <= 1;
      recordResult(
        'unbrokenStringBlowout',
        'Emerald Aqiqah - 80+ char unbroken name & message wrap without blowout (375px)',
        passed,
        `cardScrollW=${geo.sW}, cardClientW=${geo.cW}, cardBlowout=${geo.cardBlowout}px, pageBlowout=${geo.pageBlowout}px`
      );
      await page.close();
    }

    // ========================================================================
    // SUITE 5: MODAL DISMISSAL (Backdrop Click & Escape Key)
    // ========================================================================
    console.log('\n--- SUITE 5: Modal Dismissal in Emerald Botanical Aqiqah ---');
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1024, height: 768 });
      await page.goto(`${BASE_URL}/?template=emerald-botanical-aqiqah`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const open = btns.find(b => b.textContent && b.textContent.includes('Buka Undangan'));
        if (open) open.click();
      });
      await new Promise(r => setTimeout(r, 800));

      const checkDialog = async () => {
        return await page.evaluate(() => Boolean(document.querySelector('[role="dialog"]')));
      };

      // --- 5.1: Lightbox Modal ---
      const openLightbox = async () => {
        await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          const galleryImg = imgs.find(img => img.src && img.src.includes('unsplash') && img.closest('button, [class*="cursor-pointer"]'));
          const clickable = galleryImg ? galleryImg.closest('button, [class*="cursor-pointer"]') : null;
          if (clickable) clickable.click();
        });
        await new Promise(r => setTimeout(r, 300));
      };

      // 5.1a: Lightbox Escape
      await openLightbox();
      const lbOpened = await checkDialog();
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 300));
      const lbClosedEscape = !(await checkDialog());
      recordResult(
        'modalDismissal',
        'Emerald Aqiqah - Photo Lightbox dismisses on Escape key',
        lbOpened && lbClosedEscape,
        `opened=${lbOpened}, closedOnEscape=${lbClosedEscape}`
      );

      // 5.1b: Lightbox Backdrop Click (at 200, 200)
      await openLightbox();
      await page.mouse.click(200, 200);
      await new Promise(r => setTimeout(r, 300));
      const lbClosedBackdrop = !(await checkDialog());
      recordResult(
        'modalDismissal',
        'Emerald Aqiqah - Photo Lightbox dismisses on Backdrop click (200, 200)',
        lbClosedBackdrop,
        `closedOnBackdrop=${lbClosedBackdrop}`
      );

      // 5.1c: Lightbox Inner Card Click (stopPropagation)
      await openLightbox();
      await page.mouse.click(512, 384);
      await new Promise(r => setTimeout(r, 200));
      const lbStillOpen = await checkDialog();
      await page.keyboard.press('Escape');
      recordResult(
        'modalDismissal',
        'Emerald Aqiqah - Photo Lightbox inner card click does not dismiss (stopPropagation)',
        lbStillOpen,
        `stayedOpenOnInnerClick=${lbStillOpen}`
      );

      // --- 5.2: Live Streaming Modal ---
      const openStreaming = async () => {
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const liveBtn = btns.find(b => b.textContent && b.textContent.includes('Live Streaming'));
          if (liveBtn) liveBtn.click();
        });
        await new Promise(r => setTimeout(r, 300));
      };

      // 5.2a: Streaming Escape
      await openStreaming();
      const strOpened = await checkDialog();
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 300));
      const strClosedEscape = !(await checkDialog());
      recordResult(
        'modalDismissal',
        'Emerald Aqiqah - Live Streaming Modal dismisses on Escape key',
        strOpened && strClosedEscape,
        `opened=${strOpened}, closedOnEscape=${strClosedEscape}`
      );

      // 5.2b: Streaming Backdrop Click (at 200, 200)
      await openStreaming();
      await page.mouse.click(200, 200);
      await new Promise(r => setTimeout(r, 300));
      const strClosedBackdrop = !(await checkDialog());
      recordResult(
        'modalDismissal',
        'Emerald Aqiqah - Live Streaming Modal dismisses on Backdrop click (200, 200)',
        strClosedBackdrop,
        `closedOnBackdrop=${strClosedBackdrop}`
      );

      // --- 5.3: QRIS Modal ---
      const openQris = async () => {
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const qrisBtn = btns.find(b => b.textContent && b.textContent.includes('Lihat QR'));
          if (qrisBtn) qrisBtn.click();
        });
        await new Promise(r => setTimeout(r, 300));
      };

      // 5.3a: QRIS Escape
      await openQris();
      const qrisOpened = await checkDialog();
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 300));
      const qrisClosedEscape = !(await checkDialog());
      recordResult(
        'modalDismissal',
        'Emerald Aqiqah - QRIS Modal dismisses on Escape key',
        qrisOpened && qrisClosedEscape,
        `opened=${qrisOpened}, closedOnEscape=${qrisClosedEscape}`
      );

      // 5.3b: QRIS Backdrop Click (at 200, 200)
      await openQris();
      await page.mouse.click(200, 200);
      await new Promise(r => setTimeout(r, 300));
      const qrisClosedBackdrop = !(await checkDialog());
      recordResult(
        'modalDismissal',
        'Emerald Aqiqah - QRIS Modal dismisses on Backdrop click (200, 200)',
        qrisClosedBackdrop,
        `closedOnBackdrop=${qrisClosedBackdrop}`
      );

      await page.close();
    }

  } finally {
    await browser.close();
  }

  // Summary calculation
  let totalTests = 0;
  let totalPassed = 0;
  for (const cat in results) {
    for (const t of results[cat]) {
      totalTests++;
      if (t.passed) totalPassed++;
    }
  }

  console.log('\n================================================================');
  console.log(`EMPIRICAL CHALLENGE SUITE SUMMARY: ${totalPassed}/${totalTests} TESTS PASSED (${Math.round((totalPassed/totalTests)*100)}%)`);
  console.log('================================================================\n');

  if (totalPassed === totalTests) {
    console.log('FINAL VERDICT: ALL CHALLENGER ISSUES EMPIRICALLY RESOLVED (PASS)');
    process.exit(0);
  } else {
    console.log('FINAL VERDICT: DEFECTS STILL DETECTED (FAIL)');
    process.exit(1);
  }
}

runEmpiricalChallenge().catch(err => {
  console.error('Test Suite Fatal Error:', err);
  process.exit(1);
});
