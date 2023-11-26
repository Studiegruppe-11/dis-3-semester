// root/server/utility/orderSocket.js


const connection = require('../db/database1.js');

async function getPlacedOrders() {
  try {
    const pool = await connection.poolPromise;

    // Udfør SQL-forespørgslen for at hente ventende ordrer
    const [rows] = await pool.query(`
            SELECT customers.first_name, products.name
            FROM placedorders
            INNER JOIN customers ON placedorders.customer_id = customers.customer_id
            INNER JOIN products ON placedorders.product_id = products.product_id
            WHERE status = "waiting"
        `);

    return rows;
  } catch (error) {
    console.error('Fejl under hentning af ventende ordrer:', error);
    throw error;
  }
}


 

const socketIO = require('socket.io');

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

    // Udsend opdateringer ved forbindelse og derefter ved ændringer
    emitPlacedOrders();

    socket.on('disconnect', () => {
      console.log('En klient er frakoblet via socket.');
    });
  });
}

module.exports = setupOrderSocket;
