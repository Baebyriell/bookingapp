const express = require('express');
const pool = require('../database/pool');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id, 
        name, 
        description, 
        price, 
        image_url AS imageUrl
      FROM services
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services:', error.message);  // <-- log the real error
    res.status(500).json({ message: 'Internal server error', error: error.message }); // send it in response
  }
});



module.exports = router;
