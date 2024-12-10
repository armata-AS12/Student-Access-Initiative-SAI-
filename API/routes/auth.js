const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const knex = require('../db');
const SECRET_KEY = 'password';

router.post('/login', async (req, res) => {
  try {
    const row = await knex('student').where({ username: req.body.username });
    if (row.length === 0) {
      return res.status(404).json({ status: 0, message: 'username ไม่ถูกต้อง' });
    }
    const user = row[0];
    if (req.body.password !== user.password) {
      return res.status(401).json({ status: 0, message: 'password ไม่ถูกต้อง' });
    }
    const token = jwt.sign({ id: user.student_id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ status: 1, token });
  } catch (error) {
    res.status(500).json({ status: 0, error: error.message });
  }
});

module.exports = router;
