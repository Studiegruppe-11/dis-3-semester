// root/server/server.js
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const app = express();
const http = require("http").Server(app);
// setupPing bruges ikke?
const setupPing = require('./utility/pingsocket.js');
const setupOrderSocket = require('./utility/orderSocket.js');

// REDIS


// Til cloudinary
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload'); // For handling file uploads

// Favicon 
// Fixes efter makro
// var favicon = require('serve-favicon');

// Til github webhook for automatisk pull 
const { exec } = require('child_process');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// console.log(cloudinary.config()); 

  
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));




// Favicon
// app.use(favicon(path.join(__dirname, '../client/images', 'favicon.ico')));


// Vi kunne ikke få Redis til at virke, så vi bruger bare express-session, selvom det er dårligt til skalering med load balancers.


///////// Redis session storage //////////


import { createClient } from 'redis';

const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

await client.set('key', 'value');
const value = await client.get('key');
await client.disconnect();

// const redis = require('redis');
// const RedisStore = require("connect-redis").default

// // Create Redis Client
// const redisClient = redis.createClient({
//     url: 'redis://0.0.0.0' // Ensure this is the correct Redis URI
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.connect();

// //Configure session middleware to use Redis
// app.use(session({
//     store: new RedisStore({ client: redisClient }),
//     secret: 'your-secret-key', // Replace this with your own secret
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: true, // Set to true if using https
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 // 24 hours
//     }
// }));


////// redis slut /////////








// ############



// ############


// Routes
const adminRoute = require("./routes/adminRoute.js");
app.use("/", adminRoute);

const userRoute = require("./routes/user.route");
app.use("/", userRoute);

const orderRoute = require("./routes/order.route");
app.use("/", orderRoute);

const adminOrderRoute = require("./routes/adminOrder.route");
app.use("/", adminOrderRoute);

const imageRoute = require('./routes/imageRoute');
app.use('/images', imageRoute);


// Send client files from server
app.get("/users/create", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/create.html"));
});

app.get("/users/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/login.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/home.html"));
});

app.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/adminLogin.html"));
});

app.get("/users/bestil", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/bestil.html"));
});

app.get("/users/kurv", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/kurv.html"));
});

app.get("/admin/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/imageUpload.html"));
});


// Admin filer (skal tjekke om dette bruges, da vi bare har lavet redirect hvis en admin bruger ikke er logget ind.)
// Nedenstående skal udkommenteres og så skal vi bruge den fra adminRoute.js (lige nu  er det omvendt), så kan vi også bruge isAdmin middleware funktionen. 
// Alternativt kan vi måske bare have den herinde med det andet middleware, ville bare være fedt at have alt admin login i adminRoute.js
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/admin.html"));
});




// definer hvilket html side der skal åbnes når ip adressen åbnes. SKAL stå nederst under øvrige endpoints.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/login.html"));
});

// Til automatisk pull fra github
app.post('/', function (req, res) {
  exec('sh ../deploy.sh', (err, stdout, stderr) => {
    if (err) {
      // some err occurred
      console.error(err);
    } else {
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
  res.send('POST request to the homepage');
});


// BEGGE SOCKETS KAN IKKE KØRE SAMTIDIGT. VENT MED AT SKRIV OM PINGSOCKET INDTIL VI FINDER UD AF OM DE KAN KØRE SAMMEN. 
// ELLERS DROPPER VI BARE PINGSOCKET. 

// Ping socket
// setupPing(http)

// Order socket. Opdatere ordrestatus i admin.html. S
setupOrderSocket(http);



//TWILIO START
// twilio sms. omsætning for i dag og i går skal også kunne vælges. blot en select statement til db. 
// twilio sms, hvor man skriver til et endpoint på serveren, som så sender en sms tilbage. endpoint defineret på twilio.com

// Ryk nedenstående til en anden fil, så det ikke er i server.js. Evt. utilities.
const { MessagingResponse } = require('twilio').twiml;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body.Body == 'serverstatus') {
    twiml.message(' Serveren er online.');
  } else if (req.body.Body == 'dagens omsætning') {
    twiml.message(' Snart vil du kunne modtage dagens omsætning.');
    // fetch /totalrevenue
  } else {
    twiml.message(
      'Prøv at skriv noget andet.'
    );
  }

  res.type('text/xml').send(twiml.toString());
});


//NEDENSTÅENDE SKAL LIGE FIXES
// twilio som skal automatisk sende sms ud hver dag kl 18.00 med dagens omsætning. virker ikke helt men burde kunne laves hurtigt. 

// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_TOKEN;
// const myPhone = process.env.MY_PHONE;
// const twilioPhone = process.env.TWILIO_PHONE;
// const client = require('twilio')(accountSid, authToken);
// const fetch = require('node-fetch'); // Import the node-fetch library

// // Function to fetch total revenue and send message
// const fetchAndSendMessage = async () => {
//   try {
//     const response = await fetch("/totalRevenuetoday");
//     const result = await response.json();
    
//     let totalRevenue = "0 Kr.";
    
//     if (result.total_price !== undefined) {
//       totalRevenue = result.total_price + " Kr.";
//     }

//     // Check if it's 18:00
//     const now = new Date();
//     if (now.getHours() === 18 && now.getMinutes() === 00) {
//       // Send message using Twilio
//       client.messages
//         .create({
//           body: `Total Revenue: ${totalRevenue}`,
//           from: twilioPhone,
//           to: myPhone
//         })
//         .then(message => console.log(message.sid))
//         .done();
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// };

// // Set up an interval to run the function every minute
// setInterval(fetchAndSendMessage, 60000);

//TWILIO SLUT



// til session storage
// app.use(
//   session({
//     secret: "my-secret-key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );




module.exports = {
  app,
  http,
};

// start server på digitalocean, som vi bruger lige nu. 
http.listen(3000, "164.90.228.42", () => {
  console.log("Serveren er åben på port 3000");
});


// // Start server on localhost, som vi skal bruge når vi aflevere, så Mikkel kan starte på sin PC lokalt. 
// Vi skal tjekke om dette virker

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message, err.stack);
  res.status(500).send('Server Error');
});