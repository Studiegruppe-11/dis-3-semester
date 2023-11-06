document.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch("/orders/sandwich");
        const sandwich = await response.json();
        const response2 = await fetch("/orders/juice");
        const juice = await response2.json();

        let sandwichList = document.getElementById("sandwichList");
        let juiceList = document.getElementById("juiceList");

        // Opret separate kasser for hver sandwich
        sandwich.forEach((sandwich) => {
            let menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");

            let img = document.createElement("img");
            img.src = sandwich.imageURL;
            menuItem.appendChild(img);

            let name = document.createElement("p");
            name.innerHTML = `Name: ${sandwich.name}`;
            menuItem.appendChild(name);

            let description = document.createElement("p");
            description.innerHTML = `Description: ${sandwich.description}`;
            menuItem.appendChild(description);

            // let price = document.createElement("p");
            // price.innerHTML = `Price: ${sandwich.price} kr`;
            // menuItem.appendChild(price);

            sandwichList.appendChild(menuItem);
        });

        // // Opret separate kasser for hver juice
        // juice.forEach((juice) => {
        //     let menuItem = document.createElement("div");
        //     menuItem.classList.add("menu-item");

        //     let img = document.createElement("img");
        //     img.src = juice.imageURL;
        //     menuItem.appendChild(img);

        //     let name = document.createElement("p");
        //     name.innerHTML = `Name: ${juice.name}`;
        //     menuItem.appendChild(name);

        //     let description = document.createElement("p");
        //     description.innerHTML = `Description: ${juice.description}`;
        //     menuItem.appendChild(description);

        //     let price = document.createElement("p");
        //     price.innerHTML = `Price: ${juice.price} kr`;
        //     menuItem.appendChild(price);

        //     juiceList.appendChild(menuItem);
        // });

    } catch (error) {

        console.log(error);

    }
});




console.log("Bestil.js loaded");


