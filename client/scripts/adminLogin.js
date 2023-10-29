// root/client/scripts/adminLogin.js
document.getElementById('login').addEventListener('click', async () => {
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const response = await axios.post('/admin/login', { username, password });
        if (response.data.error) {
            document.getElementById('message').innerText = response.data.error;
        } else {
            // Update the DOM to display the username
            const usernameDisplay = document.createElement('li');
            usernameDisplay.innerText = response.data.username;
            document.querySelector('ul').appendChild(usernameDisplay);
            
            window.location.href = '/admin';  // Redirect to the admin page on successful login
        }
    } catch (error) {
        console.error(error);
    }
});
