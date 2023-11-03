// root/client/scripts/admin.js
// Function to get a cookie by name




// virkelig meget kode for at vise navn. kan meget lettere gøres som i home.js ved bare at bruge express session. 


function getCookie(name) {
    const value = "; " + document.cookie;
   // console.log('Cookie value:', value);  // Log the entire cookie string
    const parts = value.split("; " + name + "=");
   // console.log('Split parts:', parts);  // Log the parts after splitting
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Function to display the username
function displayUsername() {
    const username = getCookie('username');
  //  console.log('Retrieved username:', username);  // Log the retrieved username
    if (username) {
        const usernameDisplay = document.getElementById('usernameDisplay');
        //console.log('usernameDisplay element:', usernameDisplay);  // Log the usernameDisplay element
        if (usernameDisplay) {
            usernameDisplay.innerText = username;
            //console.log('Username displayed');  // Log when username is displayed
        } else {
            //console.log('usernameDisplay element not found');  // Log if usernameDisplay element is not found
        }
    } else {
     //   console.log('Username not found in cookies');  // Log if username is not found in cookies
    }
}

// Call displayUsername on page load
window.onload = () => {
 //   console.log('Page loaded');  // Log when page is loaded
    displayUsername();
};











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

} else {
  // Hvis RTT er under grænsen, sæt farven til grøn eller orange som tidligere
  if (data.rtt < 1000) {
    document.getElementById('rttInfo').style.color = 'green';

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