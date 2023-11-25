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


 

// Funktion til at håndtere "Gennemfør bestilling"-klik
async function handleGennemforBestilling(productId) {
    try {
        // send produktets id til serveren, som derefter gemmer i express session.
        await fetch("/kurv/placedorders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                placedorder: productId,
            }),
        });

        console.log(`Gennemfør bestilling for Product ID: ${productId}`);
        // Implementer logik for at gennemføre bestillingen her
    } catch (error) {
        console.error('Fejl under håndtering af gennemfør bestilling:', error);
    }
}

// vis kurv (lige nu kun id) og knap til at gennemføre bestilling. bestilling bliver nu gemt i db
window.addEventListener("DOMContentLoaded", async () => {
    try {
        // Hent data fra serveren
        const response = await fetch("/bestil/kurv");
        const result = await response.json();

        // Find det element, hvor du vil vise produkt-id'erne og knapperne
        const kurvElement = document.getElementById("kurv");

        // Tjek om der er produkt-id'er i svaret
        if (result.productIds && result.productIds.length > 0) {
            // Opret en liste og tilføj hvert produkt-id som et listeelement med en knap
            const productList = document.createElement("ul");
            result.productIds.forEach((productId) => {
                const listItem = document.createElement("li");
                listItem.textContent = `Product ID: ${productId}`;

                // Opret en knap for hvert produkt-id
                const gennemforBestillingButton = document.createElement("button");
                gennemforBestillingButton.textContent = "Gennemfør bestilling";
                gennemforBestillingButton.addEventListener("click", () => handleGennemforBestilling(productId));

                // Tilføj knappen til listeelementet
                listItem.appendChild(gennemforBestillingButton);

                // Tilføj listeelementet til listen
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
    
   







// TEST
// Funktion til at håndtere klik på test-knappen
async function handleTest() {
    try {
      // Hent produkt-IDs fra Express-session
      const response = await fetch("/bestil/kurv");
      const result = await response.json();
      const productIds = result.productIds || [];
  
      // send en test-anmodning til serveren
      await fetch("/kurv/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productIds: productIds,
          date: new Date().toISOString().split('T')[0], // Dagens dato uden tid
        }),
      });
  
      console.log("Test udført med succes!");
      // Implementer eventuel logik for at håndtere testen her
    } catch (error) {
      console.error('Fejl under håndtering af test:', error);
    }
  }
  
  // Tilføj eventlistener til test-knappen
  const testButton = document.getElementById("testButton"); // Brug det faktiske id, du har
  testButton.addEventListener("click", handleTest);
  