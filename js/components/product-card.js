import { formatPrice } from '../ui.js';

export function createProductCard(product, onAddToCart) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-meta">
                <span class="product-category">${product.category}</span>
                <span class="product-stock">Stok: ${product.stock}</span>
            </div>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="btn btn-primary btn-block add-to-cart" data-id="${product.id}">
                <i class="fas fa-cart-plus"></i>
                Sepete Ekle
            </button>
        </div>
    `;
    
    const addButton = card.querySelector('.add-to-cart');
    addButton.addEventListener('click', () => onAddToCart(product.id));
    
    return card;
}