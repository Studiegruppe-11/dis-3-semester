// root/client/scripts/admin.js


window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/admins/show");
    const result = await response.json();

    if (result.adminUserId && result.AdminName) {
      // Viser navn hvis man er logget ind
      document.getElementById("usernameDisplay").innerHTML = result.adminName;
      // Skal ikke vise "opret bruger" hvis man er logget ind.
    }
  } catch (error) {
      console.log(error);
      // Håndter fejlhåndtering her
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
 