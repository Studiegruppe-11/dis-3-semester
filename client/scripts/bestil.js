document.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch("/orders/sandwich");
        const sandwich = await response.json();
        const response2 = await fetch("/orders/juice");
        const juice = await response2.json();

        let sandwichList = document.getElementById("sandwichList");
        let juiceList = document.getElementById("juiceList");


          // Funktion til at håndtere klik på knappen
    async function handleButtonClick(product) {
      try {
        // send produktets id til serveren, som derefter gemmer i express session.
        await fetch("/bestil/kurv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product.product_id,
          }),
        });

        // se i console at det er det rigtige produkt der logges.
        console.log(`Button clicked for Product ID: ${product.product_id}, Name: ${product.name}`);
      } catch (error) {
        console.error('Error handling button click:', error);
      }
    }



       // Opret separate kasser for hver sandwich
        sandwich.forEach((sandwich) => {
            let menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");

            let img = document.createElement("img");
            img.src = sandwich.imageUrl;
            menuItem.appendChild(img);

            let name = document.createElement("h3");
            name.innerHTML = `${sandwich.name}`;
            menuItem.appendChild(name);

            let description = document.createElement("p");
            description.innerHTML = `${sandwich.description}`;
            menuItem.appendChild(description);

            let price = document.createElement("p");
            price.innerHTML = `${sandwich.price} kr`;
            menuItem.appendChild(price);

            // Opret knap
            let button = document.createElement("button");
            button.innerHTML = "Tilføj til kurv";
            button.addEventListener("click", () => handleButtonClick(sandwich));
            button.classList.add("kurvknap");
            menuItem.appendChild(button);


            sandwichList.appendChild(menuItem);
        });

        // Opret separate kasser for hver juice
        juice.forEach((juice) => {
            let menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");

            let img = document.createElement("img");
            img.src = juice.imageUrl;
            menuItem.appendChild(img);

            let name = document.createElement("H3");
            name.innerHTML = `${juice.name}`;
            menuItem.appendChild(name);

            let description = document.createElement("p");
            description.innerHTML = `${juice.description}`;
            menuItem.appendChild(description);

            let price = document.createElement("p");
            price.innerHTML = `${juice.price} kr`;
            menuItem.appendChild(price);

            // Opret knap
            let button = document.createElement("button");
            button.innerHTML = "Tilføj til kurv";
            button.addEventListener("click", () => handleButtonClick(juice));
            button.classList.add("kurvknap");
            menuItem.appendChild(button);

            juiceList.appendChild(menuItem);
        });

    } catch (error) {

        console.log(error);

    }
});




console.log("Bestil.js loaded");



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



