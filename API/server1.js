const express = require('express')
var bodyParser = require('body-parser')
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require('path');
const port = 7000




const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "stdactivity_2567",
  },
});

/////////////////////////////////////////////////////uploadsprofile
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname); // ดึงนามสกุลไฟล์ เช่น .jpg, .png
    const baseName = path.basename(file.originalname, ext); // ดึงชื่อไฟล์ไม่รวมนามสกุล
    const uniqueFilename = `${timestamp}-${baseName}`; // ชื่อไฟล์ไม่รวมนามสกุล
    cb(null, `${uniqueFilename}${ext}`); // บันทึกชื่อไฟล์พร้อมนามสกุลจริงลงในโฟลเดอร์

    // บันทึกเฉพาะชื่อไฟล์ (ไม่รวม path และนามสกุล) ลงใน req เพื่อบันทึกในฐานข้อมูล
    req.uploadedFileName = uniqueFilename;
    console.log('Uploaded filename without extension and path:', uniqueFilename);
  }
});



const upload = multer({ storage: storage });

const jwt = require('jsonwebtoken');
const { log } = require('console');
const SECRET_KEY = 'password';


const users = [
  { id: 1, username: 'test', password: '123456' }
];

//////////////////////////////////////////////////////////////////////

// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

////////////////////////////////////////////////////////////////////////////////////////////////

// Route สำหรับการเข้าสู่ระบบ
app.post("/login", async (req, res) => {
  console.log("username & password=", req.body);
  try {
    // ตรวจสอบ username จากฐานข้อมูล
    let row = await knex("student").where({ username: req.body.username });
    console.log('row=', row[0])
    if (row.length === 0) {
      // หากไม่มี username ในฐานข้อมูล
      return res.status(404).json({ status: 0, message: "username ไม่ถูกต้อง" });
    }
    const userFromDB = row[0]; // ดึงข้อมูลผู้ใช้จากฐานข้อมูล

    // ตรวจสอบรหัสผ่าน (เปรียบเทียบ req.body.password กับข้อมูลในฐานข้อมูล)
    if (req.body.password !== userFromDB.password) {
      return res.status(401).json({ status: 0, message: "password ไม่ถูกต้อง" });
    }

    // หาก username และ password ถูกต้อง สร้าง JWT Token
    const token = jwt.sign(
      { id: userFromDB.student_id, username: userFromDB.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // ส่ง token กลับไปยัง client
    return res.json({ status: 1, token });
  } catch (e) {
    // จัดการข้อผิดพลาด
    console.error("Error:", e.message);
    return res.status(500).json({ ok: 0, error: e.message });
  }
});
//////////////////////////////////////////////////////////////////////
app.post('/upload-single', upload.single('picture'), async (req, res) => {
  try {
    console.log('file=', req.file)
    console.log('username=', req.body.username)
    console.log('password=', req.body.password)
    console.log('fullname=', req.body.fullname)
    console.log('student_id=', req.body.student_id)
    let insert = await knex('student')
    .where({ username: req.body.username })
    .update({
        picture: req.file.filename
    });
    res.send({
      message: 'อัปโหลดไฟล์สำเร็จ',
      file: req.file
    });
  } catch (error) {
    res.send({ status: 0, error: error.messege });
  }
  
});



/////////////////////////////////////////////////////////////////////////////

// API สำหรับอัปโหลดหลายไฟล์
app.post('/upload-multiple', upload.array('pictures'), (req, res) => {
  // console.log('Date.now()=', Date.now())
  console.log('', req)
  res.json({
    message: 'อัปโหลดหลายไฟล์สำเร็จ',
    files: req.files
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/list', async (req, res) => {
  console.log('user=', res.query)
  let row = await knex('student');
  res.send({
    'status': "ok",
    rows: row
  })
})

////////////////////////////////////////////////////////////////INSERT
app.use(bodyParser.json())
app.use(cors());
app.post('/insert', async (req, res) => {
  console.log('data=', req.body.activities);
  const activities = req.body.activities;
  try {
    // ใช้ for loop เพื่อทำการ insert ทีละรายการ
    for (const activity of activities) {
      await knex('sttendance').insert({
        student_id: activity.studentId,
        status_id: activity.attendance || 1, // ถ้าไม่มี attendance ให้ตั้งค่าเป็น 1

      });
    }
    // ส่งผลลัพธ์กลับไปยัง client เมื่อเสร็จสิ้นการ insert
    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (e) {
    res.send({ status: 0, error: e.message });
  }
})
//app.post('/insert', async (req, res) => {
//  console.log('data=', req.body.activities);
//  const activities = req.body.activities;
//  try {
//const activities = req.body.activities.filter(activity => activity.studentId && activity.studentName); // กรองข้อมูลที่มี studentId และ studentName

/////////////////////////////////////////////////////////////insert&update

app.post("/insertStudent", upload.single('picture'), async (req, res) => {
  console.log("insert=", req.body);
  try {
    let row = await knex("student").insert({
      student_id: req.body.student_id,
      username: req.body.username,
      password: req.body.password,
      picture: req.body.picture,
    });
    res.send({
      status: 1,
      data: row,
    });
  } catch (e) {
    res.send({ status: 0, error: e.message });
  }
});

app.post('/updateStudent', upload.single('picture'), async (req, res) => {
  const { student_id } = req.body;
  const picture = req.file ? req.file.filename : null;

  if (!student_id || !picture) {
    return res.status(400).json({ status: 0, error: 'Missing required fields' });
  }

  try {
    const updated = await db('student').update({ picture }).where({ student_id });
    if (updated) {
      res.json({ status: 1, file: { path: picture } });
    } else {
      res.status(400).json({ status: 0, error: 'Failed to update' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ status: 0, error: 'Server error' });
  }
});


///////////////////////////////////////////////////////////////////////////////delete////////////

app.post("/deleteStudent", async (req, res) => {
  ;
  try {
    let row = await knex("student")
      .where({ student_id: req.body.student_id })
      .del();
    res.send({
      status: 1,
      status: row,
    });
  } catch (e) {
    res.send({ status: 0, error: e.message });
  }
});

//////////////////////////////////////////////////////////////upprofile////////////////

app.post('/upprofile', (req, res) => {
  console.log('body=>', req.body)
  console.log('file=>', req.body)
})

///////////////////////////////////////////////////////////////////////////////////////



app.get('/listStudent', async (req, res) => {

  try {
    console.log('user=', req.query)
    let row = await knex('student');
    res.send({
      'status': "ok",
      rows: row
    })
  } catch (e) {
    res.send({ ok: 0, error: e.message });
  }
})

// http://localhost:7000/login
app.get('/login', (req, res) => {
  //req.query  =>  get
  //req.body   =>  post
  try {
    console.log('username & password=', req.query)
  } catch (e) {
    res.send({ ok: 0, console: e.message });
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Middleware สำหรับตรวจสอบ JWT Token
function authenticateToken(req, res, next) {
  const headerstoken = req.headers['authorization']?.split(' ')[1];
  // const token = headerstoken.split(' ')[1]

  console.log('token=', headerstoken)
  if (!headerstoken) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(headerstoken, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token', 
        status: 0
      });
      
    }
    req.user = decoded;
    next();
  });
}

// Route ที่ต้องมีการยืนยันตัวตน (Protected Route)
app.get('/checktoken', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to the Hell!` });
});