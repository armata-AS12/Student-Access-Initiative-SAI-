const express = require('express');
const router = express.Router();
const knex = require('../db');

// ดึงข้อมูลนักเรียนทั้งหมด
router.get('/', async (req, res) => {
  try {
    const rows = await knex('student').select('*');
    res.json({ status: 1, rows });
  } catch (error) {
    res.status(500).json({ status: 0, error: error.message });
  }
});

// เพิ่มนักเรียน
router.post('/add', async (req, res) => {
  try {
    const newStudent = req.body;
    const id = await knex('student').insert(newStudent);
    res.json({ status: 1, id });
  } catch (error) {
    res.status(500).json({ status: 0, error: error.message });
  }
});

// ลบนักเรียน
router.post('/delete', async (req, res) => {
  try {
    await knex('student').where({ student_id: req.body.student_id }).del();
    res.json({ status: 1, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 0, error: error.message });
  }
});

module.exports = router;
