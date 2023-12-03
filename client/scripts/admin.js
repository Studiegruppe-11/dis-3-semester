// root/client/scripts/admin.js

document.addEventListener('DOMContentLoaded', function () {
  const socket = io('/order'); // Connect to the '/order' namespace

  // Listen for updates on placed orders
  socket.on('placedOrdersUpdate', function (placedOrders) {
    // Sort placedOrders based on the lowest placeorders_id first
    placedOrders.sort((a, b) => a.placeorders_id - b.placeorders_id);

    // Update the placed orders list in the HTML
    updatePlacedOrdersList(placedOrders);
  });

  // Function to update the placed orders list in the HTML
  function updatePlacedOrdersList(placedOrders) {
    const placedOrdersList = document.getElementById('placedOrdersList');

    // Clear existing content
    placedOrdersList.innerHTML = '';

    // Add new orders to the list
    placedOrders.forEach((order, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. Produkt: ${order.name}  Kundens navn: ${order.first_name}`;
      
      // Add a button for finishing the order
      const finishButton = document.createElement('button');
      finishButton.textContent = 'Færdig';
      finishButton.addEventListener('click', function () {
        // Send a POST request to '/finished' with the placeorders_id
        finishOrder(order.placedorders_id); // Opdateret her
      });

      listItem.appendChild(finishButton);
      placedOrdersList.appendChild(listItem);
    });
  } 

  // Initial request for placed orders when the page loads
  socket.emit('getPlacedOrders', function (placedOrders) {
    // Sort placedOrders based on the lowest placeorders_id first
    placedOrders.sort((a, b) => a.placeorders_id - b.placeorders_id);

    // Update the placed orders list in the HTML
    updatePlacedOrdersList(placedOrders);
  });

  // Function to send a POST request to '/finished' with placeorders_id using fetch
  function finishOrder(placeorders_id) {
    console.log('Finishing order with placeorders_id:', placeorders_id);
  
    fetch('/updatestatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ placeorders_id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Order finished:', data);
  
        // Genindlæs siden. Hvis alt bliver lavet til socket så skal den ikke genindlæse siden, da dette vil ske automatisk.
        window.location.reload();
      })
      .catch(error => {
        console.error('Error finishing order:', error);
      });
  }
});






  document.getElementById("logout").addEventListener("click", async () => {

    try {
        const response = await fetch("/admin/logout");
        const result = await response.json();
        console.log(result);
        if (result.loggedOut) {
            window.location.href = "/admin/login";
        }
    } catch (error) {
        console.log(error);
    } 
}

);





// SOCKET PING START
// socket til at vise rtt og ping i real time på admin siden.
// Opret en WebSocket-forbindelse til serveren
const socket = io();

// Lyt efter opdateringer fra serveren

socket.on('rttUpdate', (data) => {
    // Opdater HTML-elementet med RTT-oplysninger
    document.getElementById('rttInfo').textContent = `RTT: ${data.rtt} ms`;

if (data.rtt > 1000) {
  document.getElementById('rttInfo').style.color = 'red';

} else {
  // Hvis RTT er under grænsen, sæt farven til grøn eller orange som tidligere
  if (data.rtt < 1000) {
    document.getElementById('rttInfo').style.color = 'green';
} 
}
  });
  socket.on('pingUpdate', (data) => {
    // Opdater HTML-elementet med ping-oplysninger
    document.getElementById('pingInfo').textContent = `Ping: ${data.ping} ms`;
  
  if(data.ping < 500) {
      document.getElementById('pingInfo').style.color = 'green';
  } else if (data.ping > 500) {
      document.getElementById('pingInfo').style.color = 'orange';
  }
  
  });

// SOCKET PING SLUT 
 