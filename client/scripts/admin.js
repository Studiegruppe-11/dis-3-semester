// root/client/scripts/admin.js

document.addEventListener('DOMContentLoaded', function () {
  // Generel admin-socket (inkl. total omsætning)
  const adminSocket = io();

  adminSocket.on('totalRevenueUpdate', function (data) {
    // Opdater HTML-elementet med total omsætning i dag
    document.getElementById('totalRevenuetoday').textContent = `${data.total_price} Kr.`;
  });

  adminSocket.on('totalRevenueUpdate', function (data) {
    // Opdater HTML-elementet med total omsætning
    document.getElementById('totalRevenue').textContent = `${data.total_price} Kr.`;
  });

  adminSocket.on('finishedOrdersUpdate', function (data) {
    // Opdater HTML-elementet med færdige ordrer
    document.getElementById('finishedOrders').textContent = data.finished_orders || "Ingen færdige ordrer i dag";
  });

  // Lyt efter opdateringer fra serveren
  adminSocket.on('rttUpdate', function (data) {
    // Opdater HTML-elementet med RTT-oplysninger
    document.getElementById('rttInfo').textContent = `RTT: ${data.rtt} ms`;

    if (data.rtt > 1000) {
      document.getElementById('rttInfo').style.color = 'red';
    } else {
      document.getElementById('rttInfo').style.color = 'green';
    }
  });

  adminSocket.on('pingUpdate', function (data) {
    // Opdater HTML-elementet med ping-oplysninger
    document.getElementById('pingInfo').textContent = `Ping: ${data.ping} ms`;

    if (data.ping < 500) {
      document.getElementById('pingInfo').style.color = 'green';
    } else {
      document.getElementById('pingInfo').style.color = 'orange';
    }
  });

  // Lyt efter admin-loginopdateringer
  adminSocket.on('adminLoginUpdate', async function () {
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
  });

  // Funktion til at håndtere admin-logout
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

  // Ordre-relateret socket
  const orderSocket = io('/order');

  orderSocket.on('placedOrdersUpdate', function (placedOrders) {
    // Sort placedOrders based on the lowest placeorders_id first
    placedOrders.sort((a, b) => a.placeorders_id - b.placeorders_id);

    // Update the placed orders list in the HTML
    updatePlacedOrdersList(placedOrders);
  });

  function updatePlacedOrdersList(placedOrders) {
    const placedOrdersList = document.getElementById('placedOrdersList');
    placedOrdersList.innerHTML = '';

    placedOrders.forEach((order, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. Produkt: ${order.name}  Kundens navn: ${order.first_name}`;

      const finishButton = document.createElement('button');
      finishButton.textContent = 'Færdig';
      finishButton.addEventListener('click', function () {
        finishOrder(order.placedorders_id);
      });

      listItem.appendChild(finishButton);
      placedOrdersList.appendChild(listItem);
    });
  }

  // Initial request for placed orders when the page loads
  orderSocket.emit('getPlacedOrders', function (placedOrders) {
    placedOrders.sort((a, b) => a.placeorders_id - b.placeorders_id);
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
        window.location.reload();
      })
      .catch(error => {
        console.error('Error finishing order:', error);
      });
  }
});
