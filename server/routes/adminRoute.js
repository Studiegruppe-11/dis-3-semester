    // root/server/routes/adminRoute.js
    const express = require('express');
    const router = express.Router();
    const connection = require('../db/database1.js');


    // Middleware til at tjekke om brugeren er logget ind som admin
    function isAdmin(req, res, next) {
        if (req.session.isAdmin) {
            next();
        } else {
            res.redirect('/admin/login');
        }
    }

    // Admin Login Route
    router.post('/admin/login', async (req, res) => {
        const { username, password } = req.body;
        try {
            const pool = await connection.poolPromise;
            const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
            if (rows.length > 0) {
                req.session.isAdmin = true;
                req.session.username = username;
                res.cookie('username', username, { httpOnly: false }); // Bruges til at vise username i admin.html
                res.json({ username: username });  // Send the username back in the response
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    });

    // Admin Log ud
    router.get('/admin/logout', (req, res) => {
        req.session.destroy(err => {  // Destroy the session
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'An error occurred while logging out' });
            } else {
                res.clearCookie('username');  // Clear the username cookie
                res.redirect('/admin/login');  // Redirect to the login page
            }
        });
    });

    // Nedenstående skal ikke være udkommenteret, men kan ikke få den til at virke. Lige nu kører der en "app.get" i server.js, som virker.
    // Problemet er at "isAdmin" funktionen gerne skulle køre som middleware herinde fra. Måske man bare kan bruge app eller router.get i stedet for app.get i server.js
    // har også prøvet med ../../
    // router.get('/admin', isAdmin, (req, res) => {
    //     res.sendFile(path.join(__dirname, "client\pages\admin.html"));
    // });



    // hvis server kører dårligt 
    // router.get('/lowping', async (req, res) => {
    //     const path = require('path');
    //     const dotenv = require('dotenv');
    //     dotenv.config({ path: path.resolve(__dirname, '../../.env') });
      
    //     const twilio = {
    //       myphone: process.env.MY_PHONE,
    //       twilioPhone: process.env.TWILIO_PHONE,
    //       accountSid: process.env.TWILIO_SID,
    //       authToken: process.env.TWILIO_TOKEN
    //     };
      
    //     const accountSid = twilio.accountSid;
    //     const authToken = twilio.authToken;
    //     const client = require('twilio')(accountSid, authToken);
      
    //     client.messages
    //       .create({
    //         body: `RTT er over 1000 ms`,
    //         from: twilio.twilioPhone,
    //         to: twilio.myphone

    //         /*
    //         client.messages.create({
    //         body: `RTT er over 1000 ms`,
    //         messagingServiceSid: 'MG7b5a902f7b7ab7b68e45af8c708ab8d5',
    //         to: twilio.myphone
    //         */
            
            
    //       })
    //       .then(message => {
    //         console.log(message.sid);
    //         res.send('Message sent.'); // Send et svar tilbage til klienten
    //       })
    //       .catch(error => {
    //         console.error('Error sending message:', error);
    //         res.status(500).send('Error sending message.'); // Håndter fejl og send en fejlrespons til klienten
    //       });
    //   });


// hvis server kører godt
      // router.get('/goodping', async (req, res) => {
      //   const path = require('path');
      //   const dotenv = require('dotenv');
      //   dotenv.config({ path: path.resolve(__dirname, '../../.env') });
      
      //   const twilio = {
      //     myphone: process.env.MY_PHONE,
      //     twilioPhone: process.env.TWILIO_PHONE,
      //     accountSid: process.env.TWILIO_SID,
      //     authToken: process.env.TWILIO_TOKEN
      //   };
      
      //   const accountSid = twilio.accountSid;
      //   const authToken = twilio.authToken;
      //   const client = require('twilio')(accountSid, authToken);
      
      //   client.messages
      //     .create({
      //       body: `Serveren kører godt`,
      //       from: twilio.twilioPhone,
      //       to: twilio.myphone
      //     })
      //     .then(message => {
      //       console.log(message.sid);
      //       res.send('Message sent.'); // Send et svar tilbage til klienten
      //     })
      //     .catch(error => {
      //       console.error('Error sending message:', error);
      //       res.status(500).send('Error sending message.'); // Håndter fejl og send en fejlrespons til klienten
      //     });
      // });
      



      // test på twilio


      // router.get('/testtwilio', async (req, res) => {
      //   const path = require('path');
      //   const dotenv = require('dotenv');
      //   dotenv.config({ path: path.resolve(__dirname, '../../.env') });
      
      //   const twilio = {
      //     myphone: process.env.MY_PHONE,
      //     twilioPhone: process.env.TWILIO_PHONE,
      //     accountSid: process.env.TWILIO_SID,
      //     authToken: process.env.TWILIO_TOKEN
      //   };
      
      //   const accountSid = twilio.accountSid;
      //   const authToken = twilio.authToken;
      //   const client = require('twilio')(accountSid, authToken);
      
      //   client.messages
      //     .create({
      //       body: `twilio virker`,
      //       from: twilio.twilioPhone,
      //       to: twilio.myphone
      //     })
      //     .then(message => {
      //       console.log(message.sid);
      //       res.send('Message sent.'); // Send et svar tilbage til klienten
      //     })
      //     .catch(error => {
      //       console.error('Error sending message:', error);
      //       res.status(500).send('Error sending message.'); // Håndter fejl og send en fejlrespons til klienten
      //     });
      // });
      
      




    

    module.exports = router;

