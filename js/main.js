function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Mark active nav link
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  if (a.href === location.href) a.style.color = '#4ade80';
});
