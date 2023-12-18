// root/client/scripts/admin.js
const socket = io();

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
    else {
      window.location.href = "/admin/login";
    }
  } catch (error) {
      console.log(error);
    }
  // vis total omsætning i dag
  try {
    const response = await fetch("/totalRevenuetoday");
    const result = await response.json();
    if (result.total_price) {
      document.getElementById("totalRevenuetoday").innerHTML = result.total_price + " Kr.";
    }
    else {
      document.getElementById("totalRevenuetoday").innerHTML = "0 Kr.";
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
    else {
      document.getElementById("totalRevenue").innerHTML = "0 Kr.";
    }
  } catch (error) {
    console.log(error);
  }

// Henter og viser hvor mange ordrer der er færdiggjort i dag
try {
  const response = await fetch("/finishedorders");
  const result = await response.json();
  if (result.finished_orders) {
    document.getElementById("finishedOrders").innerHTML = result.finished_orders;
  } else {
    document.getElementById("finishedOrders").innerHTML = "Ingen færdige ordrer i dag";
  }
} catch (error) {
  console.log(error);
}

});

document.addEventListener('DOMContentLoaded', function () {
  const socket = io('/order');

  // Lyt efter opdateringer på afgivne ordrer
  socket.on('placedOrdersUpdate', function (placedOrders) {
    // Sortér placedOrders baseret på den laveste placeorders_id først
    placedOrders.sort((a, b) => a.placeorders_id - b.placeorders_id);

    // Opdater listen over afgivne ordrer i HTML
    updatePlacedOrdersList(placedOrders);
  });

  // Funktion til at opdatere listen over afgivne ordrer i HTML
  function updatePlacedOrdersList(placedOrders) {
    const placedOrdersList = document.getElementById('placedOrdersList');

    // Fjern eksisterende indhold
    placedOrdersList.innerHTML = '';

    // Tilføj nye ordrer til listen
    placedOrders.forEach((order, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. Produkt: ${order.name}  Kundens navn: ${order.first_name}`;
      
      // Tilføj en knap til at færdiggøre ordren
      const finishButton = document.createElement('button');
      finishButton.textContent = 'Færdig';
      finishButton.addEventListener('click', function () {
        // Send en POST-anmodning til '/finished' med placeorders_id
        finishOrder(order.placedorders_id); // Opdateret her
      });

      listItem.appendChild(finishButton);
      placedOrdersList.appendChild(listItem);
    });
  } 

  // Første anmodning om afgivne ordrer, når siden indlæses
  socket.emit('getPlacedOrders', function (placedOrders) {
    // Sortér placedOrders baseret på den laveste placeorders_id først
    placedOrders.sort((a, b) => a.placeorders_id - b.placeorders_id);

    // Opdater listen over afgivne ordrer i HTML
    updatePlacedOrdersList(placedOrders);
  });

  // Funktion til at sende en POST-anmodning til '/finished' med placeorders_id ved hjælp af fetch
  function finishOrder(placeorders_id) {
    console.log('Afslutter ordre med placeorders_id:', placeorders_id);
  
    fetch('/updatestatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ placeorders_id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Ordre afsluttet:', data);
  
        // Genindlæs siden. Hvis alt bliver lavet til socket, så skal den ikke genindlæse siden, da dette vil ske automatisk.
        window.location.reload();
      })
      .catch(error => {
        console.error('Fejl ved afslutning af ordre:', error);
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
});

// SOCKET PING START
// Socket til at vise RTT og ping i realtid på admin-siden.
// Opret en WebSocket-forbindelse til serveren

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
  
  if
(data.ping < 500) {
      document.getElementById('pingInfo').style.color = 'green';
  } else if (data.ping > 500) {
      document.getElementById('pingInfo').style.color = 'orange';
  }
  
  });