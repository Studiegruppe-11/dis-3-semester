// root/server/server.js
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const app = express();
const session = require("express-session");
const http = require("http").Server(app);
// const ping = require('ping');
// const io = require('socket.io')(http);
const pingSocket = require('./utility/pingsocket.js');

// Til github webhook for automatisk pull 
const { exec } = require('child_process');

// SOCKET TIL PING OG RTT

// grundlæggende rigtigt med rtt og ping skal lige kigges igennem. fx tror jeg ikke at rtt er ping*2. og det er meget meget lave ping og rtt tider vi får. 



// SOCKET



// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));


// til session storage
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);


// Routes
const adminRoute = require("./routes/adminRoute.js");
app.use("/", adminRoute);

const userRoute = require("./routes/user.route");
app.use("/", userRoute);


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



// Admin filer
// Nedenstående skal udkommenteres og så skal vi bruge den fra adminRoute.js (lige nu  er det omvendt), så kan vi også bruge isAdmin middleware funktionen. 
// Alternativt kan vi måske bare have den herinde med det andet middleware, ville bare være fedt at have alt admin login i adminRoute.js
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/admin.html"));
});


// se hvilken bruger der er gemt i session storage. 
app.get('/test', (req, res) => {
  if (req.session.userId && req.session.name) {
    res.send(`Bruger ID: ${req.session.userId}, Navn: ${req.session.name}`);
  } else {
    res.send('Ingen data i sessionen.');
  }
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



pingSocket(http);



// twilio sms. omsætning for i dag og i går skal også kunne vælges. blot en select statement til db. 

const { MessagingResponse } = require('twilio').twiml;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body.Body == 'serverstatus') {
    twiml.message(' Serveren er online.');
  } else if (req.body.Body == 'dagens omsætning') {
    twiml.message(' Snart vil du kunne modtage dagens omsætning.');
  } else {
    twiml.message(
      'Prøv at skriv noget andet.'
    );
  }

  res.type('text/xml').send(twiml.toString());
});





// start server
http.listen(3000, "164.90.228.42", () => {
  console.log("Serveren er åben på port 3000");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message);
  res.status(500).send('Server Error');
});




