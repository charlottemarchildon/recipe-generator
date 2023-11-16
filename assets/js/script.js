let loginWindow = new bootstrap.Modal(document.getElementById('login'));
let signupWindow = new bootstrap.Modal(document.getElementById('signup'));

function loginBox() {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
        document.getElementById('username').value = savedUser;
    }

    loginWindow.show();
}

function signupBox() {
    signupWindow.show();
}

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    const rememberUser = document.getElementById('rememberUser');
    const existingUser = localStorage.getItem(username);

    if (existingUser && password === existingUser) {
        alert('Login successful!');

        if (rememberUser) {
            localStorage.setItem('username', username);
        }
    }

    else {
        alert ('Login failed!');
    }
}

function signup() {
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;
}