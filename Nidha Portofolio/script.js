const loader = document.getElementById('pageLoader');
const backToTop = document.getElementById('backToTop');
const revealElements = document.querySelectorAll('.reveal');
const form = document.getElementById('contactForm');
const themeToggle = document.getElementById('themeToggle');
const typingPhrases = ['premium interfaces.', 'interactive websites.', 'scalable UIs.', 'memorable experiences.'];
const typingText = document.getElementById('typingText');
const cursor = document.getElementById('customCursor');
const cursorOutline = document.getElementById('customCursorOutline');
const particleCanvas = document.getElementById('particleCanvas');
const ctx = particleCanvas?.getContext ? particleCanvas.getContext('2d') : null;
let phraseIndex = 0;
let charIndex = 0;
let typingForward = true;
let particles = [];

function updateThemeIcon() {
  const icon = themeToggle?.querySelector('.toggle-icon');
  if (icon) {
    icon.textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

window.addEventListener('load', () => {
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      document.body.style.overflow = 'auto';
    }, 600);
  }

  if (revealElements.length) {
    revealElements.forEach((element) => revealObserver.observe(element));
  }

  updateThemeIcon();
  typeProfession();
});

window.addEventListener('scroll', () => {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for your message! I will respond soon.');
    form.reset();
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    updateThemeIcon();
  });
}

function typeProfession() {
  if (!typingText || !typingPhrases.length) return;

  const currentPhrase = typingPhrases[phraseIndex];
  if (typingForward) {
    charIndex++;
    if (charIndex > currentPhrase.length) {
      typingForward = false;
      setTimeout(typeProfession, 1200);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      typingForward = true;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    }
  }
  typingText.textContent = currentPhrase.slice(0, charIndex);
  setTimeout(typeProfession, typingForward ? 100 : 40);
}

function resizeCanvas() {
  if (!particleCanvas) return;
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

function createParticles() {
  if (!particleCanvas) {
    particles = [];
    return;
  }
  particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * particleCanvas.width,
    y: Math.random() * particleCanvas.height,
    radius: Math.random() * 2.4 + 1,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.4 + 0.2,
  }));
}

function animateParticles() {
  if (!ctx || !particleCanvas) return;
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    if (particle.x < 0) particle.x = particleCanvas.width;
    if (particle.x > particleCanvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = particleCanvas.height;
    if (particle.y > particleCanvas.height) particle.y = 0;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124, 92, 255, ${particle.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener('mousemove', (event) => {
  if (!cursor || !cursorOutline) return;
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
  cursorOutline.style.left = `${event.clientX}px`;
  cursorOutline.style.top = `${event.clientY}px`;
});

resizeCanvas();
createParticles();
animateParticles();
window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});
