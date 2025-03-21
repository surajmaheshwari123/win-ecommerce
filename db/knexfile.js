require("dotenv").config({ path: ".env" });
const { DB_NAME, DB_USER, DB_HOST, DB_PASS, DB_DRIVER, DB_PORT, DB_TIMEZONE, DB_SOCKET } =
  process.env;

module.exports = {
development: {
    client: DB_DRIVER,
    connection: {
      ...(DB_SOCKET ? { socketPath: DB_SOCKET } : { host: DB_HOST, port: DB_PORT }),
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      charset: "utf8mb4",
    },
    pool: {
      max: 100,
      min: 0,
    },
    migrations: {
      directory: "./migrations",
      tableName: "migrations",
    },
  },
   
};
