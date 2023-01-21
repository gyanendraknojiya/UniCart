require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/index");
const { redisClient } = require("./src/utils/redis");

const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/api", router);

redisClient.connect();

const Port = process.env.PORT || 5000;

const mongodbConnectionUrl = process.env.MONGO_DB_URL + "/" + process.env.DB_NAME;

mongoose.connect(mongodbConnectionUrl).then(() => app.listen(Port, () => console.log(`server is running at ${Port}`)));
