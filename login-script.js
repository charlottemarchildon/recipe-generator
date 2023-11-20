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
    const existingUser = localStorage.getItem('username');

    /*
    Log in will be successful and display a Success message if user has used the sign up function to create an account and the password matches. Else, login will fail and display a Failure message.
    If "Remember Me" is checked, the username will be saved in local storage.
    Message will be cleared after 1.5 seconds.
    */
    if (existingUser && username === existingUser) {
        const loginFooter = document.getElementById('login-footer');
        const loginSuccess = document.createElement('p');
        loginSuccess.textContent = 'Login successful!';
        loginFooter.appendChild(loginSuccess);

        if (rememberUser) {
            localStorage.setItem('username', username);
        }

        setTimeout(() => {
            loginFooter.innerHTML = '';
        }, 1500);
        
    } else {
        const loginFooter = document.getElementById('login-footer');
        const loginFailure = document.createElement('p');
        loginFailure.textContent = 'Login failed!';
        loginFooter.appendChild(loginFailure);

        setTimeout(() => {
            loginFooter.innerHTML = '';
        }, 1500);
    }
}

/*
Assign variables to the newUsername and newPassword fields.
Input for both fields is saved to local storage.
System will check if there is an existing username, if it is null, a Success message will appear. Else, a failure message will appear.
Message will be cleared after 1.5 seconds.
*/
function signup() {
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;

    localStorage.setItem('username', newUsername);
    localStorage.setItem('password', newPassword);

    var existingUsername = localStorage.getItem(username);
    if (existingUsername === null) {
        const signupFooter = document.getElementById('signup-footer');
        const signupSuccess = document.createElement('p');
        signupSuccess.textContent = 'Sign up successful!';
        signupFooter.appendChild(signupSuccess);

        setTimeout(() => {
            signupFooter.innerHTML = '';
        }, 1500);
    }

    else {
        const signupFooter = document.getElementById('signup-footer');
        const signupFailure = document.createElement('p');
        signupFailure.textContent = 'Sign up failed!';
        signupFooter.appendChild(signupFailure);

        setTimeout(() => {
            signupFooter.innerHTML = '';
        }, 1500);
    }
}