const params = new URLSearchParams('?to=VIP%20Diskon%20100%');
const to = params.get('to');
console.log('params.get("to"):', to);
try {
  const decoded = decodeURIComponent(to.replace(/\+/g, ' '));
  console.log('Decoded:', decoded);
} catch (e) {
  console.log('CAUGHT UNHANDLED EXCEPTION:', e.name, e.message);
}

const params2 = new URLSearchParams('?to=Bagas%20Saputra+Dan+Keluarga');
console.log('Direct urlParams.get("to"):', params2.get('to'));
