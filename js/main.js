const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initSnow() {
  const count = Math.floor((window.innerWidth * window.innerHeight) / 11000);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.2 + 0.5,
    vy: Math.random() * 0.7 + 0.2,
    vx: (Math.random() - 0.5) * 0.3,
    a: Math.random() * 0.5 + 0.2
  }));
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(195, 255, 218, ${p.a})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.y += p.vy;
    p.x += p.vx + Math.sin(p.y * 0.01) * 0.2;

    if (p.y > canvas.height + p.r) {
      p.y = -p.r;
      p.x = Math.random() * canvas.width;
    }
    if (p.x > canvas.width + p.r) p.x = -p.r;
    if (p.x < -p.r) p.x = canvas.width + p.r;
  }
  requestAnimationFrame(drawSnow);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initSnow();
});

resizeCanvas();
initSnow();
drawSnow();
