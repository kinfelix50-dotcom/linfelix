import { auth } from './auth.js';
import { renderHeader } from './components/header.js';
import { renderHomePage } from './pages/home.js';
import { renderLoginPage } from './pages/login.js';
import { renderCartPage } from './pages/cart.js';
import { renderAdminPage } from './pages/admin.js';
import { updatePageTitle } from './ui.js';

class Router {
    constructor() {
        this.routes = {
            '': this.handleHome,
            'home': this.handleHome,
            'login': this.handleLogin,
            'cart': this.handleCart,
            'admin': this.handleAdmin,
            'product': this.handleProductDetail,
            'checkout': this.handleCheckout,
            'orders': this.handleOrders
        };
        
        this.init();
    }

    init() {
        // Hash değişikliklerini dinle
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Sayfa yüklendiğinde rotayı işle
        document.addEventListener('DOMContentLoaded', () => this.handleRoute());
        
        // Link tıklamalarını dinle
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.navigate(route);
            }
        });
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '';
        const [route, param] = hash.split('/');
        
        const handler = this.routes[route] || this.routes[''];
        if (handler) {
            handler.call(this, param);
        }
    }

    async handleHome() {
        updatePageTitle('Ana Sayfa');
        await renderHeader();
        renderHomePage();
    }

    async handleLogin() {
        updatePageTitle('Giriş Yap');
        await renderHeader();
        renderLoginPage();
    }

    async handleCart() {
        if (!auth.isLoggedIn()) {
            this.navigate('login');
            return;
        }
        
        updatePageTitle('Sepetim');
        await renderHeader();
        renderCartPage();
    }

    async handleAdmin() {
        if (!auth.isLoggedIn() || !auth.isAdmin()) {
            this.navigate('home');
            return;
        }
        
        updatePageTitle('Admin Paneli');
        await renderHeader();
        renderAdminPage();
    }

    handleProductDetail(productId) {
        updatePageTitle('Ürün Detayı');
        // Ürün detay sayfası render edilecek
        console.log('Product detail:', productId);
    }

    handleCheckout() {
        updatePageTitle('Ödeme');
        // Ödeme sayfası render edilecek
    }

    handleOrders() {
        updatePageTitle('Siparişlerim');
        // Siparişler sayfası render edilecek
    }

    navigate(route) {
        window.location.hash = route;
    }

    redirect(route) {
        this.navigate(route);
    }
}

export const router = new Router();