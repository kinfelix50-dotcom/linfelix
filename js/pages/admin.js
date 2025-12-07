import { db } from '../database.js';
import { auth } from '../auth.js';
import { formatPrice } from '../ui.js';
import { showToast } from '../components/toast.js';
import { router } from '../router.js';

export async function renderAdminPage() {
    // Admin kontrolü
    if (!auth.isLoggedIn() || !auth.isAdmin()) {
        router.navigate('home');
        return;
    }
    
    const mainContent = document.getElementById('main-content');
    
    try {
        const products = await db.getAll('products');
        const orders = await getOrders(); // Siparişler için fonksiyon
        
        mainContent.innerHTML = `
            <div class="page-title">
                <i class="fas fa-cog"></i>
                <span>Admin Paneli</span>
            </div>
            
            <div class="admin-tabs">
                <button class="admin-tab active" data-tab="products">Ürünler</button>
                <button class="admin-tab" data-tab="orders">Siparişler</button>
                <button class="admin-tab" data-tab="users">Kullanıcılar</button>
            </div>
            
            <div class="admin-content">
                <!-- Ürünler Tab -->
                <div id="productsTab" class="admin-tab-content active">
                    <div class="card">
                        <h3>Yeni Ürün Ekle</h3>
                        <form id="addProductForm">
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label" for="product-name">Ürün Adı</label>
                                    <input type="text" id="product-name" class="form-control" required>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label" for="product-category">Kategori</label>
                                    <select id="product-category" class="form-control" required>
                                        <option value="telefon">Telefon</option>
                                        <option value="bilgisayar">Bilgisayar</option>
                                        <option value="tablet">Tablet</option>
                                        <option value="kulaklık">Kulaklık</option>
                                        <option value="saat">Saat</option>
                                        <option value="diğer">Diğer</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="product-description">Açıklama</label>
                                <textarea id="product-description" class="form-control" rows="3" required></textarea>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label" for="product-price">Fiyat (₺)</label>
                                    <input type="number" id="product-price" class="form-control" step="0.01" required>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label" for="product-stock">Stok</label>
                                    <input type="number" id="product-stock" class="form-control" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="product-image">Görsel URL</label>
                                <input type="url" id="product-image" class="form-control">
                            </div>
                            
                            <button type="submit" class="btn btn-success">
                                <i class="fas fa-plus"></i>
                                Ürün Ekle
                            </button>
                        </form>
                    </div>
                    
                    <div class="card" style="margin-top: 2rem;">
                        <h3>Mevcut Ürünler (${products.length})</h3>
                        <div class="products-list">
                            ${renderProductsList(products)}
                        </div>
                    </div>
                </div>
                
                <!-- Siparişler Tab -->
                <div id="ordersTab" class="admin-tab-content">
                    <div class="card">
                        <h3>Sipariş Yönetimi</h3>
                        <div class="orders-list">
                            ${renderOrdersList(orders)}
                        </div>
                    </div>
                </div>
                
                <!-- Kullanıcılar Tab -->
                <div id="usersTab" class="admin-tab-content">
                    <div class="card">
                        <h3>Kullanıcı Yönetimi</h3>
                        <p>Kullanıcı yönetimi özelliği yakında eklenecek.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Event listener'ları ekle
        attachAdminEventListeners(products);
        
    } catch (error) {
        console.error('Admin paneli yüklenirken hata:', error);
        mainContent.innerHTML = `
            <div class="card">
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Admin paneli yüklenirken bir hata oluştu</h3>
                    <p>Lütfen sayfayı yenileyin</p>
                </div>
            </div>
        `;
    }
}

function renderProductsList(products) {
    if (products.length === 0) {
        return '<p class="empty-state">Henüz ürün bulunmuyor</p>';
    }
    
    return `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Görsel</th>
                    <th>Ürün Adı</th>
                    <th>Kategori</th>
                    <th>Fiyat</th>
                    <th>Stok</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td>
                            <img src="${product.image}" alt="${product.name}" class="product-thumbnail">
                        </td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${formatPrice(product.price)}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button class="btn btn-sm edit-product" data-id="${product.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger delete-product" data-id="${product.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderOrdersList(orders) {
    if (orders.length === 0) {
        return '<p class="empty-state">Henüz sipariş bulunmuyor</p>';
    }
    
    return orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <span class="order-id">Sipariş #${order.id}</span>
                <span class="order-date">${order.date}</span>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
            <div class="order-details">
                <p>Müşteri: ${order.customer}</p>
                <p>Toplam: ${formatPrice(order.total)}</p>
            </div>
        </div>
    `).join('');
}

async function getOrders() {
    // Bu fonksiyon gerçek bir uygulamada veritabanından siparişleri çeker
    // Şimdilik örnek veri döndürüyor
    return [
        {
            id: 'ORD001',
            date: '2024-03-15',
            status: 'completed',
            customer: 'Ahmet Yılmaz',
            total: 1249.90
        },
        {
            id: 'ORD002',
            date: '2024-03-14',
            status: 'processing',
            customer: 'Mehmet Demir',
            total: 899.90
        }
    ];
}

function attachAdminEventListeners(products) {
    // Tab geçişleri
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchAdminTab(tabName);
        });
    });
    
    // Ürün ekle formu
    document.getElementById('addProductForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addProduct();
    });
    
    // Ürün düzenle butonları
    document.querySelectorAll('.edit-product').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.getAttribute('data-id'));
            editProduct(productId, products);
        });
    });
    
    // Ürün sil butonları
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', async (e) => {
            const productId = parseInt(e.currentTarget.getAttribute('data-id'));
            await deleteProduct(productId);
        });
    });
}

function switchAdminTab(tabName) {
    // Tab butonlarını güncelle
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    
    // Tab içeriklerini güncelle
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}Tab`);
    });
}

async function addProduct() {
    const name = document.getElementById('product-name').value.trim();
    const category = document.getElementById('product-category').value;
    const description = document.getElementById('product-description').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const image = document.getElementById('product-image').value.trim() || 
                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
    
    if (!name || !description || !price || !stock) {
        showToast('Lütfen tüm alanları doldurun', true);
        return;
    }
    
    try {
        await db.add('products', {
            name,
            category,
            description,
            price,
            stock,
            image,
            createdAt: new Date().toISOString()
        });
        
        showToast(`${name} başarıyla eklendi`);
        
        // Formu temizle
        document.getElementById('addProductForm').reset();
        
        // Ürün listesini yeniden yükle
        await renderAdminPage();
        
    } catch (error) {
        console.error('Ürün ekleme hatası:', error);
        showToast('Ürün eklenirken bir hata oluştu', true);
    }
}

function editProduct(productId, products) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Modal aç ve ürün bilgilerini doldur
    // Bu kısım modal oluşturma fonksiyonu ile genişletilebilir
    console.log('Edit product:', product);
    alert(`Ürün düzenleme özelliği yakında eklenecek: ${product.name}`);
}

async function deleteProduct(productId) {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
        return;
    }
    
    try {
        await db.delete('products', productId);
        showToast('Ürün başarıyla silindi');
        
        // Admin panelini yeniden yükle
        await renderAdminPage();
        
    } catch (error) {
        console.error('Ürün silme hatası:', error);
        showToast('Ürün silinirken bir hata oluştu', true);
    }
}