export class StorageHelper {
    static setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('LocalStorage kayıt hatası:', error);
            return false;
        }
    }
    
    static getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('LocalStorage okuma hatası:', error);
            return null;
        }
    }
    
    static removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('LocalStorage silme hatası:', error);
            return false;
        }
    }
    
    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('LocalStorage temizleme hatası:', error);
            return false;
        }
    }
    
    static getCart() {
        return this.getItem('cart') || [];
    }
    
    static saveCart(cartItems) {
        return this.setItem('cart', cartItems);
    }
    
    static getUser() {
        return this.getItem('user');
    }
    
    static saveUser(user) {
        return this.setItem('user', user);
    }
    
    static getSettings() {
        return this.getItem('settings') || {};
    }
    
    static saveSettings(settings) {
        return this.setItem('settings', settings);
    }
}