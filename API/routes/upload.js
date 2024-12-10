const express = require('express');
const multer = require('multer');
const path = require('path');
const knex = require('../db');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${timestamp}-${baseName}${ext}`);
  },
});
const upload = multer({ storage });

// อัปโหลดไฟล์เดี่ยว
router.post('/single', upload.single('picture'), async (req, res) => {
  try {
    await knex('student').where({ student_id: req.body.student_id }).update({ picture: req.file.filename });
    res.json({ status: 1, message: 'Uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ status: 0, error: error.message });
  }
});

module.exports = router;
