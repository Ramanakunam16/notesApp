/*
logger.info("hello world");
const http = require("http");*/

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const notesRourter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const config = require("./utils/config");

const url = config.MONGODB_URL;

mongoose.set("strictQuery", false);

logger.info("connecting to", url);
mongoose
  .connect(url)
  .then(() => {
    logger.info("connected to", url);
  })
  .catch((err) => {
    logger.info("error connecting to mongoDB", err);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRourter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(notes));
// });
module.exports = app;
