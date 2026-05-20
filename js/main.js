// ============================================================
// EKSU FRESHER'S CUP 3.0 — MAIN JS (ENHANCED)
// ============================================================

function initTheme() {
  const saved = localStorage.getItem('fc3theme');
  if (saved === 'light') document.body.classList.add('light-mode');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.innerHTML = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('fc3theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.innerHTML = isLight ? '🌙' : '☀️';
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function buildTicker() {
  const wrap = document.getElementById('tickerTrack');
  if (!wrap) return;
  const matches = DATA.matches.filter(m => m.status === 'live' || m.status === 'ft');
  if (matches.length === 0) {
    const tw = document.getElementById('tickerWrap');
    if (tw) tw.style.display = 'none';
    document.body.style.paddingTop = '60px';
    return;
  }
  let html = '';
  [0, 1].forEach(() => {
    matches.forEach(m => {
      const home = getTeam(m.home), away = getTeam(m.away);
      const isLive = m.status === 'live';
      html += `<div class="ticker-item">
        ${isLive ? '<span class="ticker-live-badge">LIVE</span>' : ''}
        <span>${home.name}</span>
        <span class="ticker-score">${m.homeScore} : ${m.awayScore}</span>
        <span>${away.name}</span>
      </div>`;
    });
  });
  wrap.innerHTML = html;
}

function convertTime(t) {
  if (!t) return '12:00:00';
  const [time, modifier] = t.split(' ');
  let [hours, minutes] = time.split(':');
  if (modifier === 'PM' && hours !== '12') hours = parseInt(hours) + 12;
  if (modifier === 'AM' && hours === '12') hours = '00';
  return `${String(hours).padStart(2,'0')}:${minutes || '00'}:00`;
}

function buildCountdown() {
  const el = document.getElementById('countdownSection');
  if (!el) return;
  const upcoming = DATA.matches
    .filter(m => m.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  if (!upcoming) { el.style.display = 'none'; return; }
  const home = getTeam(upcoming.home), away = getTeam(upcoming.away);
  const matchEl = document.getElementById('countdownMatch');
  if (matchEl) matchEl.textContent = `${home.name} vs ${away.name} · ${upcoming.date} at ${upcoming.time}`;
  function tick() {
    const now = new Date();
    const target = new Date(`${upcoming.date}T${convertTime(upcoming.time)}`);
    const diff = target - now;
    const safe = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
    if (diff <= 0) { safe('cdDays','00'); safe('cdHours','00'); safe('cdMins','00'); safe('cdSecs','00'); return; }
    safe('cdDays', String(Math.floor(diff/86400000)).padStart(2,'0'));
    safe('cdHours', String(Math.floor((diff%86400000)/3600000)).padStart(2,'0'));
    safe('cdMins', String(Math.floor((diff%3600000)/60000)).padStart(2,'0'));
    safe('cdSecs', String(Math.floor((diff%60000)/1000)).padStart(2,'0'));
  }
  tick(); setInterval(tick, 1000);
}

function showGoalPopup(scorer, matchStr, score) {
  const overlay = document.getElementById('goalOverlay');
  const popup = document.getElementById('goalPopup');
  if (!overlay || !popup) return;
  const gs = document.getElementById('gpScorer'); if (gs) gs.textContent = scorer;
  const gm = document.getElementById('gpMatch'); if (gm) gm.textContent = matchStr;
  const gsc = document.getElementById('gpScore'); if (gsc) gsc.textContent = score;
  overlay.classList.add('show'); popup.classList.add('show');
  setTimeout(closeGoalPopup, 4000);
}

function closeGoalPopup() {
  document.getElementById('goalOverlay')?.classList.remove('show');
  document.getElementById('goalPopup')?.classList.remove('show');
}

function launchConfetti() {
  const colors = ['#4ade80','#fbbf24','#a78bfa','#f87171','#60a5fa','#fff'];
  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random()*100+'vw';
      p.style.background = colors[Math.floor(Math.random()*colors.length)];
      p.style.width = (Math.random()*8+6)+'px';
      p.style.height = (Math.random()*8+6)+'px';
      p.style.borderRadius = Math.random()>0.5?'50%':'2px';
      p.style.animationDuration = (Math.random()*2+2)+'s';
      document.body.appendChild(p);
      setTimeout(()=>p.remove(), 4000);
    }, i*20);
  }
}

function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.match-card,.scorer-row,.announce-card,.stat-card').forEach(el=>el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(()=>entry.target.classList.add('visible'), i*60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.match-card,.scorer-row,.announce-card,.stat-card').forEach(el=>observer.observe(el));
}

function showToast(msg) {
  let toast = document.getElementById('mainToast');
  if (!toast) { toast=document.createElement('div'); toast.className='toast'; toast.id='mainToast'; document.body.appendChild(toast); }
  toast.textContent = msg; toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 3000);
}

function setActiveNav() {
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.style.color = '#4ade80';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme(); setActiveNav(); buildTicker(); buildCountdown(); initScrollAnimations();
  if (typeof DATA !== 'undefined' && DATA.bracket.champion && DATA.bracket.champion !== 'TBD') {
    setTimeout(launchConfetti, 800);
  }
});
