// root/client/scripts/admin.js
// Function to get a cookie by name
function getCookie(name) {
    const value = "; " + document.cookie;
    console.log('Cookie value:', value);  // Log the entire cookie string
    const parts = value.split("; " + name + "=");
    console.log('Split parts:', parts);  // Log the parts after splitting
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Function to display the username
function displayUsername() {
    const username = getCookie('username');
    console.log('Retrieved username:', username);  // Log the retrieved username
    if (username) {
        const usernameDisplay = document.getElementById('usernameDisplay');
        console.log('usernameDisplay element:', usernameDisplay);  // Log the usernameDisplay element
        if (usernameDisplay) {
            usernameDisplay.innerText = username;
            console.log('Username displayed');  // Log when username is displayed
        } else {
            console.log('usernameDisplay element not found');  // Log if usernameDisplay element is not found
        }
    } else {
        console.log('Username not found in cookies');  // Log if username is not found in cookies
    }
}

// Call displayUsername on page load
window.onload = () => {
    console.log('Page loaded');  // Log when page is loaded
    displayUsername();
};
