const Redis = require("ioredis").default;

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

// Event listener for Redis connection | what is does ?
// This code sets up an event listener for the "connect" event on the Redis client.
// When the Redis client successfully connects to the Redis server, it will log a message to the console indicating that the connection was successful.
// This is useful for debugging and confirming that your application is properly connected to the Redis server.
redis.on("connect", () => {
  console.log("server is connected to Redis ✅");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = redis;
