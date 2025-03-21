require("dotenv").config({ path: ".env" });
const { development } = require("./knexfile");
// const { performance } = require('perf_hooks')
const db = require("knex")(
  development
);


module.exports = db;
