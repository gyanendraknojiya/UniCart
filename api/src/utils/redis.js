const { createClient } = require("redis");

const host = process.env.host || "127.0.0.1";
const port = process.env.PORT || "6379";

const redisClient = createClient(port, host);

redisClient.on("connect", function () {
  console.log("Redis connected!");
});

module.exports = { redisClient };
