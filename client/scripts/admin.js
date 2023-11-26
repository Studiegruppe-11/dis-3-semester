// root/client/scripts/admin.js


window.addEventListener("DOMContentLoaded", async () => {

  //  vis navn på admin logget ind
  try {
    const response = await fetch("/admins/show");
    const result = await response.json();

    if (result.adminUserId && result.adminName) {
      // Viser navn hvis man er logget ind
      document.getElementById("usernameDisplay").innerHTML = result.adminName;
      // Skal ikke vise "opret bruger" hvis man er logget ind.
    }
  } catch (error) {
      console.log(error);
      // Håndter fejlhåndtering her
    }


    // test på at vise total omsætning i dag og i alt. skal laves til socket i stedet. 
  
  // vis total omsætning i dag
  try {
    const response = await fetch("/totalRevenuetoday");
    const result = await response.json();
    if (result.total_price) {
      document.getElementById("totalRevenuetoday").innerHTML = result.total_price + " Kr.";
    }
  } catch (error) {
    console.log(error);
  }

  // vis total omsætning
  try {
    const response = await fetch("/totalRevenue");
    const result = await response.json();
    if (result.total_price) {
      document.getElementById("totalRevenue").innerHTML = result.total_price + " Kr.";
    }
  } catch (error) {
    console.log(error);
  }

// vis alle færdige ordrer på admin siden
  try {
    const response = await fetch("/finishedOrders");
    const result = await response.json();
    if (result.finishedOrders) {
      document.getElementById("finishedOrders").innerHTML = result.finishedOrders;
    }
  } catch (error) {
    console.log(error);
  }





});

 

    // SOCKET TIL AT VISE ALLE VENTENDE ORDRER I REAL TIME PÅ ADMIN SIDEN

//     const socket1 = io('/order');
//     socket1.on('placedOrdersUpdate', (data) => {
//       updatePlacedOrders(data);
//       console.log('Placed orders updated:', data);
//     });


// function updatePlacedOrders(placedOrders) {
//   const placedOrdersElement = document.getElementById('placedOrders');
//   placedOrdersElement.innerHTML = '';

//   placedOrders.forEach((order) => {
//     const orderItem = document.createElement('div');
//     orderItem.textContent = `Kundens navn: ${order.first_name}, Produkt: ${order.name}`;
//     placedOrdersElement.appendChild(orderItem);
//   });
// }


document.addEventListener('DOMContentLoaded', function () {
  const socket = io('/order'); // Connect to the '/order' namespace

  // Listen for updates on placed orders
  socket.on('placedOrdersUpdate', function (placedOrders) {
    updatePlacedOrdersList(placedOrders);
  });

  // Function to update the placed orders list in the HTML
  function updatePlacedOrdersList(placedOrders) {
    const placedOrdersList = document.getElementById('placedOrdersList');

    // Clear existing content
    placedOrdersList.innerHTML = '';

    // Add new orders to the list
    placedOrders.forEach(order => {
      const listItem = document.createElement('li');
      listItem.textContent = `${order.first_name} har bestilt ${order.name}`;
      placedOrdersList.appendChild(listItem);
    });
  }

  // Initial request for placed orders when the page loads
  socket.emit('getPlacedOrders', function (placedOrders) {
    updatePlacedOrdersList(placedOrders);
  });
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
 