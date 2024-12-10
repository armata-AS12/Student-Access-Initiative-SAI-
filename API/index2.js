const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const uploadRoutes = require('./routes/upload');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const port = 7000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/students', authenticateToken, studentRoutes);
app.use('/upload', authenticateToken, uploadRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
