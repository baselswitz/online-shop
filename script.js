let products = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch JSON data
fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
    populateCategories();
  });

// Render Products
function renderProducts(list) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  list.forEach(prod => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" />
      <h3>${prod.name}</h3>
      <p>💲${prod.price}</p>
      <p>Category: ${prod.category}</p>
      <button onclick="toggleFavorite(${prod.id})" class="${favorites.includes(prod.id) ? 'favorite' : ''}">
        ${favorites.includes(prod.id) ? "❤️ Favorited" : "🤍 Favorite"}
      </button>
      <button onclick="addToCart(${prod.id})">🛒 Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Populate category filter
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

// Filter by category
document.getElementById("categoryFilter").addEventListener("change", (e) => {
  const value = e.target.value;
  const filtered = value === "all" ? products : products.filter(p => p.category === value);
  renderProducts(filtered);
});

// Sort by price
document.getElementById("priceSort").addEventListener("change", (e) => {
  const value = e.target.value;
  let sorted = [...products];
  if (value === "low-high") sorted.sort((a,b) => a.price - b.price);
  else if (value === "high-low") sorted.sort((a,b) => b.price - a.price);
  renderProducts(sorted);
});

// Favorite toggle
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderProducts(products);
}

// Add to cart
function addToCart(id) {
  const item = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}
