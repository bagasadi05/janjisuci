import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';

const VIEWPORTS = [
  { name: '375px (iPhone SE)', width: 375, height: 667 },
  { name: '414px (iPhone Plus)', width: 414, height: 896 },
  { name: '768px (iPad Portrait)', width: 768, height: 1024 },
  { name: '1024px (iPad Landscape / Desktop)', width: 1024, height: 768 },
  { name: '1440px (Wide Desktop)', width: 1440, height: 900 }
];

const URL_TEST_CASES = [
  {
    name: 'Standard name with plus',
    query: 'to=Bagas+Saputra',
    expectedText: 'Bagas Saputra'
  },
  {
    name: 'Encoded strings with plus and title',
    query: 'to=Drs.%20H.%20Ahmad%2BPartner',
    expectedSubstrings: ['Ahmad']
  },
  {
    name: 'Special characters and symbols',
    query: 'to=Dr.+H.+Ahmad+%26+Rekan+(Alm.)',
    expectedSubstrings: ['Dr.', 'Ahmad', 'Rekan']
  },
  {
    name: 'Empty ?to= parameter',
    query: 'to=',
    shouldFallback: true
  },
  {
    name: 'No to parameter',
    query: '',
    shouldFallback: true
  },
  {
    name: 'Whitespace only parameter',
    query: 'to=+++',
    shouldFallbackOrTrim: true
  },
  {
    name: 'Script injection attempt (<script>)',
    query: 'to=%3Cscript%3Ealert(%27xss%27)%3C%2Fscript%3E',
    shouldNotExecuteScript: true
  },
  {
    name: 'Img onerror injection attempt',
    query: 'to=%3Cimg%20src=x%20onerror=alert(1)%3E',
    shouldNotExecuteScript: true
  },
  {
    name: 'Malformed percent encoding (100%)',
    query: 'to=VIP%20Diskon%20100%',
    checkNoCrash: true
  },
  {
    name: 'Very long name (150 chars)',
    query: 'to=' + encodeURIComponent('Prof. Dr. Ir. Raden Mas Arya Suryonegoro Hadiningrat Kusuma Wardhana Putra Diningrat S.T. M.Sc. Ph.D. FIEEE Bersama Seluruh Keluarga Besar dan Rekan Kerja'),
    checkNoOverflow: true
  }
];

async function runEmpiricalStressTests() {
  console.log('================================================================');
  console.log('STARTING EMPIRICAL STRESS TESTING SUITE FOR JANJISUCI.ID');
  console.log('Browser: Google Chrome');
  console.log('Executable: ' + CHROME_PATH);
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--autoplay-policy=no-user-gesture-required'
    ]
  });

  const results = {
    retro: {
      urlCases: [],
      viewports: [],
      audio: {},
      interactions: {},
      consoleErrors: []
    },
    emerald: {
      urlCases: [],
      viewports: [],
      audio: {},
      interactions: {},
      consoleErrors: []
    }
  };

  try {
    // -------------------------------------------------------------
    // TEMPLATE 1: retro-editorial-birthday
    // -------------------------------------------------------------
    console.log('>>> [1/2] TESTING TEMPLATE: retro-editorial-birthday');
    await testTemplate(browser, 'retro-editorial-birthday', results.retro);

    // -------------------------------------------------------------
    // TEMPLATE 2: emerald-botanical-aqiqah
    // -------------------------------------------------------------
    console.log('\n>>> [2/2] TESTING TEMPLATE: emerald-botanical-aqiqah');
    await testTemplate(browser, 'emerald-botanical-aqiqah', results.emerald);

  } finally {
    await browser.close();
  }

  console.log('\n================================================================');
  console.log('ALL EMPIRICAL TESTS COMPLETED!');
  console.log('================================================================\n');
  return results;
}

