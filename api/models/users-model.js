const db = require("./data/db-config");

function find() {
  return db("users").orderBy("id");
}

module.exports = {
  find,
};