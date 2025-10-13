document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fashion-card, .must-grid article');

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

  animatedElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 50}ms`;
    observer.observe(element);
  });

  const tiltCards = document.querySelectorAll('.fashion-grid .fashion-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;  

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8; 
      const rotateY = ((x - centerX) / centerX) * 8;   
     
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
     
      card.style.transform = 'none';
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
  });


  document.querySelectorAll('.main-nav a').forEach(a => {
    if (a.textContent.trim().toUpperCase() === 'FASHION') a.classList.add('active');
  });

  const mustThird = document.getElementById('must-third');
  if (mustThird) {
    mustThird.addEventListener('click', () => {
      mustThird.style.transform = 'scale(0.98)';
      mustThird.style.transition = 'transform .12s ease';
      setTimeout(() => window.location.href = 'mustread.html', 180);
    });
    mustThird.setAttribute('tabindex','0');
    mustThird.addEventListener('keypress', e => {
      if (e.key === 'Enter' || e.key === ' ') mustThird.click();
    });
  }

  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.querySelector('.main-nav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', e => {
      e.preventDefault();
      mainNav.classList.toggle('open');
    });
  }

  document.addEventListener('click', e => {
    const isClickInside = mainNav.contains(e.target) || menuBtn.contains(e.target);
    if (mainNav.classList.contains('open') && !isClickInside) {
      mainNav.classList.remove('open');
    }
  });
});