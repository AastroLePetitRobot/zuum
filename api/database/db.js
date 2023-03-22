const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



module.exports = client;