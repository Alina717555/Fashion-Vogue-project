document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.querySelector('.main-nav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mainNav.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      const isClickInside = mainNav.contains(e.target) || menuBtn.contains(e.target);
      if (mainNav.classList.contains('open') && !isClickInside) {
        mainNav.classList.remove('open');
      }
    });
  }
});
