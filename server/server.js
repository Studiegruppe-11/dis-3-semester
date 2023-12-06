// root/server/server.js
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const app = express();
const http = require("http").Server(app);
const setupPing = require('./utility/pingsocket.js');
const setupOrderSocket = require('./utility/orderSocket.js');

// Til cloudinary
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload'); // For handling file uploads

// Favicon
// var favicon = require('serve-favicon');

// Til github webhook for automatisk pull 
const { exec } = require('child_process');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

console.log(cloudinary.config()); 

  
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));




// Favicon
// app.use(favicon(path.join(__dirname, '../client/images', 'favicon.ico')));




// const RedisStore = require('connect-redis')(session);

// const redisOptions = {
//   host: '164.90.228.42',
//   port: 6379,
//   // yderligere konfiguration efter behov
// };

// // Listen for the 'connect' event
// redisClient.on('connect', () => {
//     console.log('Connected to Redis server successfully');
// });

// // Listen for the 'error' event
// redisClient.on('error', (err) => {
//     console.error('Redis error: ', err);
// });

// app.use(session({
//   store: new RedisStore(redisOptions),
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24,
//   },
// }));


// const { createClient } = require('redis');

// const redisClient = createClient({
//     // If Redis is on the same host and default port
//     host: '164.90.228.42',
//     port: 6379
// });

// redisClient.on('connect', () => {
//     console.log('Connected to Redis server successfully');
// });

// redisClient.on('error', (err) => {
//     console.error('Redis error: ', err);
// });

// // Connect to Redis server
// (async () => {
//     await redisClient.connect();
// })();


// app.use(session({
//   store: new RedisStore({ client: redisClient }),
//   secret: 'your-secret-key', // Replace with a real secret key
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//       secure: true, // Set to true if using https
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24 // 24 hours
//   }
// }));




const RedisStore = require("connect-redis")(session); // connect-redis wrapper for express-session
app.use(
  session({
    store: new RedisStore({
      host: "164.90.228.42", // Du skal erstatte dette med din Redis-serveradresse
      port: 6379, // Du skal erstatte dette med din Redis-serverport
      ttl: 86400, // Time-to-live i sekunder, her 24 timer
    }),
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);







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


// Admin filer
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


// BEGGE SOCKETS KAN IKKE KØRE SAMTIDIGT. 

// Ping socket
// setupPing(http)

// Order socket. Opdatere hver gang en ny ordre bliver oprettet eller hvert 30. sekund.
setupOrderSocket(http);




//TWILIO START
// twilio sms. omsætning for i dag og i går skal også kunne vælges. blot en select statement til db. 

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
//     if (now.getHours() === 10 && now.getMinutes() === 15) {
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





// start server på digitalocean
http.listen(3000, "164.90.228.42", () => {
  console.log("Serveren er åben på port 3000");
});


// // Start server on localhost
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message, err.stack);
  res.status(500).send('Server Error');
});