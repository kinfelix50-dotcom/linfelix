import { auth } from '../auth.js';
import { router } from '../router.js';
import { db } from '../database.js';

export async function renderHeader() {
    const user = auth.getUser();
    const cartItems = await db.getAll('cart');
    const cartCount = cartItems.length;
    
    const headerHTML = `
        <header>
            <a href="#home" class="logo" data-route="home">
                <i class="fas fa-shopping-bag"></i>
                <span>ShopZone</span>
            </a>
            
            <nav class="nav-links">
                <a href="#home" class="nav-link" data-route="home">
                    <i class="fas fa-home"></i>
                    <span>Ana Sayfa</span>
                </a>
                
                <a href="#cart" class="nav-link cart-icon" data-route="cart">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Sepet</span>
                    ${cartCount > 0 ? `<span class="cart-count">${cartCount}</span>` : ''}
                </a>
                
                ${user ? `
                    ${auth.isAdmin() ? `
                        <a href="#admin" class="nav-link" data-route="admin">
                            <i class="fas fa-cog"></i>
                            <span>Admin</span>
                        </a>
                    ` : ''}
                    
                    <div class="user-menu">
                        <button class="nav-link" id="userMenuBtn">
                            <i class="fas fa-user"></i>
                            <span>${user.name}</span>
                        </button>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">Profilim</a>
                            <a href="#" class="dropdown-item">Siparişlerim</a>
                            <hr>
                            <a href="#" class="dropdown-item" id="logoutBtn">Çıkış Yap</a>
                        </div>
                    </div>
                ` : `
                    <a href="#login" class="nav-link" data-route="login">
                        <i class="fas fa-sign-in-alt"></i>
                        <span>Giriş Yap</span>
                    </a>
                `}
            </nav>
        </header>
    `;
    
    // Header'ı ekle veya güncelle
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
        existingHeader.outerHTML = headerHTML;
    } else {
        document.getElementById('app').insertAdjacentHTML('afterbegin', headerHTML);
    }
    
    // Event listener'ları ekle
    attachHeaderEventListeners();
}

function attachHeaderEventListeners() {
    // Çıkış butonu
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (auth.logout()) {
            router.navigate('home');
        }
    });
    
    // Kullanıcı menüsü
    document.getElementById('userMenuBtn')?.addEventListener('click', (e) => {
        e.stopPropagation();