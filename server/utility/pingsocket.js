const ping = require('ping');
const socketIO = require('socket.io');

function setupPing(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('En klient er tilsluttet via socket.');

    // Funktion til at måle ping og RTT
    const measurePing = async () => {
      try {
        const target = '164.90.228.42'; // Erstat med din servers IP
        const res = await ping.promise.probe(target);
        const pingTime = res.time;
        socket.emit('pingUpdate', { ping: pingTime });
        // RTT beregnes som dobbelt ping-tid, da det er en round-trip
        socket.emit('rttUpdate', { rtt: pingTime * 2 });
      } catch (err) {
        console.error('Ping error:', err);
      }
    };
  
    // Mål ping og RTT ved forbindelse og derefter hvert minut.
    measurePing();
    setInterval(measurePing, 60000); //hver 10. min.
  });
}

module.exports = setupPing;
