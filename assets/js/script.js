let loginWindow = new bootstrap.Modal(document.getElementById('login'));

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    const rememberUser = document.getElementById('rememberUser');

    loginWindow.show();

    if (rememberUser) {
        localStorage.setItem('username', username);
    }
}