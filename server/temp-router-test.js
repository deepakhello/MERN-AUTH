process.chdir('c:/MERN/server');
const express = require('express');
const app = express();
app.use('/user', require('./User Routes/User Routes'));
app.listen(6004, () => console.log('ready'));
