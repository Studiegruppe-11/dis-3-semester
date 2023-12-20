# Joe Juice Projekt (DA) - English Below

## Introduktion
Dette skoleprojekt er en webapplikation, der er modelleret efter Joe & The Juice. Den er bygget med Node.js og Express og hostet på en DigitalOcean droplet. Applikationen indeholder brugerautentificering, juicebestilling, ordrestyring og upload af billeder. Antallet af commits er højt på grund af testning/implementering direkte på serveren.
Dette projekt er udviklet til at køre på serveren og kan derfor ikke køres på localhost. 
Projektet/ webapplikationen kan findes ved at indtaste serverens IP-adresse 164.90.228.42 eller domænenavnet joejuicexam.me i søgefeltet i en søgemaskine.
.env filen er blevet tilføjet til root i denne filmappe, som er afleveret i Digitaleksamen.
.env filen indeholder adgangsnøgler til databasen, G-mail, Cloudinary og Redis.

## Nøglefunktioner
- **Brugerautentificering:** Sikker login og registreringssystem.
- **Integreret Database:** Produkter, bruger- og admininformationer opbevares i MySQL.
- **In Cache Hukommelse SM:** Klient sessioner opbevares på tværs af serverinstanser med Redis.
- **Juicebestilling:** Brugere kan gennemse og bestille juice.
- **Ordrestyring:** Administratorer kan håndtere juiceordrer.
- **Billedupload til CDN:** Administratorer kan uploade billeder til Cloudinary.
- **Real-time Opdateringer:** Socket.IO til real-tids opdateringer af ordrestatus.
- **Automatiseret Udrulning:** GitHub webhook til automatisk udrulning ved commits.
- **SMS Notifikationer:** Twilio integration til afsendelse af SMS opdateringer.

## Anvendte Teknologier
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Real-time Kommunikation:** Socket.IO
- **SMS Service:** Twilio
- **Billedlagring:** Cloudinary
- **Sessionsstyring:** Redis
- **Versionskontrol:** Git
- **Hosting:** DigitalOcean

# Joe Juice Project (EN)

## Introduction
This school project is a web application modeled after Joe & The Juice. It's built using Node.js and Express and hosted on a DigitalOcean droplet. The application features user authentication, juice ordering, order management, and image uploads. Commit count is high due testing/implementation directly on the server.This project is designed to run on the server and therefore cannot be executed on localhost. The project/web application can be accessed by entering the server's IP address 164.90.228.42 or the domain name joejuicexam.me in the search bar of a search engine.


## Key Features
- **User Authentication:** Secure login and registration system.
- **Integrated Database:** Products, user- and admin information is stored on MySQL.
- **In Cache Memory SM:** Client sessions are stored across server instances with Redis.
- **Juice Ordering:** Users can browse and order juices.
- **Order Management:** Admins can manage juice orders.
- **Image Upload to CDN:** Admins can upload images to Cloudinary.
- **Real-time Updates:** Socket.IO for real-time order status updates.
- **Automated Deployment:** GitHub webhook for auto-deployment on commits.
- **SMS Notifications:** Twilio integration for sending SMS updates.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express and
- **Database:** MySQL
- **Real-time Communication:** Socket.IO
- **SMS Service:** Twilio
- **Image Storage:** Cloudinary
- **Session Management:** Redis
- **Version Control:** Git
- **Hosting:** DigitalOcean

