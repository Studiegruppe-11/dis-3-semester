// root/client/scripts/admin.js
console.log('admin.js loaded');
// Function to get a cookie by name
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Function to display the username
function displayUsername() {
    const username = getCookie('username');
    if (username) {
        const usernameDisplay = document.getElementById('usernameDisplay');
        if (usernameDisplay) {
            usernameDisplay.innerText = username;
        }
    }
}

// Call displayUsername on page load
window.onload = displayUsername;