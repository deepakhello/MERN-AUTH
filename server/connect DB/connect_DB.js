const dns = require('dns');
const mongoose = require('mongoose');

const connect_DB = async () => {
  const uri = process.env.DB_URL;
  if (!uri) {
    throw new Error('DB_URL environment variable is not defined.');
  }

  // Use public resolvers for MongoDB Atlas SRV lookups when the local DNS resolver is unreliable.
  dns.setServers(['8.8.8.8', '1.1.1.1']);

  await mongoose.connect(uri, {
    family: 4,
    serverSelectionTimeoutMS: 10000,
  });

  console.log('Connected to the database successfully!');
};





module.exports = connect_DB;