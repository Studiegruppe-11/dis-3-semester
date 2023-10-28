window.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("/users/show");
      const result = await response.json();
  
      if (result.userId && result.username) {
        // Viser navn hvis man er logget ind
        document.getElementById("user").innerHTML = result.username;
        // Skal ikke vise "opret bruger" hvis man er logget ind.
      }
    } catch (error) {
        console.log(error);
        // Håndter fejlhåndtering her
      }
    });


    