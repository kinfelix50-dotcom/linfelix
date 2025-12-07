// app.js - ShopZone E-Ticaret Uygulaması Ana Dosyası
import { db } from './database.js';
import { auth } from './auth.js';
import { router } from './router.js';
import { showToast } from './components/toast.js';
import { renderHeader } from './components/header.js';
import { updateCartCount } from './utils/cart-utils.js';

class ShopZoneApp {
    constructor() {
        this.isInitialized = false;
        this.currentUser = null;
        this.cartItems = [];
        this.init();
    }

    async init() {
        try {
            console.log('🛒 ShopZone uygulaması başlatılıyor...');
            
            // 1. Veritabanını başlat
            await this.initDatabase();
            
            // 2. Kimlik doğrulama durumunu kontrol et
            await this.initAuth();
            
            // 3. Header'ı render et
            await this.renderHeader();
            
            // 4. Router'ı başlat
            this.initRouter();
            
            // 5. Demo verileri oluştur (gerekirse)
            await this.createDemoData();
            
            // 6. Uygulama olay dinleyicilerini kur
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✅ ShopZone uygulaması başarıyla başlatıldı');
            
            // İlk sayfayı yükle
            router.handleRoute();
            
        } catch (error) {
            console.error('❌ Uygulama başlatılırken hata:', error);
            this.showError('Uygulama başlatılırken bir hata oluştu. Lütfen sayfayı yenileyin.');
        }
    }

    async initDatabase() {
        try {
            await db.init();
            console.log('✅ Veritabanı başlatıldı');
        } catch (error) {
            console.error('❌ Veritabanı başlatılırken hata:', error);
            throw error;
        }
    }

    async initAuth() {
        this.currentUser = auth.getUser();
        if (this.currentUser) {
            console.log(`👤 Kullanıcı oturumu açık: ${this.currentUser.name}`);
        }
    }

    async renderHeader() {
        try {
            await renderHeader();
            console.log('✅ Header render edildi');
        } catch (error) {
            console.error('❌ Header render edilirken hata:', error);
        }
    }

    initRouter() {
        router.init();
        console.log('✅ Router başlatıldı');
    }

    async createDemoData() {
        try {
            // Demo admin kullanıcısı oluştur (eğer yoksa)
            await this.createDemoAdmin();
            
            // Demo ürünleri kontrol et
            await this.checkDemoProducts();
            
        } catch (error) {
            console.error('❌ Demo veri oluşturulurken hata:', error);
        }
    }

    async createDemoAdmin() {
        try {
            const adminExists = await db.get('users', 'admin@shopzone.com');
            
            if (!adminExists) {
                await db.add('users', {
                    email: 'admin@shopzone.com',
                    password: 'admin123',
                    name: 'ShopZone Admin',
                    role: 'admin',
                    phone: '+90 555 123 4567',
                    address: 'İstanbul, Türkiye',
                    createdAt: new Date().toISOString()
                });
                
                console.log('👑 Demo admin kullanıcısı oluşturuldu');
                console.log('📧 Email: admin@shopzone.com');
                console.log('🔑 Şifre: admin123');
            }
            
            // Demo kullanıcı oluştur
            const userExists = await db.get('users', 'demo@shopzone.com');
            
            if (!userExists) {
                await db.add('users', {
                    email: 'demo@shopzone.com',
                    password: 'demo123',
                    name: 'Demo Kullanıcı',
                    role: 'user',
                    phone: '+90 555 987 6543',
                    address: 'Ankara, Türkiye',
                    createdAt: new Date().toISOString()
                });
                
                console.log('👤 Demo kullanıcı oluşturuldu');
                console.log('📧 Email: demo@shopzone.com');
                console.log('🔑 Şifre: demo123');
            }
            
        } catch (error) {
            console.error('❌ Demo kullanıcı oluşturulurken hata:', error);
        }
    }

