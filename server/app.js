const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");

const port = process.env.PORT || 3000;

if (process.env.DATA_TESTING == "test") {
  mongoose.connect(
    process.env.URL_MONGO_LOCAL_TEST,
    { useNewUrlParser: true }
  );
} else {
  // mongoose.connect(
  //   process.env.URL_MONGO_LOCAL,
  //   { useNewUrlParser: true }
  // );
  mongoose.connect(
    process.env.URL_MONGO_MLAB,
    { useNewUrlParser: true }
  );
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("mongo connected");
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log("listening on port ", port);
});

module.exports = app;
