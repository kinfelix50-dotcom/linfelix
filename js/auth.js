import { db } from './database.js';
import { showToast } from './components/toast.js';

class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // LocalStorage'dan kullanıcıyı yükle
        const userData = localStorage.getItem('shopzone_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    async login(email, password) {
        try {
            const user = await db.get('users', email);
            
            if (!user || user.password !== password) {
                showToast('E-posta veya şifre hatalı', true);
                return false;
            }
            
            this.currentUser = { email: user.email, name: user.name };
            localStorage.setItem('shopzone_user', JSON.stringify(this.currentUser));
            
            showToast(`Hoş geldiniz, ${user.name}!`);
            return true;
            
        } catch (error) {
            console.error('Giriş hatası:', error);
            showToast('Giriş sırasında bir hata oluştu', true);
            return false;
        }
    }

    async register(name, email, password) {
        try {
            // Kullanıcı var mı kontrol et
            const existingUser = await db.get('users', email);
            
            if (existingUser) {
                showToast('Bu e-posta adresi zaten kayıtlı', true);
                return false;
            }
            
            // Yeni kullanıcı oluştur
            await db.add('users', {
                email,
                password,
                name,
                createdAt: new Date().toISOString(),
                role: 'user'
            });
            
            // Otomatik giriş yap
            this.currentUser = { email, name };
            localStorage.setItem('shopzone_user', JSON.stringify(this.currentUser));
            
            showToast('Kayıt başarılı! Hoş geldiniz.');
            return true;
            
        } catch (error) {
            console.error('Kayıt hatası:', error);
            showToast('Kayıt sırasında bir hata oluştu', true);
            return false;
        }
    }

    logout() {
        if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
            this.currentUser = null;
            localStorage.removeItem('shopzone_user');
            showToast('Başarıyla çıkış yapıldı');
            return true;
        }
        return false;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getUser() {
        return this.currentUser;
    }

    isAdmin() {
        return this.currentUser?.role === 'admin';
    }

    updateProfile(updates) {
        // Profil güncelleme işlevi
        // Bu kısım veritabanı entegrasyonu ile genişletilebilir
        if (this.currentUser) {
            this.currentUser = { ...this.currentUser, ...updates };
            localStorage.setItem('shopzone_user', JSON.stringify(this.currentUser));
            return true;
        }
        return false;
    }
}

// Singleton pattern
export const auth = new Auth();