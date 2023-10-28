// root/server/server.js

// 
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// 
//const db = require('./db/database.js');

// Socket
const http = require("http").Server(app);
//const io = require("socket.io")(http);


// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));



// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message);
  res.status(500).send('Server Error');
});


// Routes

const showAdminsRoute = require("./routes/showAdminsRoute.js");


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/admin.html"));
});




// API (endpoints)

// app.use("/customer", customerRoute);
//app.use("/show-admins ", showAdminsRoute);

const adminRoute = require("./routes/showAdminsRoute.js");
app.use("/", userRoute);



// start server på pc
// Ip kan ændres til ipv4 fremfor 0.0.0.0
http.listen(3000, "0.0.0.0", () => {
  console.log("Serveren er åben på port 3000");
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
