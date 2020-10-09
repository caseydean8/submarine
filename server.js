require("dotenv").config();
const app = require("./config/express-config");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://submarine:submar1ne@ds139768.mlab.com:39768/heroku_rx8cqg30";
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://dbCaseyDean:Cdc108mng@cluster0-adjxe.mongodb.net/submarineDb?retryWrites=true&w=majority";

// connect to MongoDB
// moved database from mlag to cloud.mongodb.com. Had to create database in Cluster0 called submarine, and add collections users and subscriptions.

mongoose.connect(
    MONGODB_URI,
//   process.env.MONGODB_URI ||
    // "mongodb+srv://dbCaseyDean:Cdc108mng@cluster0-adjxe.mongodb.net/submarine?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("There is a problem with the connection" + err);
    } else {
      console.log("Mongoose connection is good.");
    }
  }
);

//server is up and running
app.listen(PORT);
