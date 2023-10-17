// root/server/server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const port = 3000;

const customerRoute = require("./routes/customer");
const storeRoutes = require("./routes/store");
const adminRoute = require("./routes/adminRoute.js");
const cartRoute = require('./routes/cartRoute.js');
const showAdminsRoute = require("./routes/showAdminsRoute.js");

// API

app.use("/customer", customerRoute);
app.use("/store", storeRoutes);
app.use("/admins", adminRoute);
app.use('/cart', cartRoute);
app.use("/show-admins", showAdminsRoute);

const http = require("http").Server(app);
const io = require("socket.io")(http);

// const chatLog = require("./db/chat.js");

// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// Send client files from server

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/login.html"));
});


app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/chat.html"));
});

app.get("/store", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/store.html"));
});


app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/admin.html"));
});

app.get("/admin/data", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/adminData.html"));
});

app.get("/admin/orders", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/adminOrders.html"));
});

app.get("/store/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/checkout.html"));
});

// app.get("/chatlog", (req, res) => {
//   res.send(chatLog);
// });


// Start server på droplet

// http.listen(3000, "164.90.228.42", () => {
//   console.log("Server open on port 3000");
// });

// start server på pc
http.listen(port, 'localhost', () => {
  console.log('Server open on port: ' + port);
});


// Socket IO

// ################### CHAT FRA TIMERNE (MÅ IKKE BRUGES) 
// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//     chatLog.push(msg);
//     console.log(chatLog);
//   });
//   socket.on("user joined", (username) => {
//     console.log(username + " joined the chat");
//     io.emit("chat message", username + " joined the chat");
//   });
//   socket.on("hola", (besked) => {
//     console.log(besked);
//     io.emit("hola", "besked tilbage til klienten..");
//   });
// });

// http.listen(3000, "localhost", () => {
//   console.log(`Socket.IO server running at http://localhost:3000/`);
// });
