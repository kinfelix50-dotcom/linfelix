import { db } from '../database.js';
import { showToast } from './toast.js';

export function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

async function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        showToast('Lütfen arama terimi girin', true);
        return;
    }
    
    try {
        const products = await db.getAll('products');
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(filteredProducts, searchTerm);
        
    } catch (error) {
        console.error('Arama sırasında hata:', error);
        showToast('Arama sırasında bir hata oluştu', true);
    }
}

function displaySearchResults(products, searchTerm) {
    const mainContent = document.getElementById('main-content');
    
    if (products.length === 0) {
        mainContent.innerHTML = `
            <div class="page-title">
                <i class="fas fa-search"></i>
                <span>"${searchTerm}" için arama sonuçları</span>
            </div>
            <div class="card">
                <div class="empty-state">
                    <i class="fas fa-search-minus"></i>
                    <h3>Sonuç bulunamadı</h3>
                    <p>"${searchTerm}" için herhangi bir ürün bulunamadı.</p>
                </div>
            </div>
        `;
        return;
    }
    
    const productsHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="product-category">${product.category}</span>
                    <span class="product-stock">Stok: ${product.stock}</span>
                </div>
                <div class="product-price">${new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                    minimumFractionDigits: 0
                }).format(product.price)}</div>
                <button class="btn btn-primary btn-block add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i>
                    Sepete Ekle
                </button>
            </div>
        </div>
    `).join('');
    
    mainContent.innerHTML = `
        <div class="page-title">
            <i class="fas fa-search"></i>
            <span>"${searchTerm}" için arama sonuçları (${products.length} ürün)</span>
        </div>
        <div class="products-grid">
            ${productsHTML}
        </div>
    `;
}