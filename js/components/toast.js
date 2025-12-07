let toastTimeout;

export function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = toast.querySelector('i');
    
    // Önceki timeout'u temizle
    clearTimeout(toastTimeout);
    
    // Mesajı ve ikonu güncelle
    toastMessage.textContent = message;
    
    if (isError) {
        toast.classList.add('error');
        toastIcon.className = 'fas fa-exclamation-circle';
    } else {
        toast.classList.remove('error');
        toastIcon.className = 'fas fa-check-circle';
    }
    
    // Toast'ı göster
    toast.classList.add('show');
    
    // 3 saniye sonra gizle
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

export function showSuccessToast(message) {
    showToast(message, false);
}

export function showErrorToast(message) {
    showToast(message, true);
}