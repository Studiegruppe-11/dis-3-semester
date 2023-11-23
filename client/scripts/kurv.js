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



    window.addEventListener("DOMContentLoaded", async () => {
        try {
            // Hent data fra serveren
            const response = await fetch("/bestil/kurv");
            const result = await response.json();
            
            // Find det element, hvor du vil vise produkt-id'erne
            const kurvElement = document.getElementById("kurv");
    
            // Tjek om der er produkt-id'er i svaret
            if (result.productIds && result.productIds.length > 0) {
                // Opret en liste og tilføj hvert produkt-id som et listeelement
                const productList = document.createElement("ul");
                result.productIds.forEach((productId) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `Product ID: ${productId}`;
                    productList.appendChild(listItem);
                });
    
                // Tilføj listen til DOM'en
                kurvElement.appendChild(productList);
            } else {
                // Hvis der ikke er nogen produkt-id'er, vis en besked
                kurvElement.textContent = "Ingen produkter i kurven";
            }
        } catch (error) {
            console.error("Fejl under indlæsning af kurvdata:", error);
        }
    });
    