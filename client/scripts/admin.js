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




});

 
    // SOCKET TIL AT VISE ALLE VENTENDE ORDRER I REAL TIME PÅ ADMIN SIDEN

 
const socket1 = io('/order');
socket1.on('placedOrdersUpdate', (data) => {
  updatePlacedOrders(data);


function updatePlacedOrders(placedOrders) {
  const placedOrdersElement = document.getElementById('placedOrders');
  placedOrdersElement.innerHTML = '';

  placedOrders.forEach((order) => {
    const orderItem = document.createElement('div');
    orderItem.textContent = `Kundens navn: ${order.first_name}, Produkt: ${order.name}`;
    placedOrdersElement.appendChild(orderItem);
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
 