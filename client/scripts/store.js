// Fil: client/scripts/store.js

const store = document.getElementById("store");
const bag = document.getElementById("bag");
const user = "hans";  // Dette er en placeholder. Du bør hente brugerens navn fra en autentificeret session eller lignende.

store.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    const item = e.target.parentElement;
    const itemName = item.textContent.trim();

    addToCart(itemName);

    e.target.remove(); 
    store.removeChild(item);
    bag.appendChild(item); 
  }
});

function addToCart(itemName) {
  axios.post("http://localhost:3000/cart/add", { username: user, itemName: itemName })
      .then(function (response) {
          console.log(response.data);
      })
      .catch(function (error) {
          console.error(error);
      });
}


function checkout() {
  axios.post("http://localhost:3000/store/checkout", { username: user })
    .then(function (response) {
      // Handle server response if needed
    })
    .catch(function (error) {
      // Handle errors if needed
    });
  window.location.href = "/store/checkout";
}
