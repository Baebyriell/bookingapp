const express = require('express');
const pool = require('../database/pool');

const router = express.Router();

router.post('/', async (req, res) => {
  const { services, userEmail } = req.body;

  if (!services || !Array.isArray(services) || services.length === 0) {
    return res.status(400).json({ message: 'No services provided' });
  }

  if (!userEmail) {
    return res.status(400).json({ message: 'User email required' });
  }

  const totalAmount = services.reduce((sum, s) => sum + s.price, 0);

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [bookingResult] = await conn.query(
      'INSERT INTO bookings (user_email, total_amount) VALUES (?, ?)',
      [userEmail, totalAmount]
    );

    const bookingId = bookingResult.insertId;

    const bookingItemsValues = services.map(service => [
      bookingId,
      service.id,
      service.name,
      service.price
    ]);

    await conn.query(
      'INSERT INTO booking_items (booking_id, service_id, service_name, price) VALUES ?',
      [bookingItemsValues]
    );

    await conn.commit();
    res.status(201).json({ message: 'Booking confirmed successfully' });
  } catch (err) {
    await conn.rollback();
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Booking failed' });
  } finally {
    conn.release();
  }
});
router.get('/:userEmail', async (req, res) => {
  const { userEmail } = req.params;

  try {
    const [rows] = await pool.query(
      `
      SELECT bi.service_id AS id, bi.service_name AS name, bi.price, s.description, s.image_url AS imageUrl
      FROM bookings b
      JOIN booking_items bi ON b.id = bi.booking_id
      LEFT JOIN services s ON bi.service_id = s.id
      WHERE b.user_email = ?
      `,
      [userEmail]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});



module.exports = router;
