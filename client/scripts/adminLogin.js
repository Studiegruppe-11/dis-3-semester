// root/client/scripts/adminLogin.js
// document.getElementById('login').addEventListener('click', async () => {
//     try {
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//         const response = await axios.post('/admin/login', { username, password });
//         if (response.data.error) {
//             document.getElementById('message').innerText = response.data.error;
//         } else {
//             // Update the DOM to display the username
//             const usernameDisplay = document.createElement('li');
//             usernameDisplay.innerText = response.data.username;
//             document.querySelector('ul').appendChild(usernameDisplay);
            
//             window.location.href = '/admin';  // Redirect to the admin page on successful login
//         }
//     } catch (error) {
//         console.error(error);
//     }
// });





document.getElementById("login").addEventListener("click", async function () {
    // henter username og password fra input felterne og gemmer dem i variablerne username og password.
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // sender username og password til at kunne bruges i controller. 
    const response = await fetch('/admin/login', {
        // metoden er post fordi vi sender data til serveren.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const result = await response.json();
    // hvis brugeren er logget ind, så sendes brugeren til index.html
    if (result.success) {
        window.location.href = "../admin";
    } else {
        // hvis brugeren ikke har skrevet rigtigt, så sendes en fejlbesked.
        const errorMessage = result.error || "Forkert brugernavn eller adgangskode";
        alert(errorMessage);
    }
});


