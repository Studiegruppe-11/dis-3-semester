
// Funktion til at vise de tilføjede varer på checkout-siden
function displayItemsInBag() {
    const bag = document.getElementById("bag");
    const bagItems = getCookie("bagItems");
  
    if (bagItems) {
      const items = bagItems.split(",");
      items.forEach((itemName) => {
        const item = document.createElement("li");
        item.textContent = itemName;
        bag.appendChild(item);
      });
    }
  }
  

    // Kald funktionen for at vise varer i indkøbskurven, når siden indlæses
    displayItemsInBag();
  
    // Funktion til at hente cookies
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
  

