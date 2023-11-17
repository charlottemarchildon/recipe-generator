/*
Variables assigned to each modal's id.
*/
let loginWindow = new bootstrap.Modal(document.getElementById('login'));
let signupWindow = new bootstrap.Modal(document.getElementById('signup'));

/*
Login window will open.
Username field will check for a saved username from local storage. 
Username field will autofill with username if found.
*/
function loginBox() {
    loginWindow.show();

    const savedUser = localStorage.getItem('username');

    if (savedUser) {
        document.getElementById('username').value = savedUser;
    }
}

/*
Sign up window will show when button is triggered.
*/
function signupBox() {
    signupWindow.show();
}

/*
Username and password variables assigned to the 'username' and 'password' field ids.
rememberUser is assigned to the checkbox.
existingUser looks for a username in the local storage.
*/
function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    const rememberUser = document.getElementById('rememberUser').checked;
    const existingUser = localStorage.getItem(username);

    /*
    Log in will be successful if user has used the sign up function to create an account and the password matches. Else, login will fail.
    If "Remember Me" is checked, the username will be saved in local storage.
    */
    if (existingUser && password === existingUser) {
        alert('Login successful!');

        if (rememberUser) {
            localStorage.setItem('username', username);
        }

    } else {
        alert ('Login failed!');
    }
}

/*
Assign variables to the newUsername and newPassword fields.
Input for both fields is saved to local storage.
*/
function signup() {
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;

    localStorage.setItem(newUsername);
    localStorage.setItem(newPassword);

    alert(`Welcome, ${newUsername}!`);
}