<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TestSite</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
  <link href="css/index-style.css" rel="stylesheet">
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
  
  margin-right: 3px; /* Kartlar arasında isteğe bağlı boşluk */
}

/* Navbar ikon ayarları */
.navbar-buttons .btn{
  background-color: #fff !important; /* Siyah arka plan */  
  border-color: #dddddd !important;
.navbar-buttons .btn[onclick*="cart.html"] i {
  color: #000 !important; /* Sepet ikonunun beyaz renkte olmasını sağlar */
}

.navbar-buttons .btn[onclick*="cart.html"]:hover {
  background-color: #333333 !important; /* Hover durumunda hafif gri ton */
  border-color: #333333 !important;
}

.navbar-buttons .cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
}
</style>
<style>
        .ad-banner {
            background-color: #025c90; /* Koyu mavi */
            color: white;
            height: 40px; /* Yükseklik 40px */
            display: flex;
            align-items: center; /* Dikeyde ortala */
            justify-content: center; /* Yatayda ortala */
            font-size: 0.75rem; /* Yazı boyutunu küçülttük */
            font-weight: bold;
            padding: 0 8px; /* Padding */
            overflow: hidden; /* Taşmayı önle */
            white-space: nowrap; /* Tek satırda tut */
        }
        .countdown {
            font-size: 0.75rem; /* Geri sayım yazı boyutu */
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
<body class="#">
  <div id="sepetBildirim" class="alert alert-success text-center py-2 fixed-top w-100 d-none" style="z-index: 9999;">
    Sepete eklendi!
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
  <nav class="navbar navbar-dark bg-white sticky-top shadow">
    <div class="container navbar-container">
    <a class="navbar-brand m-0" style="text-shadow: 0px 1px 2px #bbbfc8; font-weight: 600;">
  <a class="navbar-brand" href="index.html" style="color: #000000;">TestSite
</a>       
    <div class="navbar-buttons" id="navbarButtons"></div>
</div>
  </nav>
 
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
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#addressesTab">Adreslerim</a>
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
            <div class="tab-pane fade" id="addressesTab">
              <h5>Adreslerim</h5>
              <button class="btn btn-primary mb-3" id="addAddressBtn"><i class="bi bi-plus"></i> Yeni Adres Ekle</button>
              <div id="addressList"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="addressModal" tabindex="-1" aria-labelledby="addressModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addressModalLabel">Teslimat Adresi</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
        </div>
        <div class="modal-body">
          <div id="savedAddresses" class="mb-3"></div>
          <form id="addressForm" novalidate>
            <div class="mb-3">
              <label for="fullName" class="form-label">Ad Soyad</label>
              <input type="text" class="form-control" id="fullName" required>
              <div class="invalid-feedback">Lütfen adınızı ve soyadınızı girin.</div>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Açık Adres</label>
              <textarea class="form-control" id="address" rows="4" required></textarea>
              <div class="invalid-feedback">Lütfen teslimat adresinizi girin.</div>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Telefon Numarası</label>
              <input type="tel" class="form-control" id="phone" required pattern="[0-9]{10}">
              <div class="invalid-feedback">Lütfen geçerli bir 10 haneli telefon numarası girin (örn: 5551234567).</div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Adresi Kaydet</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <main class="container py-2">
    <div class="row mb-3">
      <div class="col-md-6">
        <div class="input-group shadow-sm">
          <input type="text" id="productSearch" class="form-control" placeholder="Ürün ara...">
          <button id="searchBtn" class="btn" style="background-color: #DAA520; color: #fff; border-color: #DAA520;"><i class="bi bi-search"></i></button>
        </div>
      </div>
    </div>



    <!-- Markalar Bölümü -->
    <section class="brands-sectionbg-white py-2"">
      <div class="container">
        <h2 class="text-center mb-4">Markalar</h2>
        <div class="brands-scroll-container" id="brandsList"></div>
      </div>
    </section>

    <section class="product-carousel-section bg-white">
  <div id="vitrinBloklari"></div>
</section>

    <div class="row row-cols-2 g-2 productList" id="productList"></div>
  </main>

  <section class="about-section bg-light py-4">
    <div class="container">
      <h2 class="text-center mb-4">Neden Bizi Seçmelisiniz?</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="text-center col about-feature">
          <i class="fas fa-truck fa-3x text-primary mb-3"></i>
          <h5>Hızlı Kargo</h5>
          <p>Siparişleriniz en kısa sürede kapınızda.</p>
        </div>
        <div class="text-center col about-feature">
          <i class="fas fa-lock fa-3x text-success mb-3"></i>
          <h5>Güvenli Ödeme</h5>
          <p>Ödemelerinizi güvenle gerçekleştirebilirsiniz.</p>
        </div>
        <div class="text-center col about-feature">
          <i class="fas fa-headset fa-3x text-info mb-3"></i>
          <h5>7/24 Destek</h5>
          <p>Her zaman yanınızdayız.</p>
        </div>
      </div>
    </div>
  </section>

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
          <li><i class="fas fa-envelope"></i> info@linfelix.com</li>
          <li><i class="fas fa-phone"></i> 0 (555) 123 45 67</li>
          <li><i class="fas fa-map-marker-alt"></i>Türkiye</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <p>© 2025 TestSite.com - Tüm hakları saklıdır.</p>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.1/jspdf.plugin.autotable.min.js"></script>
  <script src="DejaVuSans.js"></script>

  <script>
    // --- Yardımcı Fonksiyonlar ---
    function escapeHTML(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function safeParseJSON(key, defaultValue) {
      try {
        const data = localStorage.getItem(key);
        if (data === null || data === undefined || data === "undefined") {
          console.warn(`safeParseJSON: Anahtar '${key}' bulunamadı veya 'undefined' stringi. Varsayılan değer döndürülüyor.`);
          return defaultValue;
        }
        const parsedData = JSON.parse(data);
        if (parsedData === null || parsedData === undefined) {
          console.warn(`safeParseJSON: Anahtar '${key}' için ayrıştırılan veri boş/tanımsız. Varsayılan değer döndürülüyor. Ham veri:`, data);
          return defaultValue;
        }
        return parsedData;
      } catch (err) {
        console.error(`safeParseJSON Hata: '${key}' anahtarı ayrıştırılamadı. Hata:`, err, `Sorunlu Veri:`, localStorage.getItem(key));
        bildirimGoster(`Veri hatası: '${key}' yüklenemedi. Konsolu kontrol edin.`, 'danger');
        return defaultValue;
      }
    }

    function calculateDiscountedPrice(originalPrice, discountPercentage) {
      originalPrice = Number(originalPrice) || 0;
      discountPercentage = Number(discountPercentage) || 0;
      if (discountPercentage > 0 && discountPercentage <= 100) {
        return originalPrice * (1 - discountPercentage / 100);
      }
      return originalPrice;
    }

    function bildirimGoster(mesaj, tip = 'success') {
      const bildirim = document.createElement('div');
      bildirim.className = `alert alert-${tip} alert-dismissible fade show`;
      bildirim.innerHTML = `
        ${mesaj}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(bildirim);
      setTimeout(() => bildirim.remove(), 3000);
    }

    // --- Kimlik Doğrulama ve Kullanıcı Yönetimi ---
    function logout() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      bildirimGoster('Çıkış yapıldı.');
      window.location.assign('login.html');
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
        const doc = new jsPDF('p', 'mm', 'a4');

        doc.addFileToVFS("DejaVuSans.ttf", DejaVuSans);
        doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
        doc.setFont("DejaVuSans", "normal");
        
        doc.addFileToVFS("DejaVuSansBold.ttf", DejaVuSans);
        doc.addFont("DejaVuSansBold.ttf", "DejaVuSans-Bold", "bold");
        doc.setFont("DejaVuSans-Bold", "bold");

        const primaryColor = '#007bff';
        const secondaryColor = '#6c757d';
        const textColor = '#343a00';
        const lightBgColor = '#f8f9fa';

        let currentY = 20;
        const leftMargin = 7;
        const rightMargin = 5;
        const pageWidth = doc.internal.pageSize.width;
        const availableWidth = pageWidth - (leftMargin + rightMargin);
        const maxTextWidthForSplit = availableWidth / 2 - 10;
        const defaultLineHeight = 5;

        doc.setFontSize(24);
        doc.setTextColor(primaryColor);
        doc.text('MehtapStore', pageWidth / 2, currentY, { align: 'center' });
        currentY += 10;

        doc.setFillColor(lightBgColor);
        doc.rect(leftMargin, currentY - 5, availableWidth, 45, 'F');

        doc.setFont("DejaVuSans", "normal");
        doc.setFontSize(12);
        doc.setTextColor(textColor);
        doc.text('Müşteri Bilgileri', leftMargin + 5, currentY);
        doc.text('Sipariş Bilgileri', pageWidth / 2 + 54, currentY);
        currentY += 8;

        const customerInfoX = leftMargin + 5;
        const orderInfoRightEdgeX = pageWidth - rightMargin - 5;

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

        const tableData = [];
        let totalOriginalPrice = 0;
        let totalDiscountAmount = 0;
        let totalNetPrice = 0;

        const urunler = safeParseJSON('urunler', []);
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(item => {
            const urun = urunler.find(u => u.id === item.id);
            const originalPrice = Number(urun?.fiyat || item.fiyat);
            const indirimOrani = Number(item.indirim) || 0;
            const netFiyat = Number(item.fiyat);
            const adet = Number(item.adet) || 0;
            const indirimTutari = (originalPrice - netFiyat) * adet;
            totalOriginalPrice += originalPrice * adet;
            totalDiscountAmount += indirimTutari;
            totalNetPrice += netFiyat * adet;

            const productName = escapeHTML(item.ad || '');

            tableData.push([
              productName,
              `${adet}`,
              `${originalPrice.toFixed(2)} `,
              `%${indirimOrani}`,
              `${netFiyat.toFixed(2)} `,
              `${(netFiyat * adet).toFixed(2)} `
            ]);
          });
        }

        doc.autoTable({
          startY: currentY,
          head: [['Ürün Adı', 'Adet', 'Fiyat', 'İndirim', 'Net Fiyat', 'Toplam']],
          body: tableData,
          theme: 'striped',
          styles: {
            font: 'DejaVuSans',
            fontSize: 9,
            cellPadding: 3,
            lineColor: '#dee2e6',
            fontStyle: 'bold',
            lineWidth: 0.1,
            textColor: textColor
          },
          headStyles: {
            fillColor: primaryColor,
            textColor: '#ffffff',
            fontStyle: 'bold',
            halign: 'center'
          },
          bodyStyles: {
            halign: 'left'
          },
          columnStyles: {
            0: { cellWidth: 95, overflow: 'linebreak' },
            1: { cellWidth: 15, halign: 'center' },
            2: { cellWidth: 23, halign: 'right' },
            3: { cellWidth: 19, halign: 'center' },
            4: { cellWidth: 23, halign: 'right' },
            5: { cellWidth: 23, halign: 'right' }
          },
          margin: { left: leftMargin, right: rightMargin },
          didDrawPage: function(data) {
            doc.setFont('DejaVuSans', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(secondaryColor);
            doc.text(`Sayfa ${doc.internal.getNumberOfPages()}`, pageWidth - rightMargin, doc.internal.pageSize.height - 10, {
              align: 'right'
            });
          }
        });

        currentY = doc.autoTable.previous.finalY + 10;

        doc.setFont('DejaVuSans-Bold', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(textColor);

        const summaryRightAlignX = pageWidth - rightMargin - 2;
        const summaryLineHeight = 8;

        const totalOriginalPriceText = `Genel Toplam: ${totalOriginalPrice.toFixed(2)} `;
        const totalDiscountAmountText = `Toplam İndirim: ${totalDiscountAmount.toFixed(2)} `;
        const totalNetPriceText = `Kalan Net Tutar: ${totalNetPrice.toFixed(2)} `;

        doc.text(totalOriginalPriceText, summaryRightAlignX - doc.getTextWidth(totalOriginalPriceText), currentY);
        currentY += summaryLineHeight;
        doc.text(totalDiscountAmountText, summaryRightAlignX - doc.getTextWidth(totalDiscountAmountText), currentY);
        currentY += summaryLineHeight;
        doc.text(totalNetPriceText, summaryRightAlignX - doc.getTextWidth(totalNetPriceText), currentY);

        doc.save(`siparis_${escapeHTML(orderId)}.pdf`);
      } catch (err) {
        console.error('PDF oluşturma hatası:', err);
        bildirimGoster('PDF oluşturulamadı!', 'danger');
      }
    }

    function displayOrders() {
      const ordersList = document.getElementById('ordersList');
      if (!ordersList) {
        console.error('ordersList elementi bulunamadı!');
        return;
      }

      const currentUser = safeParseJSON('currentUser');
      const orders = safeParseJSON('orders', []);
      const urunler = safeParseJSON('urunler', []);
      const userOrders = orders.filter(order => order.userEmail === currentUser.email);

      ordersList.innerHTML = '';
      if (userOrders.length === 0) {
        ordersList.innerHTML = '<p class="text-muted">Henüz siparişiniz yok.</p>';
        return;
      }

      userOrders.forEach((order, index) => {
        const safeOrderId = escapeHTML(order.id);
        const orderStatus = {
          pending: { text: 'Beklemede', class: 'bg-warning' },
          shipped: { text: 'Kargoda', class: 'bg-primary' },
          delivered: { text: 'Teslim Edildi', class: 'bg-success' }
        }[order.status] || { text: 'Bilinmeyen Durum', class: 'bg-secondary' };

        let totalNetPrice = 0;
        if (order.items && Array.isArray(order.items)) {
          totalNetPrice = order.items.reduce((sum, item) => {
            return sum + (Number(item.fiyat || 0) * Number(item.adet || 0));
          }, 0);
        }

        const orderElement = document.createElement('div');
        orderElement.className = 'accordion-item';
        orderElement.innerHTML = `
          <h2 class="accordion-header" id="orderHeading${index}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#orderCollapse${index}" aria-expanded="false" aria-controls="orderCollapse${index}">
              Sipariş #${safeOrderId} - ${new Date(order.date).toLocaleString('tr-TR')} 
              <span class="badge ${orderStatus.class} ms-2">${orderStatus.text}</span>
            </button>
          </h2>
          <div id="orderCollapse${index}" class="accordion-collapse collapse" aria-labelledby="orderHeading${index}" data-bs-parent="#ordersList">
            <div class="accordion-body">
              <p><strong>Ad Soyad:</strong> ${escapeHTML(order.fullName || 'Belirtilmemiş')}</p>
              <p><strong>Kullanıcı E-posta:</strong> ${escapeHTML(order.userEmail || 'Bilinmeyen')}</p>
              <p><strong>Adres:</strong> ${escapeHTML(order.address || 'Belirtilmemiş')}</p>
              <p><strong>Telefon:</strong> ${escapeHTML(order.phone || 'Belirtilmemiş')}</p>
              <ul class="list-group mb-3">
                ${(order.items || []).map(item => {
                  const urun = urunler.find(u => u.id === item.id);
                  const orijinalFiyat = urun ? Number(urun.fiyat) : Number(item.fiyat) || 0;
                  const indirim = Number(item.indirim) || 0;
                  const indirimliFiyat = calculateDiscountedPrice(orijinalFiyat, indirim);
                  return `
                    <li class="list-group-item d-flex align-items-center">
                      <img src="${escapeHTML(item.resim || '')}" class="order-item-img me-3" alt="${escapeHTML(item.ad || 'Bilinmeyen')}" onerror="this.src='https://via.placeholder.com/45'">
                      <div>
                        <h6 class="mb-1">${escapeHTML(item.ad || 'Bilinmeyen')}</h6>
                        <p class="mb-0 text-muted">
                          <small>Adet: ${item.adet || 1}</small><br>
                          <small>Fiyat: ₺${orijinalFiyat.toFixed(2)}</small>
                          ${indirim ? `<br><small>İndirim: %${indirim}</small>` : ''}
                          ${indirim ? `<br><span class="text-warning">İndirimli: ₺${indirimliFiyat.toFixed(2)}</span>` : ''}
                        </p>
                      </div>
                    </li>`;
                }).join('')}
              </ul>
              <p><strong>Toplam:</strong> ₺${totalNetPrice.toFixed(2)}</p>
              <div class="text-end">
                <button class="btn btn-sm btn-info me-2 print-order" data-order-id="${safeOrderId}">
                  <i class="fas fa-file-pdf"></i> PDF İndir
                </button>
                ${order.status === 'pending' ? `
                  <button class="btn btn-danger btn-sm cancel-order" data-order-id="${safeOrderId}">Siparişi İptal Et</button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
        ordersList.appendChild(orderElement);
      });

      document.querySelectorAll('.print-order').forEach(button => {
        button.addEventListener('click', () => printOrderAsPDF(button.dataset.orderId));
      });

      document.querySelectorAll('.cancel-order').forEach(button => {
        button.addEventListener('click', () => cancelOrder(button.dataset.orderId));
      });
    }

    function cancelOrder(orderId) {
      if (!confirm('Bu siparişi iptal etmek istediğinize emin misiniz?')) return;
      let orders = safeParseJSON('orders', []);
      const order = orders.find(o => o.id === orderId);
      if (!order || order.status !== 'pending') {
        bildirimGoster('Sadece beklemede olan siparişler iptal edilebilir!', 'danger');
        return;
      }

      const urunler = safeParseJSON('urunler', []);
      order.items.forEach(item => {
        const guncelUrun = urunler.find(u => u.id === item.id);
        if (guncelUrun) guncelUrun.stok += item.adet;
      });
      localStorage.setItem('urunler', JSON.stringify(urunler));
      orders = orders.filter(o => o.id !== orderId);
      localStorage.setItem('orders', JSON.stringify(orders));
      bildirimGoster('Sipariş başarıyla iptal edildi!');
      displayOrders();
      urunleriGoster();
      loadVitrins();
    }

    // --- Sepet Sınıfı ---
    class Sepet {
      constructor() {
        this.sepet = safeParseJSON('sepet', []);
        if (!Array.isArray(this.sepet)) {
          console.warn('Sepet verisi geçersiz, boş diziyle başlatılıyor.');
          this.sepet = [];
        }
        console.log('Sepet başlatıldı:', JSON.stringify(this.sepet, null, 2));
        this.guncelle();
      }

      kaydet() {
        try {
          localStorage.setItem('sepet', JSON.stringify(this.sepet));
          console.log('Sepet kaydedildi:', JSON.stringify(this.sepet, null, 2));
        } catch (e) {
          console.error('Sepet kaydedilirken hata oluştu:', e);
        }
      }

      ekle(urun) {
        const urunlerLocal = safeParseJSON('urunler', []);
        const guncelUrunBilgisi = urunlerLocal.find(item => item.id === urun.id);
        if (!guncelUrunBilgisi) {
          bildirimGoster('Ürün bilgisi bulunamadı!', 'danger');
          return;
        }

        const mevcut = this.sepet.find(item => item.id === urun.id);
        const mevcutSepetAdedi = mevcut ? mevcut.adet : 0;
        const eklenecekAdet = urun.adet;
        const toplamAdet = mevcutSepetAdedi + eklenecekAdet;

        if (toplamAdet > guncelUrunBilgisi.stok) {
          bildirimGoster(`Stok yetersiz! Maksimum eklenebilir adet: ${guncelUrunBilgisi.stok - mevcutSepetAdedi} adet.`, 'danger');
          return;
        }

        if (mevcut) {
          mevcut.adet += eklenecekAdet;
          mevcut.fiyat = calculateDiscountedPrice(guncelUrunBilgisi.fiyat, guncelUrunBilgisi.indirim);
          mevcut.indirim = guncelUrunBilgisi.indirim || 0;
        } else {
          this.sepet.push({
            ...urun,
            fiyat: calculateDiscountedPrice(guncelUrunBilgisi.fiyat, guncelUrunBilgisi.indirim),
            stok: guncelUrunBilgisi.stok,
            indirim: guncelUrunBilgisi.indirim || 0
          });
        }

        guncelUrunBilgisi.stok -= eklenecekAdet;
        localStorage.setItem('urunler', JSON.stringify(urunlerLocal));
        this.kaydet();
        this.guncelle();
        this.bildirimGoster();
        urunleriGoster();
        loadVitrins();
      }

      urunCikar(urunId, adet) {
        const mevcut = this.sepet.find(item => item.id === urunId);
        if (!mevcut) return;

        mevcut.adet -= adet;
        if (mevcut.adet <= 0) {
          this.sepet = this.sepet.filter(item => item.id !== urunId);
        }

        const urunler = safeParseJSON('urunler', []);
        const guncelUrun = urunler.find(item => item.id === urunId);
        if (guncelUrun) {
          guncelUrun.stok += adet;
          localStorage.setItem('urunler', JSON.stringify(urunler));
        }

        this.kaydet();
        this.guncelle();
        urunleriGoster();
        loadVitrins();
      }

      sepetiTemizle() {
        if (confirm('Sepeti tamamen boşaltmak istediğinize emin misiniz?')) {
          const urunler = safeParseJSON('urunler', []);
          this.sepet.forEach(item => {
            const guncelUrun = urunler.find(u => u.id === item.id);
            if (guncelUrun) guncelUrun.stok += item.adet;
          });
          this.sepet = [];
          localStorage.setItem('urunler', JSON.stringify(urunler));
          this.kaydet();
          this.guncelle();
          urunleriGoster();
          loadVitrins();
        }
      }

      guncelle() {
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
          const totalItems = this.sepet.reduce((a, item) => a + item.adet, 0);
          cartBadge.textContent = totalItems;
          console.log('Sepet rozeti güncellendi:', totalItems, 'Sepet içeriği:', JSON.stringify(this.sepet, null, 2));
        }
      }

      bildirimGoster() {
        const bildirim = document.getElementById('sepetBildirim');
        if (bildirim) {
          bildirim.classList.remove('d-none');
          setTimeout(() => bildirim.classList.add('d-none'), 2000);
        }
      }
    }

    // --- Kategori Yönetimi ---
    function getBenzersizKategoriler() {
      const urunler = safeParseJSON('urunler', []);
      return [...new Set(urunler.map(urun => urun.kategori).filter(kategori => kategori))];
    }

    function kategoriMenusuGuncelle() {
      const kategoriListesi = document.getElementById('kategoriListesi');
      if (!kategoriListesi) return;

      const kategoriler = getBenzersizKategoriler();
      while (kategoriListesi.children.length > 1) {
        kategoriListesi.removeChild(kategoriListesi.lastChild);
      }

      kategoriler.forEach(kategori => {
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'list-group-item list-group-item-action';
        a.dataset.kategori = kategori;
        a.textContent = kategori;
        kategoriListesi.appendChild(a);
      });

      kategoriListesi.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          const kategori = this.getAttribute('data-kategori');
          urunleriGoster(kategori);
          const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('kategoriOffcanvas'));
          if (offcanvas) offcanvas.hide();
        });
      });
    }

    // --- Marka Yönetimi ---
    function getBenzersizMarkalar() {
      const urunler = safeParseJSON('urunler', []);
      return [...new Set(urunler.map(urun => urun.marka).filter(marka => marka && marka !== 'Belirtilmemiş'))].map(marka => {
        const urun = urunler.find(u => u.marka === marka);
        return {
          ad: marka,
          logo: urun?.markaLogo || 'https://via.placeholder.com/60' // Varsayılan logo
        };
      });
    }

    function markalariGoster() {
      const brandsList = document.getElementById('brandsList');
      if (!brandsList) {
        console.error('brandsList elementi bulunamadı!');
        return;
      }

      const markalar = getBenzersizMarkalar();
      brandsList.innerHTML = '';

      if (markalar.length === 0) {
        brandsList.innerHTML = '<p class="text-muted text-center">Marka bulunamadı.</p>';
        return;
      }

      markalar.forEach(marka => {
        const brandItem = document.createElement('div');
        brandItem.className = 'brand-item';
        brandItem.innerHTML = `
          <a href="#" class="brand-link" data-marka="${escapeHTML(marka.ad)}">
            <img src="${escapeHTML(marka.logo)}" alt="${escapeHTML(marka.ad)}" class="brand-logo" onerror="this.src='https://via.placeholder.com/60'">
            <p class="brand-name">${escapeHTML(marka.ad)}</p>
          </a>
        `;
        brandsList.appendChild(brandItem);
      });

      document.querySelectorAll('.brand-link').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const marka = this.dataset.marka;
          urunleriGoster(null, null, marka);
        });
      });
    }

    // --- Ürün Listeleme ---
    function urunleriGoster(filtreKategori = null, aramaKelimesi = null, filtreMarka = null) {
      const urunListesi = document.getElementById('productList');
      const productCarouselSection = document.querySelector('.product-carousel-section');
      if (!urunListesi) return;

      if (filtreKategori || aramaKelimesi || filtreMarka) {
        if (productCarouselSection) productCarouselSection.style.display = 'none';
      } else {
        if (productCarouselSection) productCarouselSection.style.display = 'block';
      }

      urunListesi.innerHTML = '';
      const urunler = safeParseJSON('urunler', []);

      urunler.forEach(urun => {
        urun.yeniUrun = urun.yeniUrun === true;
        urun.ucretsizKargo = urun.ucretsizKargo === true;
        urun.indirim = urun.indirim !== undefined ? Number(urun.indirim) : 0;
      });

      let filtrelenmisUrunler = urunler;

      if (!filtreKategori && !aramaKelimesi && !filtreMarka) {
        filtrelenmisUrunler = urunler.filter(urun => urun.anasayfadaGoster === true);
      }

      if (filtreKategori) {
        filtrelenmisUrunler = filtrelenmisUrunler.filter(urun => filtreKategori === 'hepsi' ? true : urun.kategori === filtreKategori);
      }

      if (aramaKelimesi) {
        const lowerCaseArama = aramaKelimesi.toLowerCase();
        filtrelenmisUrunler = filtrelenmisUrunler.filter(urun => urun.ad.toLowerCase().includes(lowerCaseArama) || (urun.stokKodu && urun.stokKodu.toLowerCase().includes(lowerCaseArama)));
      }

      if (filtreMarka) {
        filtrelenmisUrunler = filtrelenmisUrunler.filter(urun => urun.marka === filtreMarka);
      }

      if (filtrelenmisUrunler.length === 0) {
        urunListesi.innerHTML = '<div class="col-12"><p class="text-muted text-center">Ürün bulunamadı.</p></div>';
        return;
      }

      filtrelenmisUrunler.forEach(urun => {
        urun.stok = urun.stok !== undefined ? urun.stok : 0;
        const stokDurumu = urun.stok > 0 ? `${urun.stok} adet stokta` : '<span class="text-danger fw-bold">Stok Tükendi</span>';
        const stokKodu = urun.stokKodu || 'Bilinmiyor';
        const indirimliFiyat = calculateDiscountedPrice(urun.fiyat, urun.indirim);

        let etiketlerHtml = `<div class="product-badges">`;
        if (urun.yeniUrun) {
          etiketlerHtml += `<span class="badge new-product-badge">YENİ ÜRÜN</span>`;
        }
        if (urun.ucretsizKargo) {
          etiketlerHtml += `<span class="badge free-shipping-badge">ÜCRETSİZ KARGO</span>`;
        }
        if (urun.indirim > 0) {
          etiketlerHtml += `<span class="badge bg-danger text-white">%${urun.indirim} İNDİRİM</span>`;
        }
        etiketlerHtml += `</div>`;

        const urunCard = document.createElement('div');
        urunCard.classList.add('col-6', 'col-md-4', 'col-lg-3');
        urunCard.innerHTML = `
          <div class="card product-card h-100 border-0 shadow-sm position-relative">
            ${etiketlerHtml}
            <img src="${encodeURI(escapeHTML(urun.resim))}" class="product-image" alt="${escapeHTML(urun.ad)}" onerror="this.src='https://via.placeholder.com/130'">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-center">${escapeHTML(urun.ad)}</h5>
              <p class="card-text text-muted small text-center">Marka: ${escapeHTML(urun.marka || 'Belirtilmemiş')}</p>
              
              <p class="card-text text-muted small text-center">${stokDurumu}</p>
              <div class="text-center mt-auto">
                ${urun.indirim > 0 ? `
                  <p class="card-text original-price">${Number(urun.fiyat).toFixed(2)} ₺</p>
                  <h4 class="card-price discount-price">${indirimliFiyat.toFixed(2)} ₺</h4>
                ` : `
                  <h4 class="card-price">${Number(urun.fiyat).toFixed(2)} ₺</h4>
                `}
                <div class="d-flex flex-column align-items-center gap-0">
                  <div class="input-group input-group-sm" style="width: 100px;">
                    <button class="btn btn-outline-secondary azalt" type="button" data-urun-id="${escapeHTML(urun.id)}">-</button>
                    <input type="number" class="form-control text-center adet-input" value="1" min="1" max="${urun.stok}">
                    <button class="btn btn-outline-secondary artir" type="button" data-urun-id="${escapeHTML(urun.id)}">+</button>
                  </div>
                 <button class="btn btn-sm btn-outline-secondary sepete-ekle mt-2" style="background-color: #EB8220; color: #ffffff;"Sepete Ekle
                    data-urun-id="${escapeHTML(urun.id)}"
                    data-urun-ad="${escapeHTML(urun.ad)}"
                    data-urun-fiyat="${indirimliFiyat}"
                    data-urun-resim="${escapeHTML(urun.resim)}"
                    data-urun-stok="${urun.stok}"
                    data-urun-indirim="${urun.indirim || 0}"
                    ${urun.stok === 0 ? 'disabled' : ''}>
                    <i class="bi bi-cart-plus"></i> Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
        urunListesi.appendChild(urunCard);

        urunCard.addEventListener('click', function(e) {
          if (!e.target.closest('.sepete-ekle') && !e.target.closest('.input-group') &&
              !e.target.classList.contains('azalt') && !e.target.classList.contains('artir')) {
            window.location.href = `urun-detay.html?id=${escapeHTML(urun.id)}`;
          }
        });

        const azaltBtn = urunCard.querySelector('.azalt');
        const artirBtn = urunCard.querySelector('.artir');
        const inputEl = urunCard.querySelector('.adet-input');
        const sepeteEkleBtn = urunCard.querySelector('.sepete-ekle');

        azaltBtn.addEventListener('click', () => {
          let val = parseInt(inputEl.value);
          if (val > 1) inputEl.value = val - 1;
        });

        artirBtn.addEventListener('click', () => {
          let val = parseInt(inputEl.value);
          if (val < urun.stok) {
            inputEl.value = val + 1;
          }
        });

        inputEl.addEventListener('change', () => {
          let val = parseInt(inputEl.value);
          if (isNaN(val) || val < 1) {
            inputEl.value = 1;
          } else if (val > urun.stok) {
            inputEl.value = urun.stok;
          }
        });

        sepeteEkleBtn.addEventListener('click', function() {
          const urunBilgisi = safeParseJSON('urunler', []).find(p => p.id === this.dataset.urunId);
          const eklenecekAdet = parseInt(inputEl.value);
          if (!urunBilgisi || urunBilgisi.stok < eklenecekAdet) {
            bildirimGoster(`Yetersiz stok! Sadece ${urunBilgisi ? urunBilgisi.stok : 0} adet eklenebilir.`, 'danger');
            inputEl.value = urunBilgisi ? urunBilgisi.stok : 1;
            return;
          }

          const urun = {
            id: this.dataset.urunId,
            ad: this.dataset.urunAd,
            fiyat: parseFloat(this.dataset.urunFiyat),
            adet: eklenecekAdet,
            resim: this.dataset.urunResim,
            stok: parseInt(this.dataset.urunStok),
            indirim: parseFloat(this.dataset.urunIndirim),
            stokKodu: urunBilgisi.stokKodu || 'N/A',
            marka: urunBilgisi.marka || 'Belirtilmemiş'
          };
          window.sepet.ekle(urun);
          inputEl.value = '1';
        });
      });
    }

    // --- Vitrin Yönetimi ---
    function loadVitrins() {
      const vitrinBloklari = document.getElementById('vitrinBloklari');
      if (!vitrinBloklari) {
        console.error('Hata: vitrinBloklari elementi bulunamadı!');
        return;
      }

      vitrinBloklari.innerHTML = '';
      const urunler = safeParseJSON('urunler', []);
      const vitrinler = safeParseJSON('vitrinler', []);

      if (!Array.isArray(urunler) || !Array.isArray(vitrinler)) {
        console.error('Geçersiz veri formatı: urunler veya vitrinler dizi değil.');
        vitrinBloklari.innerHTML = '<p class="text-muted text-center w-100">Vitrin yüklenemedi, veri geçersiz.</p>';
        return;
      }

      let hasContent = false;

      function renderVitrin(title, productList) {
        if (!Array.isArray(productList) || productList.length === 0) return '';
        hasContent = true;
        let blockHtml = `
          <div class="vitrin-bolumu">
            <h2 class="text-center mb-4">${escapeHTML(title)}</h2>
            <div class="product-scroll-container">
        `;
        productList.forEach(urun => {
          if (!urun || !urun.id || !urun.ad || !urun.fiyat || !urun.resim) {
            console.warn('Geçersiz ürün verisi:', urun);
            return;
          }

          const indirimliFiyat = calculateDiscountedPrice(urun.fiyat, urun.indirim);
          const disableButton = urun.stok === 0 ? 'disabled' : '';
          const stokDurumu = urun.stok > 0 ? `${urun.stok} adet stokta` : '<span class="text-danger">Stok Tükendi</span>';

          let etiketlerHtml = `<div class="product-badges">`;
          if (urun.yeniUrun) {
            etiketlerHtml += `<span class="badge bg-info">Yeni Ürün</span>`;
          }
          if (urun.ucretsizKargo) {
            etiketlerHtml += `<span class="badge bg-success">Ücretsiz Kargo</span>`;
          }
          if (urun.indirim > 0) {
            etiketlerHtml += `<span class="badge bg-danger text-white">%${urun.indirim} İNDİRİM</span>`;
          }
          etiketlerHtml += `</div>`;

          blockHtml += `
            <div class="product-scroll-item">
              <div class="product-card shadow-sm h-100 position-relative">
                <img src="${escapeHTML(urun.resim)}" class="card-img-top product-image" alt="${escapeHTML(urun.ad)}" onerror="this.src='https://via.placeholder.com/160'">
                ${etiketlerHtml}
                <div class="card-body text-center d-flex flex-column">
                  <h5 class="card-title">${escapeHTML(urun.ad)}</h5>
                  <p class="card-text text-muted small">Marka: ${escapeHTML(urun.marka || 'Belirtilmemiş')}</p>
                  <p class="card-text text-muted small">${stokDurumu}</p>
                  ${urun.indirim > 0 ? `
                    <p class="card-text original-price">${Number(urun.fiyat).toFixed(2)} ₺</p>
                    <p class="card-price discount-price">${indirimliFiyat.toFixed(2)} ₺</p>
                  ` : `
                    <p class="card-price">${Number(urun.fiyat).toFixed(2)} ₺</p>
                  `}
                  <div class="d-flex justify-content-center gap-2 mt-auto">
                    <a href="urun-detay.html?id=${escapeHTML(urun.id)}" class="btn btn-outline-primary btn-sm">Detaylar</a>
                    <button class="btn btn-success btn-sm sepete-ekle-carousel"
                            data-urun-id="${escapeHTML(urun.id)}"
                            data-urun-ad="${escapeHTML(urun.ad)}"
                            data-urun-fiyat="${indirimliFiyat}"
                            data-urun-resim="${escapeHTML(urun.resim)}"
                            data-urun-stok="${Number(urun.stok || 0)}"
                            data-urun-indirim="${Number(urun.indirim || 0)}"
                            ${disableButton}>
                      <i class="fas fa-shopping-cart"></i> Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
        blockHtml += '</div></div>';
        return blockHtml;
      }

      let output = '';
      vitrinler.forEach(vitrin => {
        if (!vitrin || !vitrin.ad || !Array.isArray(vitrin.urunIds)) {
          console.warn('Geçersiz vitrin verisi:', vitrin);
          return;
        }
        const vitrinUrunleri = urunler.filter(urun => vitrin.urunIds.includes(urun.id));
        output += renderVitrin(vitrin.ad, vitrinUrunleri);
      });

      vitrinBloklari.innerHTML = hasContent ?
        output :
        '<p class="text-muted text-center w-100"></p>';

      document.querySelectorAll('.sepete-ekle-carousel').forEach(button => {
        button.addEventListener('click', function() {
          const urunBilgisi = urunler.find(p => p.id === this.dataset.urunId);
          const eklenecekAdet = 1;

          if (!urunBilgisi || urunBilgisi.stok < eklenecekAdet) {
            bildirimGoster(`Yetersiz stok! Sadece ${urunBilgisi ? urunBilgisi.stok : 0} adet eklenebilir.`, 'danger');
            return;
          }

          const urun = {
            id: this.dataset.urunId,
            ad: this.dataset.urunAd,
            fiyat: parseFloat(this.dataset.urunFiyat),
            adet: eklenecekAdet,
            resim: this.dataset.urunResim,
            stok: parseInt(this.dataset.urunStok),
            indirim: parseFloat(this.dataset.urunIndirim),
            stokKodu: urunBilgisi.stokKodu || 'N/A',
            marka: urunBilgisi.marka || 'Belirtilmemiş'
          };
          window.sepet.ekle(urun);
        });
      });
    }

    // --- Adres Yönetimi ---
    function displayAddresses() {
      const addressList = document.getElementById('addressList');
      if (!addressList) return;

      const currentUser = safeParseJSON('currentUser');
      const addresses = currentUser.addresses || [];

      addressList.innerHTML = '';
      if (addresses.length === 0) {
        addressList.innerHTML = '<p class="text-muted">Henüz kaydedilmiş adresiniz yok.</p>';
        return;
      }

      addresses.forEach((address, index) => {
        const div = document.createElement('div');
        div.className = 'card mb-2';
        div.innerHTML = `
          <div class="card-body">
            <h6 class="card-title">Adres ${index + 1}</h6>
            <p class="mb-1"><strong>Ad Soyad:</strong> ${escapeHTML(address.fullName)}</p>
            <p class="mb-1"><strong>Adres:</strong> ${escapeHTML(address.address)}</p>
            <p class="mb-1"><strong>Telefon:</strong> ${escapeHTML(address.phoneNumber)}</p>
            <div class="text-end">
              <button class="btn btn-sm btn-primary edit-address me-2" data-index="${index}">
                <i class="bi bi-pencil"></i> Düzenle
              </button>
              <button class="btn btn-sm btn-danger delete-address" data-index="${index}">
                <i class="bi bi-trash"></i> Sil
              </button>
            </div>
          </div>
        `;
        addressList.appendChild(div);
      });

      document.querySelectorAll('.edit-address').forEach(button => {
        button.addEventListener('click', () => {
          const index = parseInt(button.dataset.index);
          openAddressModal(index);
        });
      });

      document.querySelectorAll('.delete-address').forEach(button => {
        button.addEventListener('click', () => {
          const index = parseInt(button.dataset.index);
          deleteAddress(index);
        });
      });
    }

    function openAddressModal(index = null) {
      const addressModalElement = document.getElementById('addressModal');
      if (!addressModalElement) {
        console.error('addressModal bulunamadı!');
        return;
      }
      const addressModal = new bootstrap.Modal(addressModalElement);
      const form = document.querySelector('#addressForm');
      const modalTitle = document.getElementById('addressModalLabel');
      const currentUser = safeParseJSON('currentUser');

      if (index !== null && currentUser.addresses && currentUser.addresses[index]) {
        modalTitle.textContent = 'Adresi Düzenle';
        const address = currentUser.addresses[index];
        form.querySelector('#fullName').value = address.fullName || '';
        form.querySelector('#address').value = address.address || '';
        form.querySelector('#phone').value = address.phoneNumber || '';
        form.dataset.index = index;
      } else {
        modalTitle.textContent = 'Yeni Adres Ekle';
        form.reset();
        delete form.dataset.index;
      }

      ['fullName', 'address', 'phone'].forEach(field => {
        const input = form.querySelector(`#${field}`);
        if (input) input.classList.remove('is-invalid');
      });

      addressModal.show();
    }

    function saveAddress(event) {
      event.preventDefault();
      const form = event.target;
      const fullNameInput = form.querySelector('#fullName');
      const addressInput = form.querySelector('#address');
      const phoneInput = form.querySelector('#phone');

      const fullName = fullNameInput.value.trim();
      const address = addressInput.value.trim();
      const phone = phoneInput.value.trim();

      let isValid = true;
      if (!fullName) {
        fullNameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        fullNameInput.classList.remove('is-invalid');
      }

      if (!address) {
        addressInput.classList.add('is-invalid');
        isValid = false;
      } else {
        addressInput.classList.remove('is-invalid');
      }

      if (!phone.match(/^\d{10}$/)) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
      } else {
        phoneInput.classList.remove('is-invalid');
      }

      if (!isValid) return;

      let currentUser = safeParseJSON('currentUser');
      let users = safeParseJSON('users', []);
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if (userIndex === -1) {
        bildirimGoster('Kullanıcı bulunamadı!', 'danger');
        return;
      }

      if (!currentUser.addresses) {
        currentUser.addresses = [];
      }

      const addressData = {
        fullName: fullName,
        address: address,
        phoneNumber: phone
      };

      const formIndex = parseInt(form.dataset.index);
      if (!isNaN(formIndex)) {
        currentUser.addresses[formIndex] = addressData;
        bildirimGoster('Adres güncellendi!');
      } else {
        currentUser.addresses.push(addressData);
        bildirimGoster('Adres eklendi!');
      }

      users[userIndex] = { ...currentUser };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      const addressModalInstance = bootstrap.Modal.getInstance(document.getElementById('addressModal'));
      if (addressModalInstance) addressModalInstance.hide();
      form.reset();
      displayAddresses();
    }

    function deleteAddress(index) {
      if (!confirm('Bu adresi silmek istediğinize emin misiniz?')) return;

      let currentUser = safeParseJSON('currentUser');
      let users = safeParseJSON('users', []);
      const userIndex = users.findIndex(u => u.email === currentUser.email);

      if (userIndex === -1) {
        bildirimGoster('Kullanıcı bulunamadı!', 'danger');
        return;
      }

      currentUser.addresses.splice(index, 1);
      users[userIndex] = { ...currentUser };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      bildirimGoster('Adres silindi!');
      displayAddresses();
    }

    function loadSavedAddresses() {
      const savedAddresses = document.getElementById('savedAddresses');
      if (!savedAddresses) return;

      const currentUser = safeParseJSON('currentUser');
      const addresses = currentUser.addresses || [];

      savedAddresses.innerHTML = '';
      if (addresses.length === 0) {
        savedAddresses.innerHTML = '<p class="text-muted small">Kayıtlı adres yok.</p>';
        return;
      }

      savedAddresses.innerHTML = '<h6>Kayıtlı Adresler</h6>';
      addresses.forEach((address, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary btn-sm mb-2 me-2';
        button.textContent = `${escapeHTML(address.fullName)} - ${escapeHTML(address.address)}`;
        button.setAttribute('data-index', index);
        button.addEventListener('click', () => {
          const form = document.querySelector('#addressForm');
          if (form) {
            form.querySelector('#fullName').value = address.fullName || '';
            form.querySelector('#address').value = address.address || '';
            form.querySelector('#phone').value = address.phoneNumber || '';
          }
        });
        savedAddresses.appendChild(button);
      });
    }

    // --- Sayfa Yüklendiğinde ---
    document.addEventListener('DOMContentLoaded', function() {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const navbarButtons = document.getElementById('navbarButtons');
      const currentLoggedInUser = safeParseJSON('currentUser');
      let cartBadgeAdded = false;

      if (navbarButtons) {
        if (isLoggedIn === 'true') {
          navbarButtons.innerHTML = `
            <button class="btn btn-light btn-sm btn-icon-only" data-bs-toggle="modal" data-bs-target="#profileModal" title="Profil">
          <i class="bi bi-person"></i>
         </button> 
    ${currentLoggedInUser.role === 'admin' ? '<a href="urun-ekle-sil.html" class="btn btn-light btn-sm btn-icon-only" title="Admin Paneli"><i class="fas fa-user-shield"></i></a>' : ''}
            </button>
            
            <button class="btn btn-light btn-sm btn-icon-only" onclick="logout()" title="Çıkış Yap">
              <i class="bi bi-box-arrow-right"></i>
            </button>
            <button class="btn btn-light position-relative btn-sm btn-icon-only" onclick="window.location.href='cart.html';" title="Sepet">
              <i class="bi bi-cart3"></i>
              <span id="cartBadge" class="cart-badge badge bg-danger rounded-pill">0</span>
            </button>
            <button class="btn btn-custom-kategori btn-icon-only" type="button" data-bs-toggle="offcanvas" data-bs-target="#kategoriOffcanvas" aria-controls="kategoriOffcanvas" title="Kategoriler">
  <i class="fas fa-bars"></i>
</button>
          `;
        } else {
          navbarButtons.innerHTML = `
            <a href="kayit.html" class="btn btn-outline-light btn-sm btn-icon-only" title="Kayıt Ol"><i class="bi bi-person-plus"></i></a>
            <a href="login.html" class="btn btn-outline-light btn-sm btn-icon-only" title="Giriş Yap"><i class="bi bi-box-arrow-in-right"></i></a>
            <button class="btn btn-light position-relative btn-sm btn-icon-only" onclick="window.location.href='cart.html';" title="Sepet">
              <i class="bi bi-cart3"></i>
              <span id="cartBadge" class="cart-badge badge bg-danger rounded-pill">0</span>
            </button>
            <button class="btn btn-light btn-sm btn-icon-only" type="button" data-bs-toggle="offcanvas" data-bs-target="#kategoriOffcanvas" aria-controls="kategoriOffcanvas" title="Kategoriler">
              <i class="bi bi-list"></i>
            </button>
          `;
        }
        cartBadgeAdded = true;
      } else {
        console.warn('navbarButtons elementi bulunamadı!');
      }

      if (cartBadgeAdded) {
        window.sepet = new Sepet();
        window.sepet.guncelle();
      }

      const profileUsername = document.getElementById('profileUsername');
      const profileEmail = document.getElementById('profileEmail');
      if (profileUsername && profileEmail) {
        profileUsername.value = escapeHTML(currentLoggedInUser.username || currentLoggedInUser.email || '');
        profileEmail.value = escapeHTML(currentLoggedInUser.email || '');
      }

      urunleriGoster();
      kategoriMenusuGuncelle();
      markalariGoster();
      loadVitrins();

      const changePasswordForm = document.getElementById('changePasswordForm');
      if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const currentPassword = document.getElementById('currentPassword');
          const newPassword = document.getElementById('newPassword');
          const confirmNewPassword = document.getElementById('confirmNewPassword');

          if (!currentPassword || !newPassword || !confirmNewPassword) {
            console.error("Şifre değiştirme formunda eksik input alanları!");
            return;
          }

          [currentPassword, newPassword, confirmNewPassword].forEach(field => {
            field.classList.remove('is-invalid');
          });

          let isValid = true;
          const updatedCurrentUser = safeParseJSON('currentUser');

          if (currentPassword.value !== updatedCurrentUser.password) {
            currentPassword.classList.add('is-invalid');
            isValid = false;
            bildirimGoster('Mevcut şifreniz yanlış!', 'danger');
          }

          if (newPassword.value.length < 6) {
            newPassword.classList.add('is-invalid');
            isValid = false;
            bildirimGoster('Yeni şifre en az 6 karakter olmalıdır!', 'danger');
          }

          if (newPassword.value !== confirmNewPassword.value) {
            confirmNewPassword.classList.add('is-invalid');
            isValid = false;
            bildirimGoster('Yeni şifreler eşleşmiyor!', 'danger');
          }

          if (!isValid) return;

          let users = safeParseJSON('users', []);
          const userIndex = users.findIndex(u => u.email === updatedCurrentUser.email);
          if (userIndex !== -1) {
            users[userIndex].password = newPassword.value;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
            bildirimGoster('Şifre başarıyla değiştirildi!');
            const profileModalInstance = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
            if (profileModalInstance) profileModalInstance.hide();
            currentPassword.value = '';
            newPassword.value = '';
            confirmNewPassword.value = '';
          }
        });
      }

      const addressForm = document.getElementById('addressForm');
      if (addressForm) {
        addressForm.addEventListener('submit', saveAddress);
      }

      const addAddressBtn = document.getElementById('addAddressBtn');
      if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => openAddressModal());
      }

      const profileModal = document.getElementById('profileModal');
      if (profileModal) {
        profileModal.addEventListener('show.bs.modal', () => {
          displayOrders();
          displayAddresses();
        });
      }

      const addressModal = document.getElementById('addressModal');
      if (addressModal) {
        addressModal.addEventListener('show.bs.modal', loadSavedAddresses);
      }

      const newsletterForm = document.querySelector('.newsletter-form');
      if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const emailInput = newsletterForm.querySelector('input[type="email"]');
          if (!emailInput) {
            console.error("E-posta bülteni formunda e-posta alanı bulunamadı!");
            return;
          }
          const email = emailInput.value.trim();
          if (email) {
            let subscribers = safeParseJSON('subscribers', []);
            if (!subscribers.includes(email)) {
              subscribers.push(email);
              localStorage.setItem('subscribers', JSON.stringify(subscribers));
              bildirimGoster('Bültene başarıyla abone oldunuz!');
              newsletterForm.reset();
            } else {
              bildirimGoster('Bu e-posta zaten abone!', 'warning');
            }
          } else {
            bildirimGoster('Lütfen geçerli bir e-posta adresi girin.', 'danger');
          }
        });
      }

      const searchBtn = document.getElementById('searchBtn');
      const productSearch = document.getElementById('productSearch');

      if (searchBtn) {
        searchBtn.addEventListener('click', urunleriAra);
      }

      if (productSearch) {
        productSearch.addEventListener('keyup', function(e) {
          if (e.key === 'Enter') {
            urunleriAra();
          }
        });
      }

      function urunleriAra() {
        const productSearch = document.getElementById('productSearch');
        const searchValue = productSearch ? productSearch.value.trim() : '';
        urunleriGoster(null, searchValue);
        if (productSearch) {
          productSearch.value = '';
        }
      }

      let lastScrollY = 0;
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        window.addEventListener('scroll', () => {
          if (window.innerWidth <= 768) {
            if (window.scrollY > lastScrollY && window.scrollY > navbar.offsetHeight) {
              navbar.style.transform = 'translateY(-100%)';
              navbar.style.transition = 'transform 0.3s ease-out';
            } else {
              navbar.style.transform = 'translateY(0)';
              navbar.style.transition = 'transform 0.3s ease-in';
            }
          } else {
            navbar.style.transform = 'translateY(0)';
          }
          lastScrollY = window.scrollY;
        });
      }
    });
  </script>
  <script>
        // Geri sayım için hedef tarih (örneğin 2 gün sonrası)
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

        // Her saniye güncelle
        setInterval(updateCountdown, 1000);
        updateCountdown(); // İlk çalıştırma
    </script>
</body>
</html>
