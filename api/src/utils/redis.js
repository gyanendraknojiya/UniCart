const { createClient } = require("redis");

const url = process.env.REDIS_URL;

const config = url ? { url } : {};

const redisClient = createClient(config);

redisClient.on("connect", function () {
  console.log("Redis connected!");
});

module.exports = { redisClient };
