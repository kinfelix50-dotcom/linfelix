// cart-utils.js - Sepet işlemleri için yardımcı fonksiyonlar
import { db } from '../database.js';

export async function updateCartCount() {
    try {
        const cartItems = await db.getAll('cart');
        const cartCount = cartItems.length;
        
        // Header'daki sepet sayısını güncelle
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
            element.style.display = cartCount > 0 ? 'flex' : 'none';
        });
        
        return cartCount;
    } catch (error) {
        console.error('Sepet sayısı güncellenirken hata:', error);
        return 0;
    }
}

export async function addToCart(productId, quantity = 1) {
    try {
        const product = await db.get('products', productId);
        
        if (!product) {
            throw new Error('Ürün bulunamadı');
        }
        
        // Stok kontrolü
        if (product.stock < quantity) {
            throw new Error('Yeterli stok yok');
        }
        
        // Sepette bu ürün var mı kontrol et
        const cartItems = await db.getAll('cart');
        const existingItem = cartItems.find(item => item.productId === productId);
        
        if (existingItem) {
            // Miktarı artır
            existingItem.quantity += quantity;
            await db.put('cart', existingItem);
        } else {
            // Yeni ürün ekle
            await db.add('cart', {
                productId,
                quantity,
                addedAt: new Date().toISOString(),
                price: product.price
            });
        }
        
        // Sepet sayısını güncelle
        await updateCartCount();
        
        return { success: true, product };
    } catch (error) {
        console.error('Sepete ekleme hatası:', error);
        return { success: false, error: error.message };
    }
}

export async function removeFromCart(cartItemId) {
    try {
        await db.delete('cart', cartItemId);
        await updateCartCount();
        return { success: true };
    } catch (error) {
        console.error('Sepetten kaldırma hatası:', error);
        return { success: false, error: error.message };
    }
}

export async function updateCartItemQuantity(cartItemId, quantity) {
    try {
        const cartItem = await db.get('cart', cartItemId);
        
        if (!cartItem) {
            throw new Error('Sepet öğesi bulunamadı');
        }
        
        // Ürün bilgilerini al
        const product = await db.get('products', cartItem.productId);
        
        // Stok kontrolü
        if (product.stock < quantity) {
            throw new Error('Yeterli stok yok');
        }
        
        cartItem.quantity = quantity;
        await db.put('cart', cartItem);
        
        return { success: true, cartItem };
    } catch (error) {
        console.error('Sepet miktarı güncellenirken hata:', error);
        return { success: false, error: error.message };
    }
}

export async function getCartTotal() {
    try {
        const cartItems = await db.getAll('cart');
        let total = 0;
        
        for (const item of cartItems) {
            const product = await db.get('products', item.productId);
            if (product) {
                total += product.price * item.quantity;
            }
        }
        
        return total;
    } catch (error) {
        console.error('Sepet toplamı hesaplanırken hata:', error);
        return 0;
    }
}

export async function clearCart() {
    try {
        await db.clear('cart');
        await updateCartCount();
        return { success: true };
    } catch (error) {
        console.error('Sepet temizlenirken hata:', error);
        return { success: false, error: error.message };
    }
}

export async function getCartWithDetails() {
    try {
        const cartItems = await db.getAll('cart');
        const cartWithDetails = [];
        
        for (const item of cartItems) {
            const product = await db.get('products', item.productId);
            if (product) {
                cartWithDetails.push({
                    ...item,
                    product: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        description: product.description,
                        stock: product.stock
                    },
                    total: product.price * item.quantity
                });
            }
        }
        
        return cartWithDetails;
    } catch (error) {
        console.error('Sepet detayları alınırken hata:', error);
        return [];
    }
}