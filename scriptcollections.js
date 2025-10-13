document.addEventListener('DOMContentLoaded', () => {
    const searchBtn   = document.querySelector('.search-btn');
    const searchInput = document.getElementById('searchInput');
    const cards       = document.querySelectorAll('.fashion-card');
  
    function runSearch() {
      const query = searchInput.value.trim().toLowerCase();
  
      cards.forEach(card => {
        const title    = card.querySelector('.fashion-title').textContent.toLowerCase();
        const category = card.querySelector('.fashion-category').textContent.toLowerCase();
        const match    = title.includes(query) || category.includes(query);
        card.style.display = (match || query === '') ? 'flex' : 'none';
      });
    }
  
    searchBtn.addEventListener('click', runSearch);
  
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') runSearch();
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // ===== EFFECT 1: Scroll-Reveal for Collection Items =====
    // ==========================================================
    const fallItems = document.querySelectorAll('.fall-item');
    if (fallItems.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
  
      fallItems.forEach(item => {
        observer.observe(item);
      });
    }
  
    // ======================================================
    // ===== EFFECT 2: Parallax for Hero Image =====
    // ======================================================
    const heroImage = document.querySelector('.big-pic');
    if (heroImage) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      });
    }
  
    // ======================================================
    // ===== FIXED: Mobile Menu Toggle Logic =====
    // ======================================================
    const menuBtn = document.querySelector('.menu-btn');
    const mainNav = document.querySelector('.main-nav');
  
    if (menuBtn && mainNav) {
      // Listen for clicks on the menu button
      menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mainNav.classList.toggle('open');
      });
  
      // Listen for clicks anywhere to close the menu
      document.addEventListener('click', (e) => {
        const isClickInside = mainNav.contains(e.target) || menuBtn.contains(e.target);
        if (mainNav.classList.contains('open') && !isClickInside) {
          mainNav.classList.remove('open');
        }
      });
    }
  });