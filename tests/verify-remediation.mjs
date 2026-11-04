import fs from 'fs';
import path from 'path';

console.log('=== Remediation Verification Suite ===\n');

// 1. Verify URL parsing logic behavior
function parseParam(query, defaultVal) {
  const urlParams = new URLSearchParams(query);
  const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest');
  let guestName = defaultVal;
  if (to && to.trim()) {
    try {
      guestName = decodeURIComponent(to.replace(/\+/g, ' '));
    } catch {
      guestName = to.trim();
    }
  }
  return guestName;
}

const v1 = parseParam('?to=VIP%20Diskon%20100%', 'Default');
console.log('1. Malformed percent test:', v1 === 'VIP Diskon 100%' ? 'PASS' : 'FAIL', `(${v1})`);

const v2 = parseParam('?to=+++', 'Default');
console.log('2. Whitespace-only test:', v2 === 'Default' ? 'PASS' : 'FAIL', `(${v2})`);

const v3 = parseParam('?to=Bagas+Saputra', 'Default');
console.log('3. Plus replacement test:', v3 === 'Bagas Saputra' ? 'PASS' : 'FAIL', `(${v3})`);

const v4 = parseParam('?to=', 'Default');
console.log('4. Empty param test:', v4 === 'Default' ? 'PASS' : 'FAIL', `(${v4})`);

// 2. Verify static content of modified files
const retroCover = fs.readFileSync('src/templates/retro-editorial-birthday/RetroEditorialCoverScreen.tsx', 'utf8');
const retroTemplate = fs.readFileSync('src/templates/retro-editorial-birthday/RetroEditorialTemplate.tsx', 'utf8');
const emeraldCover = fs.readFileSync('src/templates/emerald-botanical-aqiqah/EmeraldBotanicalCoverScreen.tsx', 'utf8');
const emeraldTemplate = fs.readFileSync('src/templates/emerald-botanical-aqiqah/EmeraldBotanicalTemplate.tsx', 'utf8');

console.log('\n--- Checking RetroEditorialCoverScreen.tsx ---');
console.log('try/catch in decodeURIComponent:', retroCover.includes('setGuestName(decodeURIComponent(to.replace(/\\+/g, \' \')))') && retroCover.includes('catch') ? 'PASS' : 'FAIL');
console.log('to && to.trim() check:', retroCover.includes('to && to.trim()') ? 'PASS' : 'FAIL');

console.log('\n--- Checking RetroEditorialTemplate.tsx ---');
console.log('try/catch in decodeURIComponent:', retroTemplate.includes('setGuestGreetingName(decodeURIComponent(to.replace(/\\+/g, \' \')))') && retroTemplate.includes('catch') ? 'PASS' : 'FAIL');
console.log('to && to.trim() check:', retroTemplate.includes('to && to.trim()') ? 'PASS' : 'FAIL');
console.log('navigator.clipboard existence check:', retroTemplate.includes('if (!navigator.clipboard)') ? 'PASS' : 'FAIL');
console.log('clipboard .catch() handler:', retroTemplate.includes('.catch(() => {') && retroTemplate.includes('Gagal menyalin') ? 'PASS' : 'FAIL');
console.log('item.name break-words:', retroTemplate.includes('{item.name}') && retroTemplate.includes('break-words') ? 'PASS' : 'FAIL');
console.log('item.songRequest break-words:', retroTemplate.includes('DJ Song: {item.songRequest}') && retroTemplate.includes('break-words') ? 'PASS' : 'FAIL');
console.log('item.message break-words:', retroTemplate.includes('"{item.message}"') && retroTemplate.includes('break-words') ? 'PASS' : 'FAIL');

console.log('\n--- Checking EmeraldBotanicalCoverScreen.tsx ---');
console.log('try/catch in decodeURIComponent:', emeraldCover.includes('setGuestName(decodeURIComponent(to.replace(/\\+/g, \' \')))') && emeraldCover.includes('catch') ? 'PASS' : 'FAIL');
console.log('to && to.trim() check:', emeraldCover.includes('to && to.trim()') ? 'PASS' : 'FAIL');

console.log('\n--- Checking EmeraldBotanicalTemplate.tsx ---');
console.log('try/catch in decodeURIComponent:', emeraldTemplate.includes('setGuestName(decodeURIComponent(to.replace(/\\+/g, \' \')))') && emeraldTemplate.includes('catch') ? 'PASS' : 'FAIL');
console.log('to && to.trim() check:', emeraldTemplate.includes('to && to.trim()') ? 'PASS' : 'FAIL');
console.log('navigator.clipboard existence check:', emeraldTemplate.includes('if (!navigator.clipboard)') ? 'PASS' : 'FAIL');
console.log('item.name break-words:', emeraldTemplate.includes('{item.name}') && emeraldTemplate.includes('break-words') ? 'PASS' : 'FAIL');
console.log('item.message break-words:', emeraldTemplate.includes('&ldquo;{item.message}&rdquo;') && emeraldTemplate.includes('break-words') ? 'PASS' : 'FAIL');
console.log('Lightbox backdrop dismissal:', emeraldTemplate.includes('onClick={() => setSelectedPhotoIdx(null)}') && emeraldTemplate.includes('e.stopPropagation()') ? 'PASS' : 'FAIL');
console.log('Streaming backdrop dismissal:', emeraldTemplate.includes('onClick={() => setShowStreamingModal(false)}') && emeraldTemplate.includes('e.stopPropagation()') ? 'PASS' : 'FAIL');
console.log('QRIS backdrop dismissal:', emeraldTemplate.includes('onClick={() => setShowQrisModal(false)}') && emeraldTemplate.includes('e.stopPropagation()') ? 'PASS' : 'FAIL');
console.log('Escape key listener:', emeraldTemplate.includes("e.key === 'Escape'") ? 'PASS' : 'FAIL');

console.log('\n=== Verification Complete ===');
