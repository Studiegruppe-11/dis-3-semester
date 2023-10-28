// root/server/routes/showAdminsRoute.js

const connection = require('../db/database1.js');



//const adminRoute = express.Router();
//const { executeQuery } = require('../db/database.js');  // Destructure to get the executeQuery function

// adminRoute.get('/', async (req, res) => {
//     try {
//         const rows = await executeQuery('SELECT * FROM admins');  // Use the executeQuery function
//         res.json(rows);
//         console.log('Admin data has been fetched.')
//     } catch (error) {
//         // This catch block will handle any other errors that may occur in this route handler,
//         // or if you decide to throw errors from executeQuery in the future.
//         res.status(500).send('Server error: ' + error.message);
//     }
// });


adminRoute.get('/show-admins', async (req, res) => {
    try {
      const pool = await connection.poolPromise;
  
      // Udfør SQL-forespørgslen her
      const [rows] = await pool.query('SELECT * FROM admins');
  
      res.send(rows);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
);
  





module.exports = adminRoute;
