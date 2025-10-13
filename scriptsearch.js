document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortOrder = document.getElementById('sortOrder');
  const resultsContainer = document.getElementById('resultsContainer');
  const noResults = document.getElementById('noResults');
  const resultsInfo = document.querySelector('.results-info');
  let articles = [];
  

  fetch('data.json')
  .then(res => res.json())
  .then(data => {
  articles = data;
  })
  .catch(error => {
  console.error("Error fetching data.json:", error);
  resultsInfo.textContent = "Could not load articles. Please check the console for errors.";
  });
  
  document.querySelectorAll('.custom-select').forEach(setupCustomSelect);
  function setupCustomSelect(customSelect) {
  const trigger = customSelect.querySelector('.custom-select-trigger');
  const options = customSelect.querySelectorAll('.custom-option');
  const hiddenSelect = document.getElementById(customSelect.dataset.target);
  
  trigger.addEventListener('click', () => customSelect.classList.toggle('open'));
  options.forEach(option => {
  option.addEventListener('click', () => {
  options.forEach(opt => opt.classList.remove('selected'));
  option.classList.add('selected');
  trigger.textContent = option.textContent;
  customSelect.classList.remove('open');
  hiddenSelect.value = option.dataset.value;
  hiddenSelect.dispatchEvent(new Event('change'));
  });
  });
  }
  window.addEventListener('click', (e) => {
  document.querySelectorAll('.custom-select').forEach(select => {
  if (!select.contains(e.target)) select.classList.remove('open');
  });
  });
  
  function updateResults() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
  resultsContainer.innerHTML = '';
  noResults.style.display = 'none';
  resultsInfo.textContent = "";
  return;
  }
  let filteredArticles = [...articles].filter(article =>
  (article.title && article.title.toLowerCase().includes(query)) ||
  (article.name && article.name.toLowerCase().includes(query)) ||
  (article.category && article.category.toLowerCase().includes(query)) ||
  (article.brand && article.brand.toLowerCase().includes(query)) ||
  (article.content && article.content.toLowerCase().includes(query)) 
  );
  const category = categoryFilter.value;
  if (category !== 'all') {
  filteredArticles = filteredArticles.filter(article => article.category === category);
  }
  const sortBy = sortOrder.value;
  if (sortBy !== 'default') {
  filteredArticles.sort((a, b) => {
  if (sortBy.startsWith('price')) {
  const priceA = a.price ? parseFloat(a.price.replace(/[^0-9.-]+/g, "")) : -1;
  const priceB = b.price ? parseFloat(b.price.replace(/[^0-9.-]+/g, "")) : -1;
  if (priceA === -1) return 1; if (priceB === -1) return -1;
  return sortBy === 'price-asc' ? priceA - priceB : priceB - priceA;
  }
  if (sortBy.startsWith('name')) {
  const nameA = (a.title || a.name || '').toLowerCase();
  const nameB = (b.title || b.name || '').toLowerCase();
  if (nameA < nameB) return sortBy === 'name-asc' ? -1 : 1;
  if (nameA > nameB) return sortBy === 'name-asc' ? 1 : -1;
  return 0;
  }
  return 0;
  });
  }
  resultsInfo.textContent = `Showing ${filteredArticles.length} result${filteredArticles.length !== 1 ? 's' : ''} for “${searchInput.value}”`;
  renderArticles(filteredArticles);
  }
  
  function renderArticles(list) {
  resultsContainer.innerHTML = '';
  noResults.style.display = list.length === 0 ? 'block' : 'none';
  list.forEach(article => {
  const card = document.createElement('div');
  card.classList.add('fashion-card');
  const title = article.title || article.name || "Untitled";
  card.innerHTML = `
  <img src="${article.image}" alt="${title}" class="fashion-img">
  <div class="fashion-text">
  <h4 class="fashion-category">${article.category}</h4>
  <h2 class="fashion-title">${title}</h2>
  ${article.author ? `<span class="author">${article.author}</span><br>` : ''}
  ${article.date ? `<span class="date">${article.date}</span>` : ''}
  ${article.brand ? `<p class="brand">Brand: ${article.brand}</p>` : ''}
  ${article.description ? `<p class="desc">${article.description}</p>` : ''}
  ${article.price ? `<p class="price">Price: ${article.price}</p>` : ''}
  </div>`;
  resultsContainer.appendChild(card);
  });
  }
  
  searchBtn.addEventListener('click', updateResults);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') updateResults(); });
  categoryFilter.addEventListener('change', updateResults);
  sortOrder.addEventListener('change', updateResults);
  
  
  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', (e) => {
  e.preventDefault();
  mainNav.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
  if (!mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
  mainNav.classList.remove('open');
  }
  });
  }
  });

  