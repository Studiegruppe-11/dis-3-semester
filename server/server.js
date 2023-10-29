// root/server/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const session = require("express-session");

// Til github webhook for automatisk pull 
const { exec } = require('child_process');

//const db = require('./db/database.js');

// bruges dette?
// Socket
const http = require("http").Server(app);
//const io = require("socket.io")(http);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

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

// Admin filer
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
// Hvorfor skal dette stå nederst?

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/login.html"));
});


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

// start server på pc
// Ip kan ændres til ipv4 fremfor 0.0.0.0
http.listen(3000, "0.0.0.0", () => {
  console.log("Serveren er åben på port 3000");
});










// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message);
  res.status(500).send('Server Error');
});
















// ################# SOCKET IO STARTER HER #################

// const socketHandler = (io) => {
//   io.on('connection', (socket) => {
//       console.log('New client connected');

//       const fetchCustomerData = async () => {
//           try {
//               const rows = await db.executeQuery('SELECT * FROM brugere');
//               socket.emit('customer-data', rows);
//           } catch (error) {
//               console.error('Error fetching customer data:', error.message);
//           }
//       };

//       // Initial data fetch
//       fetchCustomerData();

//       // Listen for a 'customer-data-changed' event from your database trigger/stored procedure
//       socket.on('customer-data-changed', fetchCustomerData);
//   });
// };

// socketHandler(io);  // Initialize the socket handler

// // Tror ikke exporten er nødvendig
// module.exports = socketHandler;

// // ################### SOCKET SLUTTER HER ###################

// // Send client files from server