    async checkDemoProducts() {
        try {
            const products = await db.getAll('products');
            
            if (products.length === 0) {
                console.log('📦 Demo ürünler ekleniyor...');
                
                const demoProducts = [
                    { 
                        name: 'iPhone 16 Pro', 
                        price: 64990, 
                        description: 'Yeni nesil iPhone ile tanışın. 48MP ana kamera, A18 Pro çip ve Dynamic Island.', 
                        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
                        category: 'telefon',
                        stock: 15,
                        rating: 4.8,
                        features: ['48MP Kamera', 'A18 Pro Çip', '120Hz Ekran', 'Face ID']
                    },
                    { 
                        name: 'MacBook Air M3', 
                        price: 48990, 
                        description: 'İnce, hafif ve güçlü. M3 çip ile yeni nesil performans.', 
                        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
                        category: 'bilgisayar',
                        stock: 8,
                        rating: 4.7,
                        features: ['M3 Çip', '13.6" Retina', '18 Saat Pil', '8GB RAM']
                    },
                    { 
                        name: 'AirPods Pro 2', 
                        price: 8990, 
                        description: 'Aktif gürültü engelleme ve uyarlanabilir şeffaflık ile ses kalitesinde devrim.', 
                        image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80',
                        category: 'kulaklık',
                        stock: 25,
                        rating: 4.6,
                        features: ['Gürültü Engelleme', 'Uyarlanabilir Şeffaflık', '24 Saat Pil', 'MagSafe']
                    },
                    { 
                        name: 'Apple Watch Ultra 2', 
                        price: 28990, 
                        description: 'Spor ve macera tutkunları için tasarlandı. En zorlu koşullara dayanıklı.', 
                        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
                        category: 'saat',
                        stock: 12,
                        rating: 4.9,
                        features: ['Titanyum Kasa', '100m Su Geçirmez', '36 Saat Pil', 'Çift Frekans GPS']
                    },
                    { 
                        name: 'iPad Pro M2', 
                        price: 32990, 
                        description: 'Profesyoneller için tablet. M2 çip ve Liquid Retina XDR ekran.', 
                        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
                        category: 'tablet',
                        stock: 10,
                        rating: 4.8,
                        features: ['M2 Çip', 'Liquid Retina XDR', '5G Desteği', 'Apple Pencil Uyumlu']
                    },
                    { 
                        name: 'Samsung Galaxy S24 Ultra', 
                        price: 34990, 
                        description: 'Yapay zeka destekli kamera ve S Pen ile profesyonel kullanım.', 
                        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
                        category: 'telefon',
                        stock: 20,
                        rating: 4.7,
                        features: ['200MP Kamera', 'S Pen', 'Snapdragon 8 Gen 3', '5000mAh Pil']
                    }
                ];
                
                for (const product of demoProducts) {
                    await db.add('products', {
                        ...product,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                }
                
                console.log(`✅ ${demoProducts.length} demo ürün eklendi`);
            } else {
                console.log(`📊 ${products.length} ürün bulundu`);
            }
            
        } catch (error) {
            console.error('❌ Demo ürünler kontrol edilirken hata:', error);
        }
    }

    setupEventListeners() {
        // Global olay dinleyicileri
        
        // Çevrimdışı/çevrimiçi durumunu izle
        window.addEventListener('online', () => {
            showToast('İnternet bağlantınız yeniden sağlandı', false);
        });
        
        window.addEventListener('offline', () => {
            showToast('İnternet bağlantınız kesildi. Çevrimdışı modda çalışıyorsunuz.', true);
        });
        
        // Sayfa görünürlüğünü izle
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // Sayfa tekrar görünür olduğunda sepet sayısını güncelle
                this.updateCartCount();
            }
        });
        
