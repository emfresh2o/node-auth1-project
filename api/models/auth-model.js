const db = require("./data/db-config");

function findById(id) {
  return db("users").where({ id }).first();
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  } catch (err) {
    throw err;
  }
}
function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

module.exports = {
  findById,
  findBy,
  add,
};