document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordField = document.getElementById('password');
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.textContent = type === 'password' ? '🔓' : '🔒';
    });
});

document.getElementById('tenantForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const planValue = document.getElementById('plan').value;
    const formData = {
        status: "active",
        name: document.getElementById('name').value,
        maxUsers: planValue,
        maxConnections: planValue,
        acceptTerms: document.getElementById('acceptTerms').checked,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        userName: document.getElementById('userName').value,
        identity: document.getElementById('identity').value.replace(/\D/g, ''),
        profile: document.getElementById('profile').value,
        trial: document.getElementById('trial').value,
        trialPeriod: document.getElementById('trialPeriod').value
    };

    if (!validateCPF_CNPJ(formData.identity)) {
        alert('CPF ou CNPJ inválido!');
        return;
    }

    fetch('/create-tenant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_TOKEN_HERE'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Tenant criado com sucesso!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Erro ao criar tenant.');
    });
});

function validateCPF_CNPJ(value) {
    if (value.length === 11) {
        return validateCPF(value);
    } else if (value.length === 14) {
        return validateCNPJ(value);
    }
    return false;
}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '' || cpf.length !== 11 ||
        /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let sum = 0, remainder;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    return remainder === parseInt(cpf.substring(10, 11));
}

function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '' || cnpj.length !== 14) {
        return false;
    }
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0))) {
        return false;
    }
    length++;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    return result === parseInt(digits.charAt(1));
}
