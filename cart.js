let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const container = document.getElementById("cartContainer");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty 🛒</p>";
    return;
  }

  cart.forEach(item => {
    const card = document.createElement("div");
    card.className = "cart-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>💲${item.price}</p>
      <p>Quantity: 
        <button onclick="updateQty(${item.id}, -1)">➖</button>
        ${item.qty}
        <button onclick="updateQty(${item.id}, 1)">➕</button>
      </p>
      <button onclick="removeFromCart(${item.id})" style="background:#ff0066;color:#fff;">🗑 Remove</button>
    `;
    container.appendChild(card);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalDiv = document.createElement("div");
  totalDiv.className = "total-section";
  totalDiv.innerHTML = `<strong>Total: 💲${total.toFixed(2)}</strong>`;
  container.appendChild(totalDiv);
}

function updateQty(id, change) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) removeFromCart(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
