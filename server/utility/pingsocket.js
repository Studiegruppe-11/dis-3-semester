const ping = require('ping');

exports.setupPing = (socket) => {
  const measurePing = async () => {
    try {
      const target = '164.90.228.42';
      const res = await ping.promise.probe(target);
      const pingTime = res.time;
      socket.emit('pingUpdate', { ping: pingTime });
      socket.emit('rttUpdate', { rtt: pingTime * 2 });
    } catch (err) {
      console.error('Ping error:', err);
    }
  };

  measurePing();
  setInterval(measurePing, 600000); //every 10 minutes
};