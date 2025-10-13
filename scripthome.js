document.addEventListener('DOMContentLoaded', () => {

    function createSlider(sliderId, prevBtnId, nextBtnId) {
      const slider = document.getElementById(sliderId);
      if (!slider) return;
      const slides = slider.querySelector('.slides');
      const images = slides.querySelectorAll('img');
      const prevBtn = document.getElementById(prevBtnId);
      const nextBtn = document.getElementById(nextBtnId);
      let perPage = getPerPage();
      let pages = Math.ceil(images.length / perPage);
      let current = 0;
      function getPerPage() {
        const w = window.innerWidth;
        if (w <= 768) return 1;
        if (w <= 992) return 2;
        return 3;
      }
      function updateMeasurements() {
        perPage = getPerPage();
        pages = Math.ceil(images.length / perPage);
        if (current >= pages) current = pages - 1;
        if (pages > 0) {
            const offset = current * slider.clientWidth;
            slides.style.transform = `translateX(-${offset}px)`;
        }
      }
      nextBtn.addEventListener('click', () => {
        if (pages > 0) {
          current = (current + 1) % pages;
          updateMeasurements();
          animateBtn(nextBtn);
        }
      });
      prevBtn.addEventListener('click', () => {
        if (pages > 0) {
          current = (current - 1 + pages) % pages;
          updateMeasurements();
          animateBtn(prevBtn);
        }
      });
      let startX = 0;
      slides.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
      slides.addEventListener('touchend', (e) => {
        const diff = (e.changedTouches[0].clientX - startX);
        if (Math.abs(diff) > 50) {
          if (diff < 0) {
              if (pages > 0) current = (current + 1) % pages;
          } else {
              if (pages > 0) current = (current - 1 + pages) % pages;
          }
          updateMeasurements();
        }
      }, { passive: true });
      window.addEventListener('resize', updateMeasurements);
      updateMeasurements();
    }
    function animateBtn(btn) {
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => { btn.style.transform = ''; }, 150);
    }
    createSlider('mainSlider', 'prev', 'next');
    createSlider('shopSlider', 'shopPrev', 'shopNext');
    const header = document.querySelector('.main-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 10) header.classList.add('sticky-shadow');
        else header.classList.remove('sticky-shadow');
      });
    }
    const logo = document.querySelector('.logo a, .logo img');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    const menuBtn = document.querySelector('.menu-btn');
    const mainNav = document.querySelector('.main-nav');
    if (menuBtn && mainNav) {
      menuBtn.addEventListener('click', e => {
        e.preventDefault();
        mainNav.classList.toggle('open');
      });
      document.addEventListener('click', e => {
        const isClickInside = mainNav.contains(e.target) || menuBtn.contains(e.target);
        if (mainNav.classList.contains('open') && !isClickInside) {
          mainNav.classList.remove('open');
        }
      });
    }
  
    // Api
  
    const GNEWS_API_KEY = "5a77b281a86643b6cd735c505e56f133";
    const newsGrid = document.getElementById('newsArticles');
    
    if (newsGrid) {
      const API_URL = `https://gnews.io/api/v4/search?q=fashion&lang=en&max=3&apikey=${GNEWS_API_KEY}`;
      
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          if (data.articles) {
            newsGrid.innerHTML = '';
            data.articles.forEach(article => {
              const card = document.createElement('a');
              card.className = 'news-card';
              card.href = article.url;
              card.target = '_blank';
              
              const imageUrl = article.image ? article.image : 'Images/oct2.png'; 
              
              card.innerHTML = `
                <img src="${imageUrl}" alt="${article.title}">
                <div class="news-card-content">
                  <p class="news-source">${article.source.name}</p>
                  <h3 class="news-card-title">${article.title}</h3>
                </div>
              `;
              newsGrid.appendChild(card);
            });
          } else {
            newsGrid.innerHTML = "<p>Could not load news articles.</p>";
          }
        })
        .catch(error => {
          console.error("GNews API Error:", error);
          newsGrid.innerHTML = "<p>Error loading news. Check the console for details.</p>";
        });
    }
  
  });