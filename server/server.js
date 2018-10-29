if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments');
	require('dotenv').config();
}
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const dbConnection = require('./db'); // loads our connection to the mongo database
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.APP_SECRET || 'this is the default passphrase',
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
}))
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  const path = require('path');
	console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/'))
	});
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"), { useNewUrlParser: true };

// Error handler
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======');
	console.error(err.stack);
	res.status(500);
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});