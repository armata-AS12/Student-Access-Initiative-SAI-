const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const knex = require('knex'); 
const config = require('./config');
const db = knex(config.db);

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
   console.log('welcome')
   req.db = db  // เพิ่ม db ใน request ทุกครั้งที่เข้ามาใช้งาน
   req.config = config
   next()
})

// เชื่อมโยง file student.js
//localhost:7000/
app.use('/student', require('./student'))
app.use('/auth', require('./auth'))
// app.use('/techer', require('./api/techer.js'))

app.listen(7000, () => {
    console.log('Example app listening on port 7000');
    })
