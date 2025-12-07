import { db } from '../database.js';

export function initFilters() {
    const filterCategory = document.getElementById('filter-category');
    const filterPriceMin = document.getElementById('filter-price-min');
    const filterPriceMax = document.getElementById('filter-price-max');
    const filterSort = document.getElementById('filter-sort');
    const applyFiltersBtn = document.getElementById('apply-filters');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    // Kategorileri yükle
    loadCategories();
}

async function loadCategories() {
    try {
        const products = await db.getAll('products');
        const categories = [...new Set(products.map(p => p.category))];
        
        const filterCategory = document.getElementById('filter-category');
        if (filterCategory) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                filterCategory.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
    }
}

async function applyFilters() {
    const category = document.getElementById('filter-category').value;
    const priceMin = document.getElementById('filter-price-min').value;
    const priceMax = document.getElementById('filter-price-max').value;
    const sort = document.getElementById('filter-sort').value;
    
    try {
        let products = await db.getAll('products');
        
        // Kategori filtresi
        if (category) {
            products = products.filter(p => p.category === category);
        }
        
        // Fiyat filtresi
        if (priceMin) {
            products = products.filter(p => p.price >= parseFloat(priceMin));
        }
        if (priceMax) {
            products = products.filter(p => p.price <= parseFloat(priceMax));
        }
        
        // Sıralama
        switch(sort) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                products.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        
        displayFilteredProducts(products);
        
    } catch (error) {
        console.error('Filtre uygulanırken hata:', error);
    }
}

function displayFilteredProducts(products) {
    const mainContent = document.getElementById('main-content');
    
    if (products.length === 0) {
        mainContent.innerHTML = `
            <div class="card">
                <div class="empty-state">
                    <i class="fas fa-filter"></i>
                    <h3>Filtrelere uygun ürün bulunamadı</h3>
                    <p>Lütfen farklı filtreler deneyin.</p>
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
            <i class="fas fa-filter"></i>
            <span>Filtrelenmiş Ürünler (${products.length} ürün)</span>
        </div>
        <div class="products-grid">
            ${productsHTML}
        </div>
    `;
}