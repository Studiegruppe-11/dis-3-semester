// root/client/scripts/login.js

document.getElementById("login").addEventListener("click", async function () {
    // henter username og password fra input felterne og gemmer dem i variablerne username og password.
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // sender username og password til at kunne bruges i controller. 
    const response = await fetch('/users/login', {
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
        window.location.href = "../home";
    } else {
        // hvis brugeren ikke har skrevet rigtigt, så sendes en fejlbesked.
        const errorMessage = result.error || "Forkert brugernavn eller adgangskode";
        alert(errorMessage);
    }
});

// Login med "enter" knappen
document.getElementById("password").addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("login").click();
    }
});


