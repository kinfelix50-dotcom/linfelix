<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Test | Ürün Detay</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
  <link href="css/urun-detay-style.css" rel="stylesheet">
   <!-- jsPDF ve autoTable kütüphaneleri -->
  
  <!-- JavaScript Kütüphaneleri -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
  <!-- DejaVuSans fontu (isteğe bağlı, yoksa Helvetica kullanılacak) -->
  <script src="js/DejaVuSans.js"></script>
  <!-- Ana script dosyanız -->
  <script src="js/script.js"></script>
  
  
  <style>
    body {
      background-color: #ffffff !important;
    }
    .product-card {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
    }
    .brands-section {
      box-shadow: 0 0px 8px rgba(0, 0, 0, 0.2) !important;
    }
    .product-scroll-item {
      margin-right: 3px;
    }
    .navbar-buttons .btn {
      background-color: #fff !important;
      border-color: #dddddd !important;
      padding: 6px !important;
    }
    .navbar-buttons .btn i {
      color: #000 !important;
      font-size: 1.2rem !important;
      line-height: 1 !important;
    }
    .navbar-buttons .btn:hover {
      background-color: #333333 !important;
      border-color: #333333 !important;
    }
    .navbar-buttons .btn:hover i {
      color: #fff !important;
    }
    .navbar-buttons .cart-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 0.7rem;
    }
    .ad-banner {
      background-color: #025c90;
      color: white;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
      padding: 0 8px;
      overflow: hidden;
      white-space: nowrap;
    }
    .countdown {
      font-size: 0.75rem;
      margin-left: 8px;
      display: flex;
      align-items: center;
    }
    .countdown span {
      display: inline-block;
      margin: 0 2px;
      padding: 2px 5px;
      border-radius: 3px;
    }
    .clock-icon {
      margin-right: 4px;
      font-size: 0.9rem;
    }
  </style>
