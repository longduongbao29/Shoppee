function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        password: password
    };

    // Gửi yêu cầu đăng nhập bằng AJAX
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            // Kiểm tra kết quả đăng nhập từ server
            if (result.success) {
                // Nếu đăng nhập thành công, chuyển hướng đến trang chủ
                window.location.href = '/home';
            } else {
                // Nếu đăng nhập thất bại, hiển thị thông báo lỗi
                const messageDiv = document.getElementById('message');
                messageDiv.innerHTML = result.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function register() {
    const username = document.getElementById('r-username').value;
    const password = document.getElementById('r-password').value;

    const data = {
        username: username,
        password: password
    };
    console.log(data)
    // Gửi yêu cầu đăng ký bằng AJAX
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            // Kiểm tra kết quả đăng ký từ server
            if (result.success) {
                // Nếu đăng ký thành công, chuyển hướng đến trang đăng nhập
                window.location.href = '/login';
            } else {
                // Nếu đăng ký thất bại, hiển thị thông báo lỗi
                const messageDiv = document.getElementById('message');
                messageDiv.innerHTML = result.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('message').innerText = '';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('message').innerText = '';
}

console.log(isLoginForm);

if (isLoginForm) {
    showLoginForm();
}
else {
    showRegisterForm();
}

