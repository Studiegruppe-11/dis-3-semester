// root/server/utility/orderSocket.js
const socketIO = require('socket.io');

// Bruger database connection pool fra root/server/db/database1.js
const connection = require('../db/database1.js');

async function getPlacedOrders() {
  try {
    const pool = await connection.poolPromise;

    // Udfør SQL-forespørgslen for at hente ventende ordrer
    // inner join for at hente navn på kunde
    // inner join for at hente navn på produkt
    // hvor status er "waiting", som den sættes når ordrer bestilles. 
    const [rows] = await pool.query(`
    SELECT placedorders_id, customers.first_name, products.name
    FROM placedorders
    INNER JOIN customers ON placedorders.customer_id = customers.customer_id
    INNER JOIN products ON placedorders.product_id = products.product_id
    WHERE placedorders.status = "waiting"
        `);

    return rows;
  } catch (error) {
    console.error('Fejl under hentning af ventende ordrer:', error);
    throw error;
  }
}
 

function setupOrderSocket(http) {
  const io = socketIO(http).of('/order');

  io.on('connection', (socket) => {
    console.log('En klient er tilsluttet via socket.');
    
    // Lyt efter opdateringer i ventende ordrer
    const emitPlacedOrders = async () => { 
      try {
        const placedOrders = await getPlacedOrders();
        console.log('Placed orders updated:', placedOrders);
        io.emit('placedOrdersUpdate', placedOrders);
      } catch (error) {
        console.error('Fejl under håndtering af opdatering af ventende ordrer:', error);
      }
    };

    // Udsend opdateringer ved forbindelse 
    emitPlacedOrders();

    // Udsend opdateringer hvert 10. sekund
    setInterval(emitPlacedOrders, 10000);

    // Håndter 'getPlacedOrders' hændelsen fra klienten
    socket.on('getPlacedOrders', async (callback) => {
      try {
        const placedOrders = await getPlacedOrders();
        callback(placedOrders);
      } catch (error) {
        console.error('Fejl under hentning af ventende ordrer:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('En klient er frakoblet via socket.');
    });
  });
}

module.exports = setupOrderSocket;