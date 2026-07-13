const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connect_DB = require('./connect DB/connect_DB');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));
app.use('/user', require('./User Routes/User Routes'));

const clientBuildPath = path.join(__dirname, '../client/dist');
const indexHtmlPath = path.join(clientBuildPath, 'index.html');

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Client build path:', clientBuildPath);
console.log('Client index exists:', fs.existsSync(indexHtmlPath));``

if (process.env.NODE_ENV === 'production' && fs.existsSync(indexHtmlPath)) {
  console.log('Serving client build from:', clientBuildPath);
  app.use(express.static(clientBuildPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(indexHtmlPath);
  });
} else {
  console.log('Client build not served, API only mode');
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

const PORT = process.env.PORT || 6000;

const startServer = async () => {
  await connect_DB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});