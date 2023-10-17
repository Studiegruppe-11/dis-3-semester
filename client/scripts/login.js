//const mysql = require('mysql2');
const db = require('../../database.js'); // Opdater stien til at pege på den korrekte placering af config-filen


// login.js

document.addEventListener("DOMContentLoaded", function () {
  // Vent, indtil DOM'en er indlæst
  const loginButton = document.querySelector("button");

  loginButton.addEventListener("click", function () {
    // Dette kodeblok køres, når knappen "Log ind" klikkes
    login(); 
  });
});

function login() {



  // NOGET LIGNENDE NEDENSTÅENDE. 

  // const { username, password } = req.body;
  // // serveren modtager brugernavn og adgangskode i anmodningens krop
  // const result = await executeSQL( // venter på at  at executeSQL-funktionen returnerer resultatet af SQL-forespørgslen,
  //   // før den fortsætter med eksekveringen af koden.
  //   `SELECT * FROM users WHERE username='${username}' AND password='${password}'` // henter alt fra brugeren, der har det indtastede 
  //   // brugernavn og adgangskode
  // );
  // if (Object.keys(result).length > 0) {
  //   // Hvis der er mindst et resultat fra databasen. altså hvis brugeren findes

  //   const user = result[1]; // json starter på 1

  //   // Gem brugerens id og navn i express-session. som bruges i overall.js til at opdatere navn i højre hjørne og ved tilføjelse af artikler til
  //   // favoriter
  //   // bliver gemt i hukommelsen på serveren
  //   req.session.userId = user.user_id;
  //   req.session.name = user.name;

  //   // Send svar tilbage til klienten
  //   res.json({ success: true });
  // } else {
  //   res.json({ error: "Forkert brugernavn eller adgangskode" });
  // }


};