        // Global klavye kısayolları
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S -> Ara
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // ESC -> Modal kapat
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal-overlay');
                if (modal) {
                    modal.remove();
                }
            }
        });
        
        console.log('✅ Event listener\'lar kuruldu');
    }

    async updateCartCount() {
        try {
            await updateCartCount();
        } catch (error) {
            console.error('❌ Sepet sayısı güncellenirken hata:', error);
        }
    }

    showError(message) {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="card error-card">
                    <div class="error-state">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Uygulama Hatası</h3>
                        <p>${message}</p>
                        <div class="error-actions">
                            <button class="btn btn-primary" onclick="location.reload()">
                                <i class="fas fa-redo"></i>
                                Sayfayı Yenile
                            </button>
                            <button class="btn btn-outline" onclick="app.resetApp()">
                                <i class="fas fa-trash-alt"></i>
                                Uygulamayı Sıfırla
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    async resetApp() {
        if (confirm('Uygulamayı sıfırlamak istediğinize emin misiniz? Tüm verileriniz silinecek!')) {
            try {
                // IndexedDB'yi temizle
                const databases = await indexedDB.databases();
                for (const database of databases) {
                    indexedDB.deleteDatabase(database.name);
                }
                
                // LocalStorage'ı temizle
                localStorage.clear();
                sessionStorage.clear();
                
                // Çerezleri temizle
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                
                showToast('Uygulama sıfırlandı. Sayfa yeniden yükleniyor...');
                
                // Sayfayı yenile
                setTimeout(() => {
                    location.reload();
                }, 1500);
                
            } catch (error) {
                console.error('❌ Uygulama sıfırlanırken hata:', error);
                showToast('Uygulama sıfırlanırken bir hata oluştu', true);
            }
        }
    }

    // Uygulama durumunu kontrol et
    checkAppStatus() {
        return {
            initialized: this.isInitialized,
            user: this.currentUser ? 'logged_in' : 'guest',
            online: navigator.onLine,
            database: db.db ? 'connected' : 'disconnected',
            timestamp: new Date().toISOString()
        };
    }

    // Uygulama ayarlarını kaydet
    async saveSettings(settings) {
        try {
            await db.add('settings', {
                id: 'app_settings',
                ...settings,
                updatedAt: new Date().toISOString()
            });
            return true;
        } catch (error) {
            console.error('❌ Ayarlar kaydedilirken hata:', error);
            return false;
        }
    }

    // Uygulama ayarlarını yükle
    async loadSettings() {
        try {
            const settings = await db.get('settings', 'app_settings');
            return settings || {};
        } catch (error) {
            console.error('❌ Ayarlar yüklenirken hata:', error);
            return {};
        }
    }

    // Uygulama istatistiklerini al
    async getAppStats() {
        try {
            const products = await db.getAll('products');
            const users = await db.getAll('users');
            const cartItems = await db.getAll('cart');
            
            return {
                products: products.length,
                users: users.length,
                cartItems: cartItems.length,
                totalProductValue: products.reduce((sum, product) => sum + product.price, 0),
                categories: [...new Set(products.map(p => p.category))],
                activeUsers: users.filter(u => u.lastLogin).length
            };
        } catch (error) {
            console.error('❌ İstatistikler alınırken hata:', error);
            return null;
        }
    }
}

// Uygulamayı başlat
const app = new ShopZoneApp();

// Global erişim için
window.app = app;
window.auth = auth;
window.router = router;
window.db = db;

// Global yardımcı fonksiyonlar
window.logout = () => {
    if (auth.logout()) {
        router.navigate('home');
    }
};

window.goToCart = () => {
    router.navigate('cart');
};

window.goToHome = () => {
    router.navigate('home');
};

window.goToLogin = () => {
    router.navigate('login');
};

window.showAppStatus = () => {
    const status = app.checkAppStatus();
    console.table(status);
    showToast(`Uygulama durumu: ${status.initialized ? 'Aktif' : 'Pasif'}`, false);
};

// Uygulama kısayolları için klavye olayları
document.addEventListener('keydown', (e) => {
    // F1 - Yardım
    if (e.key === 'F1') {
        e.preventDefault();
        showToast('ShopZone E-Ticaret v1.0.0 - F1: Yardım | F5: Yenile | ESC: Kapat', false);
    }
    
    // F5 - Sayfayı yenile
    if (e.key === 'F5') {
        e.preventDefault();
        showToast('Sayfa yenileniyor...', false);
        setTimeout(() => location.reload(), 500);
    }
    
    // Ctrl/Cmd + L - Sepete git
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        router.navigate('cart');
    }
    
    // Ctrl/Cmd + H - Ana sayfaya git
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        router.navigate('home');
    }
});

// Hata yakalama
window.addEventListener('error', (event) => {
    console.error('Global hata:', event.error);
    
    // Kritik olmayan hataları göster
    if (!event.error.message.includes('Critical')) {
        showToast(`Bir hata oluştu: ${event.error.message}`, true);
    }
});

// Promise hatalarını yakala
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise hatası:', event.reason);
    showToast('Bir işlem sırasında hata oluştu', true);
});

// Uygulama hazır olduğunda
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 ShopZone E-Ticaret uygulaması hazır!');
    
    // Uygulama başlangıç animasyonu
    setTimeout(() => {
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.style.opacity = '1';
            appContainer.style.transition = 'opacity 0.5s ease-in';
        }
    }, 100);
});

export default app;