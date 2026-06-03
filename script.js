/* ── LOADER ── */
window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('done'), 800));
setTimeout(() => { const l = document.getElementById('loader'); if (l && !l.classList.contains('done')) l.classList.add('done'); }, 2000);

/* ── NAV ── */
const nav = document.getElementById('nav');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 20);
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 300);

  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});
navLinks.forEach(a => a.addEventListener('click', () => {
  navToggle.classList.remove('open'); navMenu.classList.remove('open');
}));

/* ── SCROLL TOP ── */
document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── TYPEWRITER (hero) ── */
const words = ['Linux', 'AWS Cloud', 'Cisco', 'Cyber Security', 'MikroTik'];
let wi = 0, ci = 0, del = false;
const tw = document.querySelector('.hero-label');
const originalLabel = tw ? tw.textContent : '';
// Keep original label — no typewriter on hero label for clean look

/* ── REVEAL on SCROLL ── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ── SKILL BARS ── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill').forEach(b => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 100);
      });
      // animate rows
      e.target.querySelectorAll('.sk').forEach((row, i) => {
        setTimeout(() => row.classList.add('in'), i * 70);
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
const skillSec = document.getElementById('skills');
if (skillSec) skillObs.observe(skillSec);

/* ── COUNT UP ── */
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      [['c1', 4], ['c2', 8], ['c3', 5]].forEach(([id, target]) => {
        const el = document.getElementById(id);
        if (!el) return;
        let n = 0;
        const t = setInterval(() => {
          n = Math.min(n + 1, target);
          el.textContent = n;
          if (n >= target) clearInterval(t);
        }, 80);
      });
      countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
const aboutSec = document.getElementById('about');
if (aboutSec) countObs.observe(aboutSec);

/* ── CERT DRAG SCROLL ── */
const cs = document.getElementById('certScroll');
if (cs) {
  let down = false, startX, scrollLeft;
  cs.addEventListener('mousedown', e => { down = true; startX = e.pageX - cs.offsetLeft; scrollLeft = cs.scrollLeft; });
  cs.addEventListener('mouseleave', () => down = false);
  cs.addEventListener('mouseup', () => down = false);
  cs.addEventListener('mousemove', e => {
    if (!down) return; e.preventDefault();
    cs.scrollLeft = scrollLeft - (e.pageX - cs.offsetLeft - startX) * 1.5;
  });
}

/* ── LIGHTBOX ── */
let lbScale = 1;
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');

function openLb(src, title) {
  lbImg.src = src; lbTitle.textContent = title;
  lbScale = 1; lbImg.style.transform = 'scale(1)';
  lb.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
function lbZ(d) {
  if (d === 0) { lbScale = 1; }
  else { lbScale = Math.min(Math.max(lbScale + d, 0.4), 5); }
  lbImg.style.transform = `scale(${lbScale})`;
}
lb.addEventListener('click', closeLb);
document.getElementById('lbBox').addEventListener('click', e => e.stopPropagation());
lbImg.addEventListener('wheel', e => { e.preventDefault(); lbZ(e.deltaY < 0 ? 0.15 : -0.15); }, { passive: false });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

/* ── CONTACT FORM ── */
const toast = document.getElementById('toast');
const toastX = document.getElementById('toastX');
let toastT;
function showToast() {
  toast.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => toast.classList.remove('show'), 5000);
}
toastX.addEventListener('click', () => toast.classList.remove('show'));

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !subject || !message) return;
  const body = encodeURIComponent(`Halo Ade,\n\nSaya ${name} (${email}).\n\n${message}\n\n---\nDikirim dari portfolio website.`);
  window.location.href = `mailto:adecandrakurniawan192@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  this.reset();
  setTimeout(showToast, 800);
});
