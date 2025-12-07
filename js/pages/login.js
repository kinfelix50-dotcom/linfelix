import { auth } from '../auth.js';
import { router } from '../router.js';

export function renderLoginPage() {
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <div class="card auth-card">
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Giriş Yap</button>
                <button class="auth-tab" data-tab="register">Kayıt Ol</button>
            </div>
            
            <div class="auth-content">
                <!-- Giriş Formu -->
                <form id="loginForm" class="auth-form active">
                    <div class="form-group">
                        <label class="form-label" for="login-email">E-posta</label>
                        <input type="email" id="login-email" class="form-control" placeholder="ornek@email.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="login-password">Şifre</label>
                        <input type="password" id="login-password" class="form-control" placeholder="Şifreniz" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        <i class="fas fa-sign-in-alt"></i>
                        Giriş Yap
                    </button>
                </form>
                
                <!-- Kayıt Formu -->
                <form id="registerForm" class="auth-form">
                    <div class="form-group">
                        <label class="form-label" for="register-name">Ad Soyad</label>
                        <input type="text" id="register-name" class="form-control" placeholder="Adınız Soyadınız" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="register-email">E-posta</label>
                        <input type="email" id="register-email" class="form-control" placeholder="ornek@email.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="register-password">Şifre</label>
                        <input type="password" id="register-password" class="form-control" placeholder="Şifreniz (en az 6 karakter)" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="register-password-confirm">Şifre Tekrar</label>
                        <input type="password" id="register-password-confirm" class="form-control" placeholder="Şifrenizi tekrar girin" required>
                    </div>
                    
                    <button type="submit" class="btn btn-success btn-block">
                        <i class="fas fa-user-plus"></i>
                        Kayıt Ol
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Tab geçişlerini ayarla
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchAuthTab(tabName);
        });
    });
    
    // Giriş formu submit
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleLogin();
    });
    
    // Kayıt formu submit
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleRegister();
    });
}

function switchAuthTab(tabName) {
    // Tab butonlarını güncelle
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    
    // Formları güncelle
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.toggle('active', form.id === `${tabName}Form`);
    });
}

async function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Lütfen tüm alanları doldurun');
        return;
    }
    
    const success = await auth.login(email, password);
    if (success) {
        router.navigate('home');
    }
}

async function handleRegister() {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    
    if (!name || !email || !password || !passwordConfirm) {
        alert('Lütfen tüm alanları doldurun');
        return;
    }
    
    if (password.length < 6) {
        alert('Şifre en az 6 karakter olmalıdır');
        return;
    }
    
    if (password !== passwordConfirm) {
        alert('Şifreler eşleşmiyor');
        return;
    }
    
    const success = await auth.register(name, email, password);
    if (success) {
        router.navigate('home');
    }
}