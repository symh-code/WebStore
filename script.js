// Función para cargar los productos desde la API
async function loadProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  const productGrid = document.querySelector('.product-grid');
  const productFilter = document.getElementById('product-filter');

  // Limitar los productos a 16
  const limitedProducts = products.slice(0, 16);

  limitedProducts.forEach(product => {
      // Crear cada card
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>Precio: $${product.price}</p>
      `;
      productCard.setAttribute('data-id', product.id);
      productGrid.appendChild(productCard);

      // Agregar opción al filtro
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.title;
      productFilter.appendChild(option);
  });
}

// Función para filtrar productos
function filterProducts() {
  const productGrid = document.querySelector('.product-grid');
  const productCards = productGrid.querySelectorAll('.product-card');
  const selectedProduct = document.getElementById('product-filter').value;

  productCards.forEach(card => {
      if (selectedProduct === 'all') {
          card.style.display = 'block';
      } else {
          card.style.display = card.getAttribute('data-id') === selectedProduct ? 'block' : 'none';
      }
  });
}

// Inicializar la página
window.onload = function() {
  loadProducts();

  // Agregar evento al filtro
  document.getElementById('product-filter').addEventListener('change', filterProducts);
};
