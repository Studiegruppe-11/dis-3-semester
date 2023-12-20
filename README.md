# Joe Juice Projekt

## Introduktion
Dette skoleprojekt er en webapplikation, der er modelleret efter Joe & The Juice. Den er bygget med Node.js og Express og hostet på en DigitalOcean droplet. Applikationen indeholder brugerautentificering, juicebestilling, ordrestyring og upload af billeder. Antallet af commits er højt på grund af testning/implementering direkte på serveren.

## OBS
- Dette projekt er udviklet med henblik på at køre på serveren og kan derfor ikke køres på localhost.
- Applikationen kan findes ved at indtaste serverens IP-adresse 164.90.228.42 eller domænenavnet "www.joejuicexam.me" i en browser.
- .env filen er blevet tilføjet til root mappen i dette projekt, som er afleveret i Digitaleksamen.
- .env filen indeholder adgangsnøgler til MySQL databasen, G-mail, Cloudinary og Redis.
- Der kan logges på som admin på siden ved at bruge brugernavn "joejuiceAdmin" og adgangskode "123". En kunde-bruger kan man selv oprette. 

## Nøglefunktioner
- **Brugerautentificering:** Sikker login og registreringssystem.
- **Integreret Database:** Produkter, bruger- og admininformationer opbevares i MySQL.
- **In Cache Hukommelse SM:** Klient sessioner opbevares på tværs af serverinstanser med Redis.
- **Juicebestilling:** Brugere kan gennemse og bestille juice.
- **Ordrestyring:** Administratorer kan håndtere juiceordrer.
- **Billedupload til CDN:** Administratorer kan uploade billeder til Cloudinary.
- **Real-time Opdateringer:** Socket.IO til real-tids opdateringer af ordrestatus.
- **Automatiseret Udrulning:** GitHub webhook til automatisk udrulning ved commits.
- **SMS Notifikationer:** Twilio integration til afsendelse af SMS serverstatus.

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