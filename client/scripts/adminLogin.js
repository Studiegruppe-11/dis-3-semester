// root/client/scripts/adminLogin.js

// Få username fra cookie
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Viser username i admin.html
function displayUsername() {
    const username = getCookie('username');
    if (username) {
        const usernameDisplay = document.getElementById('usernameDisplay');
        if (usernameDisplay) {
            usernameDisplay.innerText = username;
        }
    }
}

displayUsername();

document.getElementById('login').addEventListener('click', async () => {
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const response = await axios.post('/admin/login', { username, password });
        if (response.data.error) {
            document.getElementById('message').innerText = response.data.error;
        } else {
            document.cookie = `username=${response.data.username}`;  // Set the username cookie
            displayUsername();  // Update the DOM to display the username
            window.location.href = '/admin';  // Redirect to the admin page on successful login
        }
    } catch (error) {
        console.error(error);
    }
});
