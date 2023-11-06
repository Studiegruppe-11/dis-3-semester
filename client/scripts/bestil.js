document.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch("/orders/sandwich");
        const sandwich = await response.json();
        const response2 = await fetch("/orders/juice");
        const juice = await response2.json();

        console.log(sandwich, juice);

        let sandwichList = document.getElementById("sandwichList");
        let juiceList = document.getElementById("juiceList");

        sandwich.forEach((sandwich) => {
            let li = document.createElement("li");
            li.innerHTML = `${sandwich.name} ${sandwich.price} kr`;
            sandwichList.appendChild(li);
        }

        );

        juice.forEach((juice) => {
            let li = document.createElement("li");
            li.innerHTML = `${juice.name} ${juice.price} kr`;
            juiceList.appendChild(li);

        }

        );

    } catch (error) {

        console.log(error);

    }


      });


