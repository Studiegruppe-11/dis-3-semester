// root/server/server.js
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const app = express();
const http = require("http").Server(app);

// Til redis
const redis = require('redis');
const RedisStore = require("connect-redis").default

// Socket
const setupOrderSocket = require('./utility/orderSocket.js');

// Til cloudinary
const cloudinary = require('cloudinary').v2;
//const fileUpload = require('express-fileupload'); // For handling file uploads

// Til github webhook for automatisk pull 
const { exec } = require('child_process');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
  
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// Lav Redis client
const redisClient = redis.createClient();

// Hvis der er en fejl i redis, log den
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', (err) => console.log('Connected to redis successfully'));

redisClient.connect();

// Konfiguration af redis
app.use(session({
    store: new RedisStore({ 
      client: redisClient,
      ttl: 60 *60 * 24 }), // I sekunder: 24 timer
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Denne burde kunne være true, men det virker ikke. Måske fordi den forbinder direkte til localhost og altså ikke kontakte en ekstern server/db?
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 // cookies: I millisekunder: 24 timer
    }
}));

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

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/admin.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/login.html"));
});

// Til automatisk pull fra github
app.post('/', function (req, res) {
  exec('sh ../deploy.sh', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
  res.send('POST request to the homepage');
});


// Order socket. Opdatere ordrestatus i admin.html. S
setupOrderSocket(http);


//TWILIO START
const { MessagingResponse } = require('twilio').twiml;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/smstext', (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body.Body == 'serverstatus') {
    console.log('Twilio sms sendt');
    twiml.message('Serveren er online.');
  } else {
    twiml.message('Prøv at skriv noget andet.');
  }

  res.type('text/xml').send(twiml.toString());
});












//TWILIO SLUT

module.exports = {
  app,
  http,
};

// start server på digitalocean, som vi bruger lige nu. 
http.listen(3000, "164.90.228.42", () => {
  console.log("Serveren er åben på port 3000");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message, err.stack);
  res.status(500).send('Server Error');
});