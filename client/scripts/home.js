window.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("/users/show");
      const result = await response.json();
  
      if (result.userId && result.name) {
        // Viser navn hvis man er logget ind
        document.getElementById("user").innerHTML = result.name;
        // Skal ikke vise "opret bruger" hvis man er logget ind.
      }
    } catch (error) {
        console.log(error);
        // Håndter fejlhåndtering her
      }
    });


    
document.getElementById("logout").addEventListener("click", async () => {

    try {
        const response = await fetch("/users/logout");
        const result = await response.json();
        console.log(result);
        if (result.loggedOut) {
            window.location.href = "/users/login";
        }
    } catch (error) {
        console.log(error);
    }
}

);


