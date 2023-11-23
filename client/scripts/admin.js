// root/client/scripts/admin.js


window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/admins/show");
    const result = await response.json();

    if (result.userId && result.name) {
      // Viser navn hvis man er logget ind
      document.getElementById("usernameDisplay").innerHTML = result.name;
      // Skal ikke vise "opret bruger" hvis man er logget ind.
    }
  } catch (error) {
      console.log(error);
      // Håndter fejlhåndtering her
    }
  });




















// SOCKET

// socket til at vise rtt og ping i real time på admin siden.





// Opret en WebSocket-forbindelse til serveren
const socket = io();

// Lyt efter opdateringer fra serveren

socket.on('rttUpdate', (data) => {
    // Opdater HTML-elementet med RTT-oplysninger
    document.getElementById('rttInfo').textContent = `RTT: ${data.rtt} ms`;
  
    // Hvis data.rtt er over en vis grænse, send en SMS via Twilio
   
// Send SMS via Twilio

if (data.rtt > 1000) {
  document.getElementById('rttInfo').style.color = 'red';




  
  // fetch('/lowping') // Foretag en GET-anmodning til /lowping
  // .then(response => {
  //   if (response.ok) {
  //     return response.text();
  //   } else {
  //     throw new Error('An error occurred while making the request.');
  //   }
  // })
  // .then(data => {
  //   console.log(data); // Log besked fra serveren (f.eks., 'Message sent.')
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });






} else {
  // Hvis RTT er under grænsen, sæt farven til grøn eller orange som tidligere
  if (data.rtt < 1000) {
    document.getElementById('rttInfo').style.color = 'green';



    

  
  // fetch('/goodping') // Foretag en GET-anmodning til /lowping
  // .then(response => {
  //   if (response.ok) {
  //     return response.text();
  //   } else {
  //     throw new Error('An error occurred while making the request.');
  //   }
  // })
  // .then(data => {
  //   console.log(data); // Log besked fra serveren (f.eks., 'Message sent.')
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });










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

// SOCKET   


// test twilio

// window.onload = () => {



//   fetch('/testtwilio') // Foretag en GET-anmodning til /lowping
//   .then(response => {
//     if (response.ok) {
//       return response.text();
//     } else {
//       throw new Error('An error occurred while making the request.');
//     }
//   })
//   .then(data => {
//     console.log(data); // Log besked fra serveren (f.eks., 'Message sent.')
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
  

// };






 
 