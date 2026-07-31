const trendingMovies = [
  {
    title: 'Stranger Things',
    category: 'Sci-Fi Thriller',
    year: '2024',
    badge: 'Top 10',
    description: 'A group of kids uncover supernatural mysteries in their small town.',
    image: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Red Notice',
    category: 'Action',
    year: '2024',
    badge: 'New',
    description: 'A daring heist thriller with stars chasing the world’s most wanted art.',
    image: 'https://images.unsplash.com/photo-1515876304299-7f8de8f9a959?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'The Crown',
    category: 'Historical Drama',
    year: '2024',
    badge: 'Trending',
    description: 'Royal intrigue and powerful performances in the world of the British monarchy.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Black Mirror',
    category: 'Tech Drama',
    year: '2024',
    badge: 'Popular',
    description: 'Dark stories exploring modern society and the future of technology.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
  }
];

const trendingGrid = document.querySelector('.trending-grid');
const navbar = document.querySelector('.navbar');
const emailForm = document.getElementById('email-form');
const heroHeading = document.querySelector('.hero-copy h1');

function renderTrending() {
  trendingGrid.innerHTML = trendingMovies
    .map((movie, index) => {
      return `
        <article class="movie-card hidden" data-index="${index}">
          <img src="${movie.image}" alt="${movie.title} poster">
          <div class="movie-info">
            <span class="badge-tag">${movie.badge}</span>
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <div class="movie-footer">
              <span>${movie.category} · ${movie.year}</span>
              <button class="play-button">Play</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function handleScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function createRevealObserver() {
  const revealElements = document.querySelectorAll('.hidden');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => observer.observe(el));
}

function attachTilt() {
  const cards = document.querySelectorAll('.movie-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * -6;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

function animateHeading() {
  const phrases = [
    'Unlimited movies, TV shows, and more.',
    'Watch anywhere. Cancel anytime.',
    'Join today for endless entertainment.'
  ];
  let current = 0;

  setInterval(() => {
    heroHeading.style.opacity = '0';
    setTimeout(() => {
      current = (current + 1) % phrases.length;
      heroHeading.textContent = phrases[current];
      heroHeading.style.opacity = '1';
    }, 300);
  }, 5000);
}

function bindForm() {
  emailForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = event.target.email.value.trim();

    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    event.target.reset();
    event.target.querySelector('.btn-start').textContent = 'Thanks!';
    setTimeout(() => {
      event.target.querySelector('.btn-start').textContent = 'Get Started';
    }, 2200);
  });
}

function init() {
  renderTrending();
  createRevealObserver();
  attachTilt();
  animateHeading();
  bindForm();
  window.addEventListener('scroll', handleScroll);
}

window.addEventListener('DOMContentLoaded', init);
