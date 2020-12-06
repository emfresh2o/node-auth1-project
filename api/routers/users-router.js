const router = require("express");

const router = require.Router();

const Users = require('./users/users-model.js.js');

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Error fetching user data" });
    });
});

module.exports = router;