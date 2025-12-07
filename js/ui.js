import { showToast } from './components/toast.js';

// Fiyat formatlama
export function formatPrice(price) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0
    }).format(price);
}

// Yükleme durumunu göster/gizle
export function showLoading(show = true) {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        loadingEl.style.display = show ? 'block' : 'none';
    }
}

// Tarih formatlama
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// URL parametrelerini oku
export function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

// URL parametresi ekle
export function setUrlParam(key, value) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
}

// Sayfa başlığını güncelle
export function updatePageTitle(title) {
    document.title = `${title} - ShopZone`;
}

// Modal oluştur
export function createModal(title, content, buttons = []) {
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    ${buttons.map(btn => `
                        <button class="btn ${btn.class}" data-action="${btn.action}">
                            ${btn.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Kapatma işlevi
    modalContainer.querySelector('.modal-close').addEventListener('click', () => {
        modalContainer.remove();
    });
    
    modalContainer.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modalContainer.querySelector('.modal-overlay')) {
            modalContainer.remove();
        }
    });
    
    // Buton event'leri
    modalContainer.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            if (typeof window[action] === 'function') {
                window[action]();
            }
        });
    });
    
    return modalContainer;
}

// Form doğrulama
export function validateForm(fields) {
    const errors = [];
    
    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element) return;
        
        const value = element.value.trim();
        
        if (field.required && !value) {
            errors.push(`${field.name} alanı zorunludur`);
            element.classList.add('error');
        } else if (field.type === 'email' && !isValidEmail(value)) {
            errors.push('Geçerli bir email adresi girin');
            element.classList.add('error');
        } else if (field.minLength && value.length < field.minLength) {
            errors.push(`${field.name} en az ${field.minLength} karakter olmalıdır`);
            element.classList.add('error');
        } else {
            element.classList.remove('error');
        }
    });
    
    return errors;
}

// Email doğrulama
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Export all UI functions
export default {
    formatPrice,
    showLoading,
    formatDate,
    getUrlParams,
    setUrlParam,
    updatePageTitle,
    createModal,
    validateForm
};