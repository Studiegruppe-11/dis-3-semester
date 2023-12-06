// root/client/scripts/kurv.js
window.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("/users/show");
      const result = await response.json();
  
      if (result.userId && result.name) {
        // Viser navn hvis man er logget ind
        document.getElementById("user").innerHTML = result.name;
        // Skal ikke vise "opret bruger" hvis man er logget ind.
      }
      else{
        window.location.href = "/users/login";
      }
    } catch (error) {
        console.log(error);
        // Håndter fejlhåndtering her
      }
    });

 
 

// Hvis der klikkes på fjern fra kurv så udføres denne funktion der sender anmodning til endpoint der sletter fra express-session. 
async function fjernFraKurv(productId) {
    try {
      // Send en anmodning til serveren for at fjerne produktet fra kurven
      await fetch("/bestil/fjernfraKurv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });
  
      // Genindlæs siden for at opdatere kurven
      window.location.reload();
    } catch (error) {
      console.error('Fejl under fjernFraKurv:', error);
    }
  }

// vis kurv (lige nu kun id) og knap til at gennemføre bestilling. bestilling bliver nu gemt i db
window.addEventListener("DOMContentLoaded", async () => {
    try {
        // // Hent data fra serveren
        // const response = await fetch("/bestil/kurv");
        // const result = await response.json();

        // // Find det element, hvor du vil vise produkt-id'erne og knapperne
        // const kurvElement = document.getElementById("kurv");

        // // Tjek om der er produkt-id'er i svaret
        // if (result.productIds && result.productIds.length > 0) {
        //     // Opret en liste og tilføj hvert produkt-id som et listeelement med en knap
        //     const productList = document.createElement("ul");
        //     result.productIds.forEach((productId) => {
        //         const listItem = document.createElement("li");
        //         listItem.textContent = `Product ID: ${productId}`;

        //         // Opret en knap for hvert produkt-id
        //         const gennemforBestillingButton = document.createElement("button");
        //         gennemforBestillingButton.textContent = "Fjern fra kurv";
        //         gennemforBestillingButton.addEventListener("click", () => fjernFraKurv(productId));

        //         // Tilføj knappen til listeelementet
        //         listItem.appendChild(gennemforBestillingButton);

        //         // Tilføj listeelementet til listen
        //         productList.appendChild(listItem);
        //     });

        //     // Tilføj listen til DOM'en
        //     kurvElement.appendChild(productList);
        // } else {
        //     // Hvis der ikke er nogen produkt-id'er, vis en besked
        //     kurvElement.textContent = "Ingen produkter i kurven";
        // }






// Hent data fra serveren
const response = await fetch("/bestil/kurvtest");
const result = await response.json();

// Find det element, hvor du vil vise produkterne og knapperne
const kurvElement = document.getElementById("kurv");

// Tjek om der er produkter i svaret
if (result && result.length > 0) {
    // Opret en liste og tilføj hvert produkt som et listeelement med en knap
    const productList = document.createElement("ul");
    result.forEach((product) => { 
        const listItem = document.createElement("li");
        
        // Opdater teksten for at inkludere navn, pris og billede
              listItem.innerHTML = `<div class="basket">
              <img class="productPicture" src="${product.imageUrl}" alt="${product.name}">
              <span class="productName">${product.name}</span>
              <br>
              <span class="productPrice">${product.price} kr.</span>
              </div>`;

        // Opret en knap for hvert produkt
        const gennemforBestillingButton = document.createElement("button");
        gennemforBestillingButton.textContent = "Fjern fra kurv";
        gennemforBestillingButton.addEventListener("click", () => fjernFraKurv(product.product_id));

        // Tilføj knappen til listeelementet
        listItem.appendChild(gennemforBestillingButton);

        // Tilføj listeelementet til listen
        productList.appendChild(listItem);
    });

    // Tilføj listen til DOM'en
    kurvElement.appendChild(productList);
} else {
    // Hvis der ikke er nogen produkter, vis en besked
    kurvElement.textContent = "Ingen produkter i kurven";
}





        
    } catch (error) {
        console.error("Fejl under indlæsning af kurvdata:", error);
    }
});




// Funktion til at håndtere klik
async function placedorder() {
  try {
      // Hent produkt-IDs fra Express-session
      const response = await fetch("/bestil/kurv");
      const result = await response.json();
      const productIds = result.productIds || [];

      // send en test-anmodning til serveren
      await fetch("/kurv/placerordrer", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              productIds: productIds,
              date: new Date().toISOString().split('T')[0], // Dagens dato uden tid
          }),
      });

      // Fjern produkt-ID'er fra Express-session
      await fetch("/bestil/fjernprodukter", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              productIds: productIds,
          }),
      });

      alert("Din order er placeret og sendt til køkkenet!");
      // Genindlæs siden
      window.location.reload(true);

      console.log("Ordrer placeret med succes!");
      // Implementer eventuel logik for at håndtere testen her
  } catch (error) {
      console.error('Fejl under håndtering af test:', error);
  }
}

// Tilføj eventlistener til test-knappen
const orderButton = document.getElementById("placeOrder");
orderButton.addEventListener("click", placedorder);

  