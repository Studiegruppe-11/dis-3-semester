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
    if (data.rtt > 1000) {
      document.getElementById('rttInfo').style.color = 'red';
  
      // Send SMS via Twilio

      // lige nu udkommenteret da env fil ikke er opdateret og koden derfor ikke virker. 




    //   const accountSid = 'xxx'; // skal i evn. fil
    //   const authToken = '[AuthToken]'; // skal i evn. fil
    //   const client = require('twilio')(accountSid, authToken);
  
    //   client.messages
    //     .create({
    //       body: `RTT er over 1000 ms: ${data.rtt} ms`, // finde ud af hvad vi skal skrive
    //       from: 'xxxx', // skal i evn. fil
    //       to: 'xxx' // skal i evn. fil evt. ved ikke om mobil nummer skal på github
    //     })
    //     .then(message => console.log(message.sid))
    //     .done();


        // vi skal have at man skal kunne svare på sms'en og så få yderligere info. 



    } else {
      // Hvis RTT er under grænsen, sæt farven til grøn eller orange
      if (data.rtt < 1000) {
        document.getElementById('rttInfo').style.color = 'green';
      } else {
        document.getElementById('rttInfo').style.color = 'orange';
      }
    }
  });
  
// SOCKET   


