const { connect, connection } = require("mongoose");

// Mongo connection URI from machines environment
const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/socialmediaAPIDB";

// MongoDB string formats and driver
connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Exports connection
module.exports = connection;