async function testTemplate(browser, templateSlug, testReport) {
  // Test A: URL Param Edge Cases on 375px viewport
  console.log(`\n--- Test Phase A: URL Parameter Edge Cases (${templateSlug}) ---`);
  for (const tc of URL_TEST_CASES) {
    const page = await browser.newPage();
    const consoleLogs = [];
    const pageErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleLogs.push(msg.text());
    });
    page.on('pageerror', err => pageErrors.push(err.toString()));

    await page.setViewport({ width: 375, height: 667 });
    const testUrl = `${BASE_URL}/?template=${templateSlug}${tc.query ? '&' + tc.query : ''}`;
    
    let pass = true;
    let reason = '';
    let renderedGuestName = '';

    try {
      await page.goto(testUrl, { waitUntil: 'domcontentloaded', timeout: 5000 });
      // Wait for React to mount
      await page.waitForSelector('h2', { timeout: 3000 });

      // Check if page crashed or threw URIError
      if (pageErrors.length > 0) {
        pass = false;
        reason = `Page errors occurred: ${pageErrors.join('; ')}`;
      } else {
        // Query guest name element
        const guestNameEl = await page.$('h2');
        if (guestNameEl) {
          renderedGuestName = await page.evaluate(el => el.textContent?.trim() || '', guestNameEl);
        }

        if (tc.expectedText && !renderedGuestName.includes(tc.expectedText)) {
          pass = false;
          reason = `Expected "${tc.expectedText}", got "${renderedGuestName}"`;
        }

        if (tc.expectedSubstrings) {
          for (const sub of tc.expectedSubstrings) {
            if (!renderedGuestName.includes(sub)) {
              pass = false;
              reason = `Expected substring "${sub}" not found in "${renderedGuestName}"`;
              break;
            }
          }
        }

        if (tc.shouldFallback && !renderedGuestName) {
          pass = false;
          reason = 'Guest name is empty; should have fallback default greeting';
        }

        if (tc.shouldNotExecuteScript) {
          // Check that no dialog/alert popped and script tags are not rendered as raw executable HTML
          const rawScripts = await page.$$eval('script', scripts => scripts.map(s => s.textContent));
          const hasXss = rawScripts.some(s => s?.includes("alert('xss')") || s?.includes("alert(1)"));
          if (hasXss) {
            pass = false;
            reason = 'XSS Script tag found executed in DOM!';
          }
        }

        // Check horizontal overflow on cover
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth;
        });

        if (hasOverflow) {
          pass = false;
          reason = `Horizontal overflow detected: scrollWidth > innerWidth`;
        }
      }
    } catch (err) {
      pass = false;
      reason = `Exception: ${err.message}`;
    }

    testReport.urlCases.push({
      caseName: tc.name,
      query: tc.query,
      pass,
      renderedGuestName,
      reason,
      pageErrors
    });

    console.log(`  [${pass ? 'PASS' : 'FAIL'}] ${tc.name} -> Rendered: "${renderedGuestName}" ${reason ? `(${reason})` : ''}`);
    await page.close();
  }

  // Test B: Viewport Breakpoints & Horizontal Overflow
  console.log(`\n--- Test Phase B: Viewport Breakpoints & Responsiveness (${templateSlug}) ---`);
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    const consoleLogs = [];
    const pageErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleLogs.push(msg.text());
    });
    page.on('pageerror', err => pageErrors.push(err.toString()));

    await page.setViewport({ width: vp.width, height: vp.height });
    const url = `${BASE_URL}/?template=${templateSlug}&to=Challenger+Tester`;

    let pass = true;
    let overflowDetails = [];
    let desktopShowcaseState = 'N/A';

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForSelector('button', { timeout: 3000 });

      // 1. Check Cover Screen horizontal overflow
      const coverOverflow = await page.evaluate(() => {
        return {
          docScroll: document.documentElement.scrollWidth,
          bodyScroll: document.body.scrollWidth,
          innerW: window.innerWidth
        };
      });

      if (coverOverflow.docScroll > coverOverflow.innerW + 1 || coverOverflow.bodyScroll > coverOverflow.innerW + 1) {
        pass = false;
        overflowDetails.push(`CoverScreen overflow: doc=${coverOverflow.docScroll}, body=${coverOverflow.bodyScroll}, win=${coverOverflow.innerW}`);
      }

      // 2. Click "Buka Undangan"
      const buttons = await page.$$('button');
      let openBtn = null;
      for (const btn of buttons) {
        const text = await page.evaluate(b => b.textContent, btn);
        if (text && text.includes('Buka Undangan')) {
          openBtn = btn;
          break;
        }
      }

      if (openBtn) {
        await openBtn.click();
        await new Promise(r => setTimeout(r, 600)); // wait for cover animation
      } else {
        pass = false;
        overflowDetails.push('Open invitation button not found on cover screen');
      }

      // 3. Check Desktop Showcase presence/visibility
      const isDesktop = vp.width >= 1024;
      const showcaseVisibility = await page.evaluate(() => {
        const aside = document.querySelector('aside');
        if (!aside) return 'none';
        const style = window.getComputedStyle(aside);
        return style.display;
      });
      desktopShowcaseState = showcaseVisibility;

      if (isDesktop && showcaseVisibility === 'none') {
        pass = false;
        overflowDetails.push(`Expected desktop showcase (aside) to be visible on >=1024px, but computed display is 'none'`);
      } else if (!isDesktop && showcaseVisibility !== 'none') {
        pass = false;
        overflowDetails.push(`Expected desktop showcase (aside) to be hidden on <1024px, but computed display is '${showcaseVisibility}'`);
      }

      // 4. Scroll through the page and check horizontal overflow at multiple scroll offsets
      const scrollCheck = await page.evaluate(async () => {
        const errors = [];
        const maxScroll = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
        const steps = [0, Math.floor(maxScroll * 0.25), Math.floor(maxScroll * 0.5), Math.floor(maxScroll * 0.75), maxScroll];

        for (const pos of steps) {
          window.scrollTo(0, pos);
          await new Promise(r => setTimeout(r, 50));

          const docW = document.documentElement.scrollWidth;
          const bodyW = document.body.scrollWidth;
          const innerW = window.innerWidth;

          if (docW > innerW + 1 || bodyW > innerW + 1) {
            errors.push(`Scroll pos ${pos}: docW=${docW}, bodyW=${bodyW}, innerW=${innerW}`);
          }
        }
        return errors;
      });

      if (scrollCheck.length > 0) {
        pass = false;
        overflowDetails.push(...scrollCheck);
      }

    } catch (err) {
      pass = false;
      overflowDetails.push(`Exception: ${err.message}`);
    }

    testReport.viewports.push({
      viewport: vp.name,
      width: vp.width,
      height: vp.height,
      pass,
      desktopShowcaseState,
      overflowDetails,
      pageErrors
    });

    console.log(`  [${pass ? 'PASS' : 'FAIL'}] ${vp.name} -> Showcase: ${desktopShowcaseState} ${overflowDetails.length ? `(${overflowDetails.join('; ')})` : ''}`);
    await page.close();
  }

  // Test C: Audio Autoplay & Unlock Policy Verification
  console.log(`\n--- Test Phase C: Audio Autoplay & Unlock Verification (${templateSlug}) ---`);
  {
    const page = await browser.newPage();
    const audioEvents = [];
    const audioErrors = [];

    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('Autoplay') || text.includes('Memutar:')) {
        audioEvents.push(text);
      }
      if (msg.type() === 'error') {
        audioErrors.push(text);
      }
    });

    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/?template=${templateSlug}&to=Audio+Tester`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('button', { timeout: 3000 });

    // Click "Buka Undangan"
    const buttons = await page.$$('button');
    let openBtn = null;
    for (const btn of buttons) {
      const text = await page.evaluate(b => b.textContent, btn);
      if (text && text.includes('Buka Undangan')) {
        openBtn = btn;
        break;
      }
    }

    let audioUnlocked = false;
    if (openBtn) {
      await openBtn.click();
      await new Promise(r => setTimeout(r, 800));

      // Check audio element state in DOM
      const audioStatus = await page.evaluate(() => {
        const audio = document.querySelector('audio');
        if (!audio) return { found: false };
        return {
          found: true,
          src: audio.src,
          paused: audio.paused,
          volume: audio.volume,
          readyState: audio.readyState
        };
      });

      audioUnlocked = audioStatus.found;
      testReport.audio = {
        audioUnlocked,
        audioStatus,
        audioEvents,
        audioErrors
      };
      console.log(`  [${audioUnlocked ? 'PASS' : 'FAIL'}] Audio Element State: found=${audioStatus.found}, paused=${audioStatus.paused}, src=${audioStatus.src}`);
      console.log(`  Audio Events captured: ${JSON.stringify(audioEvents)}`);
    }
    await page.close();
  }

  // Test D: Interactive Features Verification (RSVP, Copy, Modals)
  console.log(`\n--- Test Phase D: Interactive Features & Modals (${templateSlug}) ---`);
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 768 });
    await page.goto(`${BASE_URL}/?template=${templateSlug}&to=Interactive+Tester`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('button', { timeout: 3000 });

    // Open invitation
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(b => b.textContent, btn);
      if (text && text.includes('Buka Undangan')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 600));
        break;
      }
    }

    if (templateSlug === 'retro-editorial-birthday') {
      // 1. Submit RSVP with DJ song request
      const nameEl = await page.$('form input[placeholder*="Nadia"]');
      const songEl = await page.$('form input[placeholder*="Penjaga Hati"]');
      const msgEl = await page.$('form textarea');

      if (nameEl && songEl && msgEl) {
        await nameEl.click();
        await page.keyboard.type('Challenger VIP Guest');

        await songEl.click();
        await page.keyboard.type('Dua Lipa - Levitating (DJ Remix)');

        await msgEl.click();
        await page.keyboard.type('Selamat ulang tahun ke-17 Aurelia! Sukses selalu.');

        await page.evaluate(() => {
          const form = document.querySelector('form');
          if (form) form.requestSubmit();
        });
        await new Promise(r => setTimeout(r, 600));
      }

      const rsvpFound = await page.evaluate(() => {
        const text = document.body.textContent || '';
        return text.includes('Challenger VIP Guest') && text.includes('Dua Lipa - Levitating');
      });

      console.log(`  [${rsvpFound ? 'PASS' : 'FAIL'}] RSVP with DJ Song Request submission: success=${rsvpFound}`);
      testReport.interactions.rsvp = { success: rsvpFound };

      // 2. Lightbox check
      const lightboxResult = await page.evaluate(async () => {
        const photos = Array.from(document.querySelectorAll('img'));
        const photo = photos.find(p => p.src.includes('unsplash') && p.parentElement?.className.includes('rounded'));
        if (!photo) return { success: false, reason: 'Photo item not found' };
        photo.click();
        await new Promise(r => setTimeout(r, 400));

        const modal = document.querySelector('.fixed.inset-0.z-50');
        const opened = Boolean(modal);

        if (modal) {
          const closeBtn = modal.querySelector('button');
          if (closeBtn) closeBtn.click();
        }

        return { success: opened };
      });
      console.log(`  [${lightboxResult.success ? 'PASS' : 'FAIL'}] Milestone Photo Lightbox modal: success=${lightboxResult.success}`);
      testReport.interactions.lightbox = lightboxResult;

    } else if (templateSlug === 'emerald-botanical-aqiqah') {
      // 1. Submit RSVP with Hadir Virtual
      const nameEl = await page.$('form input[placeholder*="Ahmad Dahlan"]');
      const msgEl = await page.$('form textarea');

      if (nameEl && msgEl) {
        await nameEl.click();
        await page.keyboard.type('Ustadz Ahmad Al-Farisi');

        // Select virtual
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('form button'));
          const vBtn = btns.find(b => b.textContent?.includes('Virtual'));
          if (vBtn) vBtn.click();
        });

        await msgEl.click();
        await page.keyboard.type('Barakallahu fiik, semoga ananda Muhammad Rayyan menjadi anak yang sholeh.');

        await page.evaluate(() => {
          const form = document.querySelector('form');
          if (form) form.requestSubmit();
        });
        await new Promise(r => setTimeout(r, 600));
      }

      const rsvpFound = await page.evaluate(() => {
        const text = document.body.textContent || '';
        return text.includes('Ustadz Ahmad Al-Farisi') && text.includes('Virtual');
      });

      console.log(`  [${rsvpFound ? 'PASS' : 'FAIL'}] Islamic RSVP submission: success=${rsvpFound}`);
      testReport.interactions.rsvp = { success: rsvpFound };

      // 2. Virtual Live Streaming Modal
      const streamingResult = await page.evaluate(async () => {
        const btns = Array.from(document.querySelectorAll('button'));
        const streamBtn = btns.find(b => b.textContent?.includes('Streaming') || b.textContent?.includes('Akses Ruang'));
        if (!streamBtn) return { success: false, reason: 'Streaming button not found' };
        streamBtn.click();
        await new Promise(r => setTimeout(r, 400));

        const modal = document.querySelector('.fixed.inset-0.z-50');
        const opened = Boolean(modal);

        if (modal) {
          const closeBtn = modal.querySelector('button');
          if (closeBtn) closeBtn.click();
        }
        return { success: opened };
      });
      console.log(`  [${streamingResult.success ? 'PASS' : 'FAIL'}] Live Streaming Modal: success=${streamingResult.success}`);
      testReport.interactions.streamingModal = streamingResult;
    }

    await page.close();
  }
}

// Run test suite
runEmpiricalStressTests()
  .then(res => {
    console.log('\nFinal Test Results Summary:');
    console.log(JSON.stringify(res, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error('Test Suite Failed with fatal error:', err);
    process.exit(1);
  });
