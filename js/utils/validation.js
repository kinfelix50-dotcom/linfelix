export class ValidationHelper {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    static validatePassword(password) {
        // En az 6 karakter
        return password.length >= 6;
    }
    
    static validatePhone(phone) {
        const re = /^(\+90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2})$/;
        return re.test(phone);
    }
    
    static validateNotEmpty(value) {
        return value.trim().length > 0;
    }
    
    static validateNumber(value, min = null, max = null) {
        const num = parseFloat(value);
        if (isNaN(num)) return false;
        
        if (min !== null && num < min) return false;
        if (max !== null && num > max) return false;
        
        return true;
    }
    
    static validateForm(formData, rules) {
        const errors = {};
        
        Object.keys(rules).forEach(field => {
            const value = formData[field];
            const fieldRules = rules[field];
            
            if (fieldRules.required && !this.validateNotEmpty(value)) {
                errors[field] = fieldRules.requiredMessage || 'Bu alan zorunludur';
                return;
            }
            
            if (fieldRules.email && !this.validateEmail(value)) {
                errors[field] = fieldRules.emailMessage || 'Geçerli bir email adresi girin';
                return;
            }
            
            if (fieldRules.password && !this.validatePassword(value)) {
                errors[field] = fieldRules.passwordMessage || 'Şifre en az 6 karakter olmalıdır';
                return;
            }
            
            if (fieldRules.phone && !this.validatePhone(value)) {
                errors[field] = fieldRules.phoneMessage || 'Geçerli bir telefon numarası girin';
                return;
            }
            
            if (fieldRules.minLength && value.length < fieldRules.minLength) {
                errors[field] = fieldRules.minLengthMessage || `En az ${fieldRules.minLength} karakter olmalıdır`;
                return;
            }
            
            if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
                errors[field] = fieldRules.maxLengthMessage || `En fazla ${fieldRules.maxLength} karakter olabilir`;
                return;
            }
            
            if (fieldRules.min && !this.validateNumber(value, fieldRules.min)) {
                errors[field] = fieldRules.minMessage || `En az ${fieldRules.min} olmalıdır`;
                return;
            }
            
            if (fieldRules.max && !this.validateNumber(value, null, fieldRules.max)) {
                errors[field] = fieldRules.maxMessage || `En fazla ${fieldRules.max} olabilir`;
                return;
            }
            
            if (fieldRules.match) {
                const matchField = fieldRules.match.field;
                if (value !== formData[matchField]) {
                    errors[field] = fieldRules.match.message || 'Değerler eşleşmiyor';
                }
            }
        });
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}