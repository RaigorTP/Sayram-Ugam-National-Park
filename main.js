(() => {
  const body = document.body;
  const toggle = document.querySelector('[data-toggle]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') body.setAttribute('data-theme', 'dark');

  const setActive = () => {
    const path = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.endsWith(path)) a.classList.add('active');
    });
  };

  const toggleTheme = () => {
    const current = body.getAttribute('data-theme') === 'dark';
    if (current) {
      body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  toggle?.addEventListener('click', toggleTheme);
  setActive();

  // Reveal on scroll
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  revealItems.forEach(el => observer.observe(el));

  // Lightbox for gallery images
  const backdrop = document.createElement('div');
  backdrop.className = 'lightbox-backdrop';
  const img = document.createElement('img');
  backdrop.appendChild(img);
  backdrop.addEventListener('click', () => backdrop.classList.remove('active'));
  document.body.appendChild(backdrop);

  document.querySelectorAll('.gallery-grid img').forEach(el => {
    el.addEventListener('click', () => {
      img.src = el.src;
      backdrop.classList.add('active');
    });
  });

  // Button ripple (simple)
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const circle = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.position = 'absolute';
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;
      circle.style.background = 'rgba(255,255,255,0.35)';
      circle.style.borderRadius = '50%';
      circle.style.pointerEvents = 'none';
      circle.style.transform = 'scale(0)';
      circle.style.transition = 'transform 350ms ease, opacity 450ms ease';
      btn.appendChild(circle);
      requestAnimationFrame(() => { circle.style.transform = 'scale(1)'; circle.style.opacity = '0'; });
      setTimeout(() => circle.remove(), 480);
    });
  });
})();
