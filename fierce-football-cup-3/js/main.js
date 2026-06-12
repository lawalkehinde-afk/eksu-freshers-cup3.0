// EKSU FRESHER'S CUP 3.0 — MAIN JS

// ---- 3 THEME MODES ----
const THEMES = ['dark', 'sepia', 'light'];
const THEME_ICONS = { dark: '🌑', sepia: '📜', light: '☀️' };

function initTheme() {
  const saved = localStorage.getItem('fc3theme') || 'dark';
  applyTheme(saved);
}
function applyTheme(theme) {
  document.body.classList.remove('sepia-mode', 'light-mode');
  if (theme === 'sepia') document.body.classList.add('sepia-mode');
  if (theme === 'light') document.body.classList.add('light-mode');
  localStorage.setItem('fc3theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = THEME_ICONS[theme];
}
function cycleTheme() {
  const current = localStorage.getItem('fc3theme') || 'dark';
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
  applyTheme(next);
}
function toggleTheme() { cycleTheme(); }
function toggleMenu() { document.getElementById('mobileMenu')?.classList.toggle('open'); }

// ---- COUNTDOWN ----
function buildCountdown() {
  const el = document.getElementById('countdownSection');
  if (!el) return;
  const upcoming = DATA.matches.filter(m => m.status === 'upcoming')
    .sort((a,b) => new Date(a.date) - new Date(b.date))[0];
  if (!upcoming) { el.style.display = 'none'; return; }
  const home = getTeam(upcoming.home), away = getTeam(upcoming.away);
  const matchEl = document.getElementById('countdownMatch');
  if (matchEl) matchEl.textContent = home.name + ' vs ' + away.name + ' · ' + upcoming.date + ' at ' + upcoming.time;
  function tick() {
    const now = new Date();
    let [t, mod] = (upcoming.time||'12:00 PM').split(' ');
    let [h, m] = t.split(':').map(Number);
    if (mod === 'PM' && h !== 12) h += 12;
    if (mod === 'AM' && h === 12) h = 0;
    const target = new Date(upcoming.date); target.setHours(h, m||0, 0, 0);
    const diff = target - now;
    const set = (id, val) => { const e=document.getElementById(id); if(e) e.textContent=String(Math.max(0,val)).padStart(2,'0'); };
    if (diff <= 0) { set('cdDays',0); set('cdHours',0); set('cdMins',0); set('cdSecs',0); return; }
    set('cdDays', Math.floor(diff/86400000));
    set('cdHours', Math.floor((diff%86400000)/3600000));
    set('cdMins', Math.floor((diff%3600000)/60000));
    set('cdSecs', Math.floor((diff%60000)/1000));
  }
  tick(); setInterval(tick, 1000);
}

// ---- PWA INSTALL ----
let deferredPrompt = null;
function initPWA() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show banner after 3 seconds if not already installed
    if (!localStorage.getItem('fc3pwa_installed')) {
      setTimeout(() => {
        const banner = document.getElementById('pwaBanner');
        if (banner) banner.classList.add('show');
      }, 3000);
    }
  });
  window.addEventListener('appinstalled', () => {
    localStorage.setItem('fc3pwa_installed', '1');
    closePWABanner();
  });
}
function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        localStorage.setItem('fc3pwa_installed', '1');
      }
      deferredPrompt = null;
      closePWABanner();
    });
  }
}
function closePWABanner() {
  const banner = document.getElementById('pwaBanner');
  if (banner) banner.classList.remove('show');
}

// ---- CONFETTI ----
function launchConfetti() {
  const colors = ['#4ade80','#fbbf24','#a78bfa','#f87171','#60a5fa','#ffffff'];
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.cssText = `left:${Math.random()*100}vw;width:${Math.random()*8+5}px;height:${Math.random()*8+5}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${Math.random()*2+2}s;`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4500);
    }, i * 25);
  }
}

// ---- SCROLL ANIMATIONS ----
function initScrollAnimations() {
  const items = document.querySelectorAll('.match-card,.scorer-row,.announce-card,.stat-card');
  if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e,i) => {
      if (e.isIntersecting) { setTimeout(()=>e.target.classList.add('visible'), i*55); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  items.forEach(el => obs.observe(el));
}

// ---- TOAST ----
function showToast(msg) {
  let t = document.getElementById('mainToast');
  if (!t) { t=document.createElement('div'); t.className='toast'; t.id='mainToast'; document.body.appendChild(t); }
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initTheme(); buildCountdown(); initScrollAnimations(); initPWA();
  if (typeof DATA !== 'undefined' && DATA.bracket?.champion && DATA.bracket.champion !== 'TBD') {
    setTimeout(launchConfetti, 600);
  }
});