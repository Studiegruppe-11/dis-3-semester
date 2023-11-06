// document.addEventListener('DOMContentLoaded', async () => {

//     try {
//         const response = await fetch("/orders/sandwich");
//         const sandwich = await response.json();
//         const response2 = await fetch("/orders/juice");
//         const juice = await response2.json();

//         let sandwichList = document.getElementById("sandwichList");
//         let juiceList = document.getElementById("juiceList");

//         // Opret separate kasser for hver sandwich
//         sandwich.forEach((sandwich) => {
//             let menuItem = document.createElement("div");
//             menuItem.classList.add("menu-item");

//             let img = document.createElement("img");
//             img.src = sandwich.imageURL;
//             menuItem.appendChild(img);

//             let name = document.createElement("p");
//             name.innerHTML = `Name: ${sandwich.name}`;
//             menuItem.appendChild(name);

//             let description = document.createElement("p");
//             description.innerHTML = `Description: ${sandwich.description}`;
//             menuItem.appendChild(description);

//             let price = document.createElement("p");
//             price.innerHTML = `Price: ${sandwich.price} kr`;
//             menuItem.appendChild(price);

//             sandwichList.appendChild(menuItem);
//         });

//         // Opret separate kasser for hver juice
//         juice.forEach((juice) => {
//             let menuItem = document.createElement("div");
//             menuItem.classList.add("menu-item");

//             let img = document.createElement("img");
//             img.src = juice.imageURL;
//             menuItem.appendChild(img);

//             let name = document.createElement("p");
//             name.innerHTML = `Name: ${juice.name}`;
//             menuItem.appendChild(name);

//             let description = document.createElement("p");
//             description.innerHTML = `Description: ${juice.description}`;
//             menuItem.appendChild(description);

//             let price = document.createElement("p");
//             price.innerHTML = `Price: ${juice.price} kr`;
//             menuItem.appendChild(price);

//             juiceList.appendChild(menuItem);
//         });

//     } catch (error) {

//         console.log(error);

//     }
// });



document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response1 = await fetch("/orders/sandwich");
        const response2 = await fetch("/orders/juice");
        const [sandwichData, juiceData] = await Promise.all([response1.json(), response2.json()]);

        const sandwichList = document.getElementById("sandwichList");
        const juiceList = document.getElementById("juiceList");

        const createMenuItem = (item) => {
            const menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");

            const img = document.createElement("img");
            img.src = item.imageURL;
            menuItem.appendChild(img);

            const name = document.createElement("p");
            name.innerHTML = `Name: ${item.name}`;
            menuItem.appendChild(name);

            const description = document.createElement("p");
            description.innerHTML = `Description: ${item.description}`;
            menuItem.appendChild(description);

            const price = document.createElement("p");
            price.innerHTML = `Price: ${item.price} kr`;
            menuItem.appendChild(price);

            return menuItem;
        };

        // Opret separate kasser for hver sandwich
        sandwichData.forEach((sandwich) => {
            sandwichList.appendChild(createMenuItem(sandwich));
        });

        // Opret separate kasser for hver juice
        juiceData.forEach((juice) => {
            juiceList.appendChild(createMenuItem(juice));
        });

    } catch (error) {
        console.log(error);
    }
});