</head>
<body class="bg-light">
  <!-- Sepet Bildirimi -->
  <div id="sepetBildirim" class="alert alert-success text-center py-2 fixed-top w-100 d-none" style="z-index: 9999;">
    Ürün sepete eklendi!
  </div>

  <!-- Reklam Bantı -->
  <div class="ad-banner">
    <span>Tüm Ürünlerde %20 İndirim Fırsatını Kaçırma!</span>
    <div class="countdown" id="countdown">
      <i class="bi bi-clock clock-icon"></i>
      <span id="hours">00</span>:
      <span id="minutes">00</span>:
      <span id="seconds">00</span>
    </div>
  </div>

  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-white sticky-top shadow">
    <div class="container navbar-container">
      <a class="navbar-brand m-0" href="index.html" style="text-shadow: 0px 1px 2px #bbbfc8; font-weight: 600; color: #000000;">
        MehtapStore
      </a>
      <div class="navbar-buttons" id="navbarButtons"></div>
    </div>
  </nav>

  <!-- Kategori Menüsü -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="kategoriOffcanvas" aria-labelledby="kategoriOffcanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="kategoriOffcanvasLabel">Kategoriler</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Kapat"></button>
    </div>
    <div class="offcanvas-body">
      <div class="list-group" id="kategoriListesi">
        <a href="#" class="list-group-item list-group-item-action" data-kategori="hepsi">Tüm Ürünler</a>
      </div>
    </div>
  </div>

  <!-- Kullanıcı Profili Modal -->
  <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="profileModalLabel">Kullanıcı Profili</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#profileTab">Profil</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#passwordTab">Şifre Değiştir</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#ordersTab">Siparişler</a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade show active" id="profileTab">
              <div class="mb-3">
                <label class="form-label">Kullanıcı Adı</label>
                <input type="text" class="form-control" id="profileUsername" readonly>
              </div>
              <div class="mb-3">
                <label class="form-label">E-posta</label>
                <input type="email" class="form-control" id="profileEmail" readonly>
              </div>
            </div>
            <div class="tab-pane fade" id="passwordTab">
              <form id="changePasswordForm" novalidate>
                <div class="mb-3">
                  <label for="currentPassword" class="form-label">Mevcut Şifre</label>
                  <input type="password" class="form-control" id="currentPassword" required>
                  <div class="invalid-feedback">Mevcut şifre yanlış.</div>
                </div>
                <div class="mb-3">
                  <label for="newPassword" class="form-label">Yeni Şifre</label>
                  <input type="password" class="form-control" id="newPassword" required minlength="6">
                  <div class="invalid-feedback">Yeni şifre en az 6 karakter olmalı.</div>
                </div>
                <div class="mb-3">
                  <label for="confirmNewPassword" class="form-label">Yeni Şifreyi Onayla</label>
                  <input type="password" class="form-control" id="confirmNewPassword" required>
                  <div class="invalid-feedback">Şifreler eşleşmiyor.</div>
                </div>
                <button type="submit" class="btn btn-primary w-100">Şifreyi Değiştir</button>
              </form>
            </div>
            <div class="tab-pane fade" id="ordersTab">
              <h5>Siparişlerim</h5>
              <div id="ordersList" class="accordion"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Ürün Resmi Modal -->
  <div class="modal fade" id="resimModal" tabindex="-1" aria-labelledby="resimModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="resimModalLabel">Ürün Fotoğrafı</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
        </div>
        <div class="modal-body text-center">
          <img id="modalResim" class="modal-img" src="https://via.placeholder.com/400" alt="Ürün Fotoğrafı">
        </div>
      </div>
    </div>
  </div>

  <!-- Ana İçerik -->
  <main class="container py-4" id="mainContent"></main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <a href="index.html" class="footer-brand-text">MehtapStore</a>
        <p>Bültenimize abone olun, kampanya ve yeniliklerden ilk siz haberdar olun.</p>
        <form class="newsletter-form">
          <input type="email" placeholder="E-posta adresiniz" required>
          <button type="submit">Abone Ol</button>
        </form>
      </div>
      <div class="footer-section">
        <h4>Bizi Takip Edin</h4>
        <div class="social-links">
          <a href="#" target="_blank" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" target="_blank" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" target="_blank" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
      <div class="footer-section">
        <h4>Hızlı Linkler</h4>
        <ul class="footer-links">
          <li><a href="/kullanim-kosullari">Kullanım Koşulları</a></li>
          <li><a href="/gizlilik-politikasi">Gizlilik Politikası</a></li>
          <li><a href="/cerez-politikasi">Çerez Politikası</a></li>
          <li><a href="/iptal-iade">İptal ve İade Koşulları</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>İletişim</h4>
        <ul class="contact-info">
          <li><i class="fas fa-envelope"></i> info@mehtapstore.com</li>
          <li><i class="fas fa-phone"></i> 0 (555) 123 45 67</li>
          <li><i class="fas fa-map-marker-alt"></i> Van, Türkiye</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <p>© 2025 MehtapStore.com - Tüm hakları saklıdır.</p>
    </div>
  </footer>
 
  <!-- JavaScript Kodu -->
  <script>
    let sepet;

    // Yardımcı Fonksiyonlar
    function bildirimGoster(message, type) {
      console.log(`Bildirim (${type}): ${message}`);
      const bildirimEl = document.getElementById('sepetBildirim');
      if (bildirimEl) {
        bildirimEl.textContent = message;
        bildirimEl.className = `alert alert-${type} text-center py-2 fixed-top w-100`;
        bildirimEl.classList.remove('d-none');
        setTimeout(() => {
          bildirimEl.classList.add('d-none');
        }, 3000);
      }
    }

    function safeParseJSON(key, defaultValue) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.error(`"${key}" anahtarlı JSON ayrıştırılırken hata:`, e);
        return defaultValue;
      }
    }

    function escapeHTML(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function formatDetailText(text) {
      if (!text) return 'Detaylı açıklama mevcut değil.';
      const paragraphs = text.split('\n').filter(p => p.trim() !== '');
      return paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');
    }

    function calculateDiscountedPrice(originalPrice, discountPercentage) {
      originalPrice = Number(originalPrice) || 0;
      discountPercentage = Number(discountPercentage) || 0;
      if (discountPercentage > 0 && discountPercentage <= 100) {
        return originalPrice * (1 - discountPercentage / 100);
      }
      return originalPrice;
    }

    // --- Sipariş Yönetimi (PDF Kısmı) ---
    function printOrderAsPDF(orderId) {
  try {
    let orders = safeParseJSON('orders', []);
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      bildirimGoster('Sipariş bulunamadı!', 'danger');
      return;
    }

    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
      console.error('jsPDF kütüphanesi yüklenmedi!');
      bildirimGoster('PDF kütüphanesi yüklenemedi! Konsolu kontrol edin.', 'danger');
      return;
    }

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Font ayarları
    if (typeof DejaVuSans !== 'undefined') {
      try {
        doc.addFileToVFS('DejaVuSans.ttf', DejaVuSans);
        doc.addFont('DejaVuSans.ttf', 'DejaVuSans', 'normal');
        doc.setFont('DejaVuSans', 'normal');
      } catch (err) {
        console.warn('DejaVuSans fontu yüklenemedi, Helvetica kullanılıyor:', err);
        doc.setFont('Helvetica', 'normal');
      }
    } else {
      doc.setFont('Helvetica', 'normal');
    }

    const primaryColor = '#007bff';
    const secondaryColor = '#6c757d';
    const textColor = '#343a40';
    const lightBgColor = '#f8f9fa';

    let currentY = 20;
    const marginX = 15;
    const pageWidth = doc.internal.pageSize.width;
    const availableWidth = pageWidth - (2 * marginX); // 180 mm
    const maxTextWidthForSplit = availableWidth / 2 - 10;
    const defaultLineHeight = 5;

    // Header
    doc.setFontSize(24);
    doc.setTextColor(primaryColor);
    doc.text('MehtapStore', pageWidth / 2, currentY, { align: 'center' });
    currentY += 20;

    // Info box
    doc.setFillColor(lightBgColor);
    doc.rect(marginX, currentY - 5, availableWidth, 45, 'F');

    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text('Müşteri Bilgileri', marginX + 5, currentY);
    doc.text('Sipariş Bilgileri', pageWidth / 2 + 45, currentY);
    currentY += 8;

    const customerInfoX = marginX + 5;
    const orderInfoRightEdgeX = pageWidth - marginX - 5;

    let tempCurrentY = currentY;
    const customerFullName = escapeHTML(order.fullName || 'Belirtilmemiş');
    const splitFullName = doc.splitTextToSize(customerFullName, maxTextWidthForSplit);
    doc.text(splitFullName, customerInfoX, tempCurrentY);
    tempCurrentY += splitFullName.length * defaultLineHeight;

    const customerPhone = `Telefon: ${escapeHTML(order.phone || 'Belirtilmemiş')}`;
    const splitPhone = doc.splitTextToSize(customerPhone, maxTextWidthForSplit);
    doc.text(splitPhone, customerInfoX, tempCurrentY);
    tempCurrentY += splitPhone.length * defaultLineHeight;

    const customerAddress = `Adres: ${escapeHTML(order.address || 'Belirtilmemiş')}`;
    const splitAddress = doc.splitTextToSize(customerAddress, maxTextWidthForSplit);
    doc.text(splitAddress, customerInfoX, tempCurrentY);

    let orderInfoY = currentY;
    const dateText = `Tarih: ${new Date(order.date).toLocaleString('tr-TR')}`;
    doc.text(dateText, orderInfoRightEdgeX, orderInfoY, { align: 'right' });
    orderInfoY += defaultLineHeight;

    const statusText = {
      pending: 'Beklemede',
      shipped: 'Kargoda',
      delivered: 'Teslim Edildi'
    }[order.status] || 'Bilinmeyen Durum';
    doc.text(`Durum: ${statusText}`, orderInfoRightEdgeX, orderInfoY, { align: 'right' });
    orderInfoY += 15;

    currentY = Math.max(tempCurrentY, orderInfoY);

    // Product table
    const tableData = [];
    let totalOriginalPrice = 0;
    let totalDiscountAmount = 0;
    let totalNetPrice = 0;

    const urunler = safeParseJSON('urunler', []);
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        const urun = urunler.find(u => u.id === item.id);
        const originalPrice = Number(urun?.fiyat || item.fiyat || 0);
        const indirimOrani = Number(item.indirim) || 0;
        const netFiyat = calculateDiscountedPrice(originalPrice, indirimOrani);
        const adet = Number(item.adet) || 1;
        const indirimTutari = (originalPrice - netFiyat) * adet;
        totalOriginalPrice += originalPrice * adet;
        totalDiscountAmount += indirimTutari;
        totalNetPrice += netFiyat * adet;

        const productName = escapeHTML(item.ad || 'Bilinmeyen');

        tableData.push([
          productName,
          `${adet}`,
          `${originalPrice.toFixed(2)} TL`,
          `%${indirimOrani}`,
          `${netFiyat.toFixed(2)} TL`,
          `${(netFiyat * adet).toFixed(2)} TL`
        ]);
      });
    }

    doc.autoTable({
  startY: currentY,
  head: [['Ürün Adı', 'Adet', 'Birim Fiyat', 'İndirim', 'Net Fiyat', 'Toplam']],
  body: tableData,
  theme: 'striped',
  styles: {
    font: typeof DejaVuSans !== 'undefined' ? 'DejaVuSans' : 'Helvetica',
    fontSize: 8,
    cellPadding: 2,
    lineColor: '#dee2e6',
    lineWidth: 0.1,
    textColor: textColor,
    overflow: 'linebreak'
  },
  headStyles: {
    fillColor: primaryColor,
    textColor: '#ffffff',
    fontSize: 8,
    halign: 'center'
  },
  bodyStyles: {
    halign: 'left'
  },
  didParseCell: function(data) {
    if (data.column.index === 0 && data.cell.text) {
      const text = data.cell.text.join('').trim();
      if (text.length > 40) {
        data.cell.text = doc.splitTextToSize(text.substring(0, 40) + '...', 50);
      }
    }
  },
  didDrawPage: function(data) {
    doc.setFont(typeof DejaVuSans !== 'undefined' ? 'DejaVuSans' : 'Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor);
    doc.text(`Sayfa ${doc.internal.getNumberOfPages()}`, pageWidth - marginX, doc.internal.pageSize.height - 10, {
      align: 'right'
    });
  }
});
    currentY = doc.autoTable.previous.finalY + 10;

    doc.setFontSize(10); // Özet font boyutunu küçülttük
    doc.setTextColor(textColor);

    const summaryRightAlignX = pageWidth - marginX - 3;
    const summaryLineHeight = 6; // Özet satır yüksekliğini azalttık

    const totalOriginalPriceText = `Genel Toplam: ${totalOriginalPrice.toFixed(2)} TL`;
    const totalDiscountAmountText = `Toplam İndirim: ${totalDiscountAmount.toFixed(2)} TL`;
    const totalNetPriceText = `Kalan Net Tutar: ${totalNetPrice.toFixed(2)} TL`;

    doc.text(totalOriginalPriceText, summaryRightAlignX - doc.getTextWidth(totalOriginalPriceText), currentY);
    currentY += summaryLineHeight;
    doc.text(totalDiscountAmountText, summaryRightAlignX - doc.getTextWidth(totalDiscountAmountText), currentY);
    currentY += summaryLineHeight;
    doc.text(totalNetPriceText, summaryRightAlignX - doc.getTextWidth(totalNetPriceText), currentY);

    doc.save(`siparis_${escapeHTML(orderId)}.pdf`);
    bildirimGoster('Sipariş PDF\'ye aktarıldı!', 'success');
  } catch (err) {
    console.error('PDF oluşturma hatası:', err);
    bildirimGoster('PDF oluşturulamadı! Konsolu kontrol edin.', 'danger');
  }
}
    function cancelOrder(orderId) {
      if (!confirm('Siparişi iptal etmek istiyor musunuz?')) return;
      let orders = safeParseJSON('orders', []);
      const order = orders.find(o => o.id === orderId);
      if (!order || order.status !== 'pending') {
        bildirimGoster('Sadece beklemedeki siparişler iptal edilebilir!', 'warning');
        return;
      }
      const urunler = safeParseJSON('urunler', []);
      order.items.forEach(item => {
        const guncelUrun = urunler.find(u => u.id === item.id);
        if (guncelUrun) {
          guncelUrun.stok += item.adet;
        }
      });
      localStorage.setItem('urunler', JSON.stringify(urunler));
      orders = orders.filter(o => o.id !== orderId);
      localStorage.setItem('orders', JSON.stringify(orders));
      bildirimGoster('Sipariş iptal edildi!', 'success');
      displayOrders();
    }

    function displayOrders() {
      const ordersList = document.getElementById('ordersList');
      if (!ordersList) {
        console.error('Sipariş listesi bulunamadı!');
        return;
      }
      const currentUser = safeParseJSON('currentUser', {});
      const orders = safeParseJSON('orders', []);
      const userOrders = orders.filter(o => o.userEmail === currentUser.email);
      ordersList.innerHTML = userOrders.length === 0 ? '<p class="text-muted">Henüz siparişiniz yok.</p>' : '';
      userOrders.forEach((order, idx) => {
        const safeOrderId = escapeHTML(String(order.id));
        const statusText = order.status === 'pending' ? 'Beklemede' : order.status === 'shipped' ? 'Kargoda' : 'Teslim Edildi';
        ordersList.innerHTML += `
          <div class="accordion-item">
            <h2 class="accordion-header" id="orderHeading${idx}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#orderCollapse${idx}" aria-expanded="false" aria-controls="orderCollapse${idx}">
                Sipariş #${safeOrderId} - ${new Date(order.date).toLocaleString('tr-TR')} (${statusText})
              </button>
            </h2>
            <div id="orderCollapse${idx}" class="accordion-collapse collapse" aria-labelledby="orderHeading${idx}" data-bs-parent="#ordersList">
              <div class="accordion-body">
                <p><strong>Toplam:</strong> ${Number(order.total || 0).toFixed(2)} TL</p>
                <table class="table table-sm">
                  <thead><tr><th>Ürün</th><th>Adet</th><th>Fiyat</th></tr></thead>
                  <tbody>
                    ${order.items?.map(item => `
                      <tr>
                        <td><img src="${escapeHTML(item.resim || 'https://via.placeholder.com/50')}" class="order-item-img me-2" alt="${escapeHTML(item.ad || 'Ürün Resmi')}" onerror="this.src='https://via.placeholder.com/50'"> ${escapeHTML(item.ad || 'Ürün Adı Belirtilmemiş')}</td>
                        <td>${Number(item.adet || 0)}</td>
                        <td>${Number(item.fiyat * (item.adet || 0) || 0).toFixed(2)} TL</td>
                      </tr>
                    `).join('') || '<tr><td colspan="3">Ürün bulunamadı</td></tr>'}
                  </tbody>
                </table>
                <div class="text-end">
                  <button class="btn btn-sm btn-info me-2" onclick="printOrderAsPDF('${safeOrderId}')"><i class="fas fa-file-pdf"></i> PDF İndir</button>
                  ${order.status === 'pending' ? `<button class="btn btn-danger btn-sm" onclick="cancelOrder('${safeOrderId}')">İptal Et</button>` : ''}
                </div>
              </div>
            </div>
          </div>`;
      });
    }

    class Sepet {
      constructor() {
        this.sepet = safeParseJSON('sepet', []);
      }

      kaydet() { 
        try {
          localStorage.setItem('sepet', JSON.stringify(this.sepet));
        } catch (e) {
          console.error('Sepet kaydedilirken hata oluştu:', e);
        }
      }

      ekle(urun) {
        const urunlerLocal = safeParseJSON('urunler', []);
        const guncelUrunBilgisi = urunlerLocal.find(item => item.id === urun.id);

        if (!guncelUrunBilgisi) {
          bildirimGoster('Ürün bilgisi bulunamadı!', 'danger');
          return false;
        }

        const mevcut = this.sepet.find(item => item.id === urun.id);
        const mevcutSepetAdedi = mevcut ? mevcut.adet : 0;
        const eklenecekAdet = urun.adet;
        const toplamAdet = mevcutSepetAdedi + eklenecekAdet;
        
        if (guncelUrunBilgisi.stok < eklenecekAdet) {
          bildirimGoster(`Stok yetersiz! Sadece ${guncelUrunBilgisi.stok} adet ekleyebilirsiniz.`, 'danger');
          return false;
        }

        if (mevcut) {
          mevcut.adet += eklenecekAdet;
        } else {
          this.sepet.push({
            ...urun,
            fiyat: calculateDiscountedPrice(guncelUrunBilgisi.fiyat, guncelUrunBilgisi.indirim),
            indirim: guncelUrunBilgisi.indirim || 0,
            originalPrice: guncelUrunBilgisi.fiyat
          });
        }

        guncelUrunBilgisi.stok -= eklenecekAdet;
        localStorage.setItem('urunler', JSON.stringify(urunlerLocal));

        this.kaydet();
        this.guncelle();
        bildirimGoster('Ürün sepete eklendi!', 'success');
        return true;
      }

      guncelle() {
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) cartBadge.textContent = this.sepet.reduce((sum, item) => sum + item.adet, 0);
      }
    }

    function kategoriYukle() {
      const urunler = safeParseJSON('urunler', []);
      const kategoriler = [...new Set(urunler.map(u => u.kategori).filter(k => k))].sort();
      const liste = document.getElementById('kategoriListesi');
      if (!liste) {
        console.error('Kategori listesi bulunamadı!');
        return;
      }
      liste.innerHTML = '<a href="#" class="list-group-item list-group-item-action" data-kategori="hepsi">Tüm Ürünler</a>';
      kategoriler.forEach(k => {
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'list-group-item list-group-item-action';
        a.dataset.kategori = k;
        a.textContent = k;
        liste.appendChild(a);
        a.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = `index.html?kategori=${encodeURIComponent(k)}`;
          const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('kategoriOffcanvas'));
          if (offcanvas) offcanvas.hide();
        });
      });
    }

    function navbarGuncelle() {
      const navbarButtons = document.getElementById('navbarButtons');
      if (!navbarButtons) {
        console.error('Navbar düğmeleri bulunamadı!');
        return;
      }
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const user = safeParseJSON('currentUser', {});
      navbarButtons.innerHTML = isLoggedIn === 'true' ? `
        <button class="btn btn-outline-light btn-sm btn-icon-only" data-bs-toggle="modal" data-bs-target="#profileModal" title="Profil">
          <i class="bi bi-person"></i>
        </button>
        ${user.role === 'admin' ? `
          <a href="urun-ekle-sil.html" class="btn btn-outline-light btn-sm btn-icon-only" title="Admin Paneli">
            <i class="fas fa-user-shield"></i>
          </a>
        ` : ''}
        <button class="btn btn-outline-light btn-sm btn-icon-only" onclick="logout()" title="Çıkış Yap">
          <i class="bi bi-box-arrow-right"></i>
        </button>
        <button class="btn btn-light position-relative btn-sm btn-icon-only" onclick="window.location.href='cart.html'" title="Sepet">
          <i class="bi bi-cart3"></i>
          <span id="cartBadge" class="cart-badge badge bg-danger rounded-pill">0</span>
        </button>
        <button class="btn btn-light btn-sm btn-icon-only" type="button" data-bs-toggle="offcanvas" data-bs-target="#kategoriOffcanvas" aria-controls="kategoriOffcanvas" title="Kategoriler">
          <i class="bi bi-list"></i>
        </button>
      ` : `
        <a href="kayit.html" class="btn btn-outline-light btn-sm btn-icon-only" title="Kayıt Ol">
          <i class="bi bi-person-plus"></i>
        </a>
        <a href="login.html" class="btn btn-outline-light btn-sm btn-icon-only" title="Giriş Yap">
          <i class="bi bi-box-arrow-in-right"></i>
        </a>
        <button class="btn btn-light position-relative btn-sm btn-icon-only" onclick="window.location.href='cart.html'" title="Sepet">
          <i class="bi bi-cart3"></i>
          <span id="cartBadge" class="cart-badge badge bg-danger rounded-pill">0</span>
        </button>
        <button class="btn btn-light btn-sm btn-icon-only" type="button" data-bs-toggle="offcanvas" data-bs-target="#kategoriOffcanvas" aria-controls="kategoriOffcanvas" title="Kategoriler">
          <i class="bi bi-list"></i>
        </button>
      `;
      const profileUsername = document.getElementById('profileUsername');
      const profileEmail = document.getElementById('profileEmail');
      if (profileUsername && profileEmail) {
        profileUsername.value = user.username || user.email || '';
        profileEmail.value = user.email || '';
      }
      displayOrders();
    }

    function olusturBenzerUrunKart(urun) {
      const indirimliFiyat = calculateDiscountedPrice(urun.fiyat || 0, urun.indirim || 0);
      const stokMiktari = urun.stok || 0;
      const isNew = !!urun.yeniUrun;
      const ucretsizKargo = urun.ucretsizKargo === true || urun.ucretsizKargo === 'true';

      return `
        <a href="urun-detay.html?id=${encodeURIComponent(urun.id)}" class="text-decoration-none">
          <div class="card benzer-urun-kart h-100">
            <div class="position-relative">
              <img src="${escapeHTML(urun.resim || 'https://via.placeholder.com/150')}" class="benzer-urun-img card-img-top" alt="${escapeHTML(urun.ad || 'Ürün Resmi')}" onerror="this.src='https://via.placeholder.com/150'">
              <div class="benzer-urun-badges">
                ${isNew ? '<span class="badge bg-primary text-white">Yeni</span>' : ''}
                ${urun.indirim ? `<span class="badge bg-danger text-white">%${escapeHTML(String(urun.indirim))} İndirim</span>` : ''}
                ${ucretsizKargo ? '<span class="badge bg-success text-white">Ücretsiz Kargo</span>' : ''}
              </div>
            </div>
            <div class="card-body p-2">
              <h5 class="card-title" style="font-size: 1rem;">${escapeHTML(urun.ad || 'Belirtilmemiş')}</h5>
              <p class="text-muted mb-1" style="font-size: 0.85rem;">${escapeHTML(urun.kategori || 'Belirtilmemiş')}</p>
              <p class="${urun.indirim > 0 ? 'benzer-urun-orijinal-fiyat' : 'd-none'}">${(urun.fiyat || 0).toFixed(2)} TL</p>
              <p class="benzer-urun-fiyat">${indirimliFiyat.toFixed(2)} TL</p>
              <p class="${stokMiktari <= 0 ? 'text-danger' : 'text-muted'} mb-0" style="font-size: 0.85rem;">Stok: ${stokMiktari > 0 ? `${stokMiktari} adet` : 'Tükenmiş'}</p>
            </div>
          </div>
        </a>
      `;
    }

    function urunGoster() {
      const params = new URLSearchParams(window.location.search);
      const urunId = params.get('id') || params.get('Id');
      const urunler = safeParseJSON('urunler', []);
      const mainContent = document.getElementById('mainContent');
      if (!mainContent) {
        console.error('Ana içerik bulunamadı!');
        return;
      }

      if (!urunId) {
        mainContent.innerHTML = '<p class="text-center text-muted">Ürün ID belirtilmemiş. Lütfen bir ürün seçin: <a href="index.html">Ürün listesine dön</a></p>';
        setTimeout(() => window.location.href = 'index.html', 3000);
        return;
      }
      const urun = urunler.find(u => u.id == urunId);
      if (!urun) {
        mainContent.innerHTML = '<p class="text-center text-muted">Ürün bulunamadı (ID: ' + escapeHTML(urunId) + '). <a href="index.html">Ürün listesine dön</a></p>';
        return;
      }
      
      const stokMiktari = urun.stok || 0;
      const isNew = !!urun.yeniUrun;
      const indirimliFiyat = calculateDiscountedPrice(urun.fiyat || 0, urun.indirim || 0);
      const stokDurumu = stokMiktari > 0 ? `${stokMiktari} adet` : 'Tükenmiş';
      const sepeteEkleDisabled = stokMiktari <= 0 ? 'disabled' : '';

      const benzerUrunler = urunler
        .filter(u => u.kategori === urun.kategori && u.id !== urun.id);

      mainContent.innerHTML = `
        <div class="row">
          <div class="col-md-6 position-relative">
            <img id="urunResim" class="product-img img-fluid" src="${escapeHTML(urun.resim || 'https://via.placeholder.com/400')}" alt="${escapeHTML(urun.ad || 'Ürün Resmi')}" data-bs-toggle="modal" data-bs-target="#resimModal">
            <div id="urunBadges" class="product-badges">
              ${isNew ? '<span class="badge bg-primary text-white">Yeni</span>' : ''}
              ${urun.indirim ? `<span class="badge bg-danger text-white">%${escapeHTML(String(urun.indirim))} İndirim</span>` : ''}
              ${urun.ucretsizKargo === true || urun.ucretsizKargo === 'true' ? '<span class="badge bg-success text-white">Ücretsiz Kargo</span>' : ''}
            </div>
          </div>
          
          <div class="col-md-6">
            <h5 id="urunAdi" class="pt-3">${escapeHTML(urun.ad || 'Belirtilmemiş')}</h5>

            <p id="urunMarka" class="text-muted mb-1">Marka: ${escapeHTML(urun.marka || 'Belirtilmemiş')}</p>
            <p id="urunKategori" class="text-muted mb-1">Kategori: ${escapeHTML(urun.kategori || 'Belirtilmemiş')}</p>
            <p id="urunStokKodu" class="text-muted mb-3">Stok Kodu: ${escapeHTML(urun.stokKodu || 'Bilinmiyor')}</p>
            <p id="urunStok" class="stock-status mb-3 ${stokMiktari <= 0 ? 'stock-out' : ''}">Stok: ${stokDurumu}        </p>
            </div>
            <div class="mb-3">
              <p id="urunFiyat" class="original-price-text ${urun.indirim > 0 ? '' : 'd-none'}">${(urun.fiyat || 0).toFixed(2)} TL</p>
              <h4 id="urunIndirimliFiyat" class="product-price-text">${indirimliFiyat.toFixed(2)} TL</h4>
            </div>
            
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="input-group quantity-input">
                <button class="btn btn-outline-secondary" type="button" onclick="adetAyarla(-1)">-</button>
                <input type="number" id="adetInput" class="form-control text-center" value="1" min="1" max="${stokMiktari}">
                <button class="btn btn-outline-secondary" type="button" onclick="adetAyarla(1)">+</button>
              </div>
              <button id="sepeteEkleBtn" class="btn btn-primary ${sepeteEkleDisabled}" style="background-color: #EB8220; color: #ffffff;">Sepete Ekle</>
              </button>
            </div>
            <a href="index.html" class="btn btn-outline-secondary mb-3">Geri Dön</a>
            <div class="accordion" id="urunDetayAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header" id="detayHeading">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#detayCollapse" aria-expanded="false" aria-controls="detayCollapse">
                    Ürün Detay
                  </button>
                </h2>
                <div id="detayCollapse" class="accordion-collapse collapse" aria-labelledby="detayHeading" data-bs-parent="#urunDetayAccordion">
                  <div class="accordion-body urun-detay-text">
                    ${formatDetailText(urun.detay)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="benzer-urunler">
          <h4>Benzer Ürünler</h4>
          ${benzerUrunler.length > 0 ? `
            <div class="benzer-urunler-container">
              ${benzerUrunler.map(u => olusturBenzerUrunKart(u)).join('')}
            </div>
          ` : '<p class="text-muted">Bu kategoride başka ürün bulunmamaktadır.</p>'}
        </div>
      `;
      document.getElementById('modalResim').src = urun.resim || 'https://via.placeholder.com/400';
      document.getElementById('sepeteEkleBtn').addEventListener('click', () => {
        const adetInput = document.getElementById('adetInput');
        const adet = parseInt(adetInput ? adetInput.value : 1);
        const urunSepet = {
          id: urun.id,
          ad: urun.ad,
          fiyat: indirimliFiyat,
          adet: adet,
          resim: urun.resim || 'https://via.placeholder.com/400',
          stok: stokMiktari,
          indirim: urun.indirim || 0,
          originalPrice: urun.fiyat || 0,
          stokKodu: urun.stokKodu || '',
          detay: urun.detay || ''
        };
        if (sepet.ekle(urunSepet) && adetInput) {
          urunGoster();
        }
      });
    }

    function adetAyarla(deger) {
      const input = document.getElementById('adetInput');
      const urunId = new URLSearchParams(window.location.search).get('id') || new URLSearchParams(window.location.search).get('Id');
      const urunler = safeParseJSON('urunler', []);
      const urun = urunler.find(u => u.id == urunId);
      if (input && urun) {
        let yeniAdet = parseInt(input.value) + deger;
        if (yeniAdet < 1) yeniAdet = 1;
        if (yeniAdet > urun.stok) {
          bildirimGoster(`Stok yetersiz! Maksimum ${urun.stok} adet ekleyebilirsiniz.`, 'warning');
          yeniAdet = urun.stok;
        }
        input.value = yeniAdet;
      }
    }

    function logout() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      bildirimGoster('Çıkış yapıldı!', 'success');
      window.location.href = 'login.html';
    }

    function initializePasswordForm() {
      const changePasswordForm = document.getElementById('changePasswordForm');
      if (!changePasswordForm) {
        console.error('Şifre formu bulunamadı!');
        return;
      }
      changePasswordForm.addEventListener('submit', e => {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword');
        const newPassword = document.getElementById('newPassword');
        const confirmPassword = document.getElementById('confirmNewPassword');
        const currentUser = safeParseJSON('currentUser', {});

        [currentPassword, newPassword, confirmPassword].forEach(field => field?.classList.remove('is-invalid'));
        let isValid = true;

        if (currentPassword.value !== currentUser.password) {
          currentPassword.classList.add('is-invalid');
          bildirimGoster('Mevcut şifre yanlış.', 'danger');
          isValid = false;
        }
        if (newPassword.value.length < 6) {
          newPassword.classList.add('is-invalid');
          bildirimGoster('Yeni şifre en az 6 karakter olmalı.', 'danger');
          isValid = false;
        }
        if (newPassword.value !== confirmPassword.value) {
          confirmPassword.classList.add('is-invalid');
          bildirimGoster('Yeni şifreler eşleşmiyor.', 'danger');
          isValid = false;
        }

        if (!isValid) return;

        let users = safeParseJSON('users', []);
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
          users[userIndex].password = newPassword.value;
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
          bildirimGoster('Şifre başarıyla değiştirildi!', 'success');
          const profileModal = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
          if (profileModal) profileModal.hide();
          currentPassword.value = '';
          newPassword.value = '';
          confirmPassword.value = '';
        } else {
          bildirimGoster('Kullanıcı bulunamadı, şifre değiştirilemedi.', 'danger');
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      sepet = new Sepet();
      kategoriYukle();
      navbarGuncelle();
      sepet.guncelle();
      urunGoster();
      initializePasswordForm();
    });
  </script>
  <script>
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    function updateCountdown() {
      const now = new Date();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        document.getElementById("countdown").innerHTML = '<i class="bi bi-clock clock-icon"></i>Fırsat sona erdi!';
        return;
      }

      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      document.getElementById("hours").textContent = String(hours).padStart(2, "0");
      document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
      document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
  </script>
  
</body>
</html>

