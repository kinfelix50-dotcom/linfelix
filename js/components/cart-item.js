import { formatPrice } from '../ui.js';

export function createCartItem(item, onUpdateQuantity, onRemove) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
        <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
        <div class="cart-item-details">
            <h4 class="cart-item-name">${item.product.name}</h4>
            <p class="cart-item-description">${item.product.description}</p>
            <div class="cart-item-price">${formatPrice(item.product.price)}</div>
        </div>
        <div class="cart-item-controls">
            <div class="quantity-control">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">${formatPrice(item.product.price * item.quantity)}</div>
            <button class="btn btn-danger btn-sm remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Event listener'ları ekle
    const decreaseBtn = itemElement.querySelector('.decrease');
    const increaseBtn = itemElement.querySelector('.increase');
    const removeBtn = itemElement.querySelector('.remove');
    
    decreaseBtn.addEventListener('click', () => onUpdateQuantity(item.id, -1));
    increaseBtn.addEventListener('click', () => onUpdateQuantity(item.id, 1));
    removeBtn.addEventListener('click', () => onRemove(item.id));
    
    return itemElement;
}