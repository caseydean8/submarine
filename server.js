require("dotenv").config();
const app = require("./config/express-config");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

// connect to MongoDB
// moved database from mlab to cloud.mongodb.com. Had to create database in Cluster0 called submarine, and add collections users and subscriptions. For this to work on Heroku you have to whitelist/add IP address 0.0.0.0/0 by navigating to SECURITY/Network Access/IP Access List in the cloud.mongo dashboard. 
//https://stackoverflow.com/questions/42159175/connecting-heroku-app-to-atlas-mongodb-cloud-service
// Also changed config vars MONGODB_URI in Heroku settings

// BYE mlab, nice knowing ya...
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://submarine:submar1ne@ds139768.mlab.com:39768/heroku_rx8cqg30";
// const MONGODB_URI =
//   process.env.MONGODB_URI ||
//   "mongodb login moved to env file :)";

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) {
      console.log("There is a problem with the connection" + err);
    } else {
      console.log("Mongoose connection is good.");
      console.log(process.env.MONGODB_URI);
    }
  }
);

//server is up and running
app.listen(PORT);
