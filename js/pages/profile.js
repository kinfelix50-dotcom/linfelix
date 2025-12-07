import { auth } from '../auth.js';
import { db } from '../database.js';
import { showToast } from '../components/toast.js';
import { ValidationHelper } from '../utils/validation.js';
import { Helpers } from '../utils/helpers.js';

export function renderProfilePage() {
    const user = auth.getUser();
    if (!user) return;
    
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <div class="page-title">
            <i class="fas fa-user"></i>
            <span>Profilim</span>
        </div>
        
        <div class="card">
            <div class="profile-header">
                <div class="profile-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="profile-info">
                    <h2>${user.name}</h2>
                    <p>${user.email}</p>
                    <p class="profile-role">${user.role === 'admin' ? 'Admin' : 'Kullanıcı'}</p>
                </div>
            </div>
            
            <div class="profile-tabs">
                <button class="profile-tab active" data-tab="info">Bilgilerim</button>
                <button class="profile-tab" data-tab="orders">Siparişlerim</button>
                <button class="profile-tab" data-tab="security">Güvenlik</button>
            </div>
            
            <div class="profile-content">
                <div id="infoTab" class="profile-tab-content active">
                    <form id="profileForm">
                        <div class="form-group">
                            <label class="form-label" for="profile-name">Ad Soyad</label>
                            <input type="text" id="profile-name" class="form-control" value="${user.name}">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="profile-email">E-posta</label>
                            <input type="email" id="profile-email" class="form-control" value="${user.email}" readonly>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="profile-phone">Telefon</label>
                            <input type="tel" id="profile-phone" class="form-control" value="${user.phone || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="profile-address">Adres</label>
                            <textarea id="profile-address" class="form-control" rows="3">${user.address || ''}</textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i>
                            Bilgileri Güncelle
                        </button>
                    </form>
                </div>
                
                <div id="ordersTab" class="profile-tab-content">
                    <div id="ordersList">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>Siparişler yükleniyor...</p>
                        </div>
                    </div>
                </div>
                
                <div id="securityTab" class="profile-tab-content">
                    <form id="passwordForm">
                        <div class="form-group">
                            <label class="form-label" for="current-password">Mevcut Şifre</label>
                            <input type="password" id="current-password" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="new-password">Yeni Şifre</label>
                            <input type="password" id="new-password" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="confirm-password">Yeni Şifre Tekrar</label>
                            <input type="password" id="confirm-password" class="form-control" required>
                        </div>
                        
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-key"></i>
                            Şifreyi Değiştir
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Event listener'ları ekle
    attachProfileEventListeners();
    loadUserOrders();
}

function attachProfileEventListeners() {
    // Tab geçişleri
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchProfileTab(tabName);
        });
    });
    
    // Profil formu
    document.getElementById('profileForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await updateProfile();
    });
    
    // Şifre formu
    document.getElementById('passwordForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await changePassword();
    });
}

function switchProfileTab(tabName) {
    // Tab butonlarını güncelle
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    
    // Tab içeriklerini güncelle
    document.querySelectorAll('.profile-tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}Tab`);
    });
}

async function updateProfile() {
    const name = document.getElementById('profile-name').value.trim();
    const phone = document.getElementById('profile-phone').value.trim();
    const address = document.getElementById('profile-address').value.trim();
    const user = auth.getUser();
    
    // Doğrulama
    if (!name) {
        showToast('Ad soyad alanı zorunludur', true);
        return;
    }
    
    try {
        // Kullanıcıyı güncelle (veritabanında)
        const userData = await db.get('users', user.email);
        if (userData) {
            userData.name = name;
            userData.phone = phone;
            userData.address = address;
            await db.put('users', userData);
        }
        
        // Auth state'i güncelle
        auth.updateProfile({ name, phone, address });
        
        showToast('Profil bilgileriniz güncellendi');
        
        // Header'ı güncelle
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    } catch (error) {
        console.error('Profil güncellenirken hata:', error);
        showToast('Profil güncellenirken bir hata oluştu', true);
    }
}

async function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const user = auth.getUser();
    
    // Doğrulama
    const validation = ValidationHelper.validateForm(
        { newPassword, confirmPassword },
        {
            newPassword: {
                required: true,
                password: true
            },
            confirmPassword: {
                required: true,
                match: {
                    field: 'newPassword',
                    message: 'Şifreler eşleşmiyor'
                }
            }
        }
    );
    
    if (!validation.isValid) {
        const firstError = Object.values(validation.errors)[0];
        showToast(firstError, true);
        return;
    }
    
    try {
        // Mevcut şifreyi kontrol et
        const userData = await db.get('users', user.email);
        if (!userData || userData.password !== currentPassword) {
            showToast('Mevcut şifre yanlış', true);
            return;
        }
        
        // Şifreyi güncelle
        userData.password = newPassword;
        await db.put('users', userData);
        
        showToast('Şifreniz başarıyla değiştirildi');
        
        // Formu temizle
        document.getElementById('passwordForm').reset();
        
    } catch (error) {
        console.error('Şifre değiştirilirken hata:', error);
        showToast('Şifre değiştirilirken bir hata oluştu', true);
    }
}

async function loadUserOrders() {
    // Kullanıcının siparişlerini yükle
    // Bu kısım gerçek bir uygulamada veritabanından gelecek
    const orders = [
        {
            id: 'ORD001',
            date: '2024-03-15',
            status: 'completed',
            total: 1249.90,
            items: [
                { name: 'iPhone 16 Pro', quantity: 1, price: 64990 },
                { name: 'AirPods Pro 2', quantity: 1, price: 8990 }
            ]
        },
        {
            id: 'ORD002',
            date: '2024-03-10',
            status: 'processing',
            total: 48990,
            items: [
                { name: 'MacBook Air M3', quantity: 1, price: 48990 }
            ]
        }
    ];
    
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>Henüz siparişiniz yok</h3>
                <p>Alışverişe başlayın ve ilk siparişinizi verin!</p>
            </div>
        `;
        return;
    }
    
    const ordersHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <span class="order-id">Sipariş #${order.id}</span>
                    <span class="order-date">${Helpers.formatDate(order.date)}</span>
                </div>
                <span class="order-status ${order.status}">${order.status === 'completed' ? 'Tamamlandı' : 'İşleniyor'}</span>
            </div>
            
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span class="item-name">${item.name}</span>
                        <span class="item-quantity">${item.quantity} adet</span>
                        <span class="item-price">${new Intl.NumberFormat('tr-TR', {
                            style: 'currency',
                            currency: 'TRY',
                            minimumFractionDigits: 0
                        }).format(item.price)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-footer">
                <span class="order-total">Toplam: ${new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                    minimumFractionDigits: 0
                }).format(order.total)}</span>
                <button class="btn btn-sm btn-primary">Detayları Gör</button>
            </div>
        </div>
    `).join('');
    
    ordersList.innerHTML = ordersHTML;
}