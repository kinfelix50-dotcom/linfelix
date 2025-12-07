import { db } from '../database.js';
import { formatPrice } from '../ui.js';
import { showToast } from '../components/toast.js';
import { router } from '../router.js';

export async function renderCartPage() {
    const mainContent = document.getElementById('main-content');
    
    try {
        const cartItems = await db.getAll('cart');
        const products = await db.getAll('products');
        
        // Sepet öğelerini ürün bilgileriyle eşleştir
        const cartWithDetails = await Promise.all(
            cartItems.map(async (item) => {
                const product = await db.get('products', item.productId);
                return {
                    ...item,
                    product: product || {
                        name: 'Ürün bulunamadı',
                        price: 0,
                        image: '',
                        description: ''
                    }
                };
            })
        );
        
        let cartHTML = '';
        let totalPrice = 0;
        
        if (cartWithDetails.length === 0) {
            cartHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Sepetiniz Boş</h3>
                    <p>Alışverişe başlamak için ürün ekleyin</p>
                    <button class="btn btn-primary" id="continueShopping">
                        <i class="fas fa-store"></i>
                        Alışverişe Devam Et
                    </button>
                </div>
            `;
        } else {
            cartHTML = cartWithDetails.map(item => {
                const itemTotal = item.quantity * item.product.price;
                totalPrice += itemTotal;
                
                return `
                    <div class="cart-item">
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
                            <div class="cart-item-total">${formatPrice(itemTotal)}</div>
                            <button class="btn btn-danger btn-sm remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
            
            const shippingCost = totalPrice > 500 ? 0 : 25;
            const grandTotal = totalPrice + shippingCost;
            
            cartHTML += `
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Ara Toplam:</span>
                        <span>${formatPrice(totalPrice)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Kargo:</span>
                        <span>${shippingCost === 0 ? 'Ücretsiz' : formatPrice(shippingCost)}</span>
                    </div>
                    <div class="summary-row total">
                        <span>TOPLAM:</span>
                        <span>${formatPrice(grandTotal)}</span>
                    </div>
                    <button class="btn btn-success btn-block" id="completeOrder">
                        <i class="fas fa-check-circle"></i>
                        Siparişi Tamamla
                    </button>
                </div>
            `;
        }
        
        mainContent.innerHTML = `
            <div class="page-title">
                <i class="fas fa-shopping-cart"></i>
                <span>Sepetim</span>
            </div>
            
            <div class="cart-items">
                ${cartHTML}
            </div>
        `;
        
        // Event listener'ları ekle
        attachCartEventListeners();
        
    } catch (error) {
        console.error('Sepet yüklenirken hata:', error);
        mainContent.innerHTML = `
            <div class="card">
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Sepet yüklenirken bir hata oluştu</h3>
                    <p>Lütfen sayfayı yenileyin</p>
                </div>
            </div>
        `;
    }
}

function attachCartEventListeners() {
    // Alışverişe devam et
    document.getElementById('continueShopping')?.addEventListener('click', () => {
        router.navigate('home');
    });
    
    // Miktar azalt
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', async (e) => {
            const itemId = parseInt(e.currentTarget.getAttribute('data-id'));
            await updateCartItemQuantity(itemId, -1);
        });
    });
    
    // Miktar artır
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', async (e) => {
            const itemId = parseInt(e.currentTarget.getAttribute('data-id'));
            await updateCartItemQuantity(itemId, 1);
        });
    });
    
    // Ürünü kaldır
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', async (e) => {
            const itemId = parseInt(e.currentTarget.getAttribute('data-id'));
            await removeCartItem(itemId);
        });
    });
    
    // Siparişi tamamla
    document.getElementById('completeOrder')?.addEventListener('click', async () => {
        await completeOrder();
    });
}

async function updateCartItemQuantity(itemId, change) {
    try {
        const cartItem = await db.get('cart', itemId);
        const product = await db.get('products', cartItem.productId);
        
        const newQuantity = cartItem.quantity + change;
        
        if (newQuantity < 1) {
            await removeCartItem(itemId);
            return;
        }
        
        // Stok kontrolü
        if (newQuantity > product.stock) {
            showToast('Stokta yeterli ürün yok', true);
            return;
        }
        
        cartItem.quantity = newQuantity;
        await db.put('cart', cartItem);
        
        // Sepet sayfasını yeniden yükle
        await renderCartPage();
        updateCartCount();
        
    } catch (error) {
        console.error('Sepet güncelleme hatası:', error);
        showToast('Sepet güncellenirken bir hata oluştu', true);
    }
}

async function removeCartItem(itemId) {
    if (!confirm('Bu ürünü sepetten kaldırmak istediğinize emin misiniz?')) {
        return;
    }
    
    try {
        await db.delete('cart', itemId);
        showToast('Ürün sepetten kaldırıldı');
        
        // Sepet sayfasını yeniden yükle
        await renderCartPage();
        updateCartCount();
        
    } catch (error) {
        console.error('Sepetten kaldırma hatası:', error);
        showToast('Ürün kaldırılırken bir hata oluştu', true);
    }
}

async function completeOrder() {
    try {
        const cartItems = await db.getAll('cart');
        
        if (cartItems.length === 0) {
            showToast('Sepetiniz boş', true);
            return;
        }
        
        // Stok kontrolü yap
        for (const item of cartItems) {
            const product = await db.get('products', item.productId);
            if (item.quantity > product.stock) {
                showToast(`${product.name} ürününden stokta yeterli yok`, true);
                return;
            }
        }
        
        // Stokları güncelle
        for (const item of cartItems) {
            const product = await db.get('products', item.productId);
            product.stock -= item.quantity;
            await db.put('products', product);
        }
        
        // Sepeti temizle
        await db.clear('cart');
        
        showToast('Siparişiniz alındı! Teşekkür ederiz.');
        
        // Ana sayfaya yönlendir
        setTimeout(() => {
            router.navigate('home');
            updateCartCount();
        }, 1500);
        
    } catch (error) {
        console.error('Sipariş tamamlama hatası:', error);
        showToast('Sipariş tamamlanırken bir hata oluştu', true);
    }
}

function updateCartCount() {
    // Header'daki sepet sayısını güncelle
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        db.getAll('cart').then(items => {
            cartCount.textContent = items.length;
        });
    }
}