const { createClient } = require("redis");

const url = process.env.REDIS_URL;

const redisClient = createClient(url ? { url } : {});

redisClient.on("connect", function () {
  console.log("Redis connected!");
});

module.exports = { redisClient };
