const CART_KEY = "cart";

const state = {
    products: [
        { id: 1, name: "Mandazi (pack of 6)", price: 120 },
        { id: 2, name: "Chapati (pack of 5)", price: 150 },
        { id: 3, name: "Tea leaves 250g", price: 180 },
    ],
    cart: loadCart(), // { productId, quantity }
};

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find((p) => p.id === item.productId);
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}
function addToCart(productId) {
    const existing = state.cart.find((item) => item.productId === productId);

    if (existing) {
        state.cart = state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        state.cart = [...state.cart, { productId, quantity: 1 }];
    }

    commit();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    state.cart = state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
    );
    commit();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
    commit();
}

function clearCart() {
    state.cart = [];
    commit();
}

function commit() {
    saveCart();
    render();
}
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearBtn = document.getElementById("clear-cart");

function render() {
    // Products
    productList.textContent = "";
    state.products.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - KSh ${product.price} `;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Add to Cart";
        btn.dataset.action = "add";
        btn.dataset.id = product.id;

        li.appendChild(btn);
        productList.appendChild(li);
    });

    // Cart
    cartList.textContent = "";
    state.cart.forEach((item) => {
        const product = state.products.find((p) => p.id === item.productId);
        if (!product) {
            return;
        }

        const li = document.createElement("li");
        li.textContent = `${product.name} x ${item.quantity} `;

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "-";
        minus.dataset.action = "decrease";
        minus.dataset.id = product.id;

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.dataset.action = "increase";
        plus.dataset.id = product.id;

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Remove";
        remove.dataset.action = "remove";
        remove.dataset.id = product.id;

        li.append(minus, plus, remove);
        cartList.appendChild(li);
    });

    cartCount.textContent = getCartCount();
    cartTotal.textContent = getCartTotal();
}

// One listener for all buttons (event delegation)
document.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-action]");
    if (!btn) {
        return;
    }

    const id = Number(btn.dataset.id);
    const item = state.cart.find((i) => i.productId === id);

    if (btn.dataset.action === "add") {
        addToCart(id);
    } else if (btn.dataset.action === "increase") {
        updateQuantity(id, item.quantity + 1);
    } else if (btn.dataset.action === "decrease") {
        updateQuantity(id, item.quantity - 1);
    } else if (btn.dataset.action === "remove") {
        removeFromCart(id);
    }
});

clearBtn.addEventListener("click", clearCart);

render();
