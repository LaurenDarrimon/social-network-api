const {connect, connection} = require('mongoose');

const connectionString = 
    process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

// Wrap Mongoose around local connection to MongoDB
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;