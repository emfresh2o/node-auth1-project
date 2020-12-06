const express = require("express");
const hashCrypt = require("bcryptjs");

const router = express.Router();

const Auth = require("../models/auth-model");

router.post("/register", async (req, res) => {
  const user = req.body;

  const passwordWithHash = hashCrypt.hashSync(user.password, 8);
  user.password = passwordWithHash;

  try {
    const inserted = await Auth.add(user);
    res.status(201).json(inserted);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error adding new user", error: err });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    let user = await Auth.findBy({ username }).first();
    console.log(user);
    if (user && hashCrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: "Sorry, Thou shall not pass!" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error adding new user", error: err });
  }
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({ message: "Error logging out", error: err });
      } else {
        res.json({ message: "Logged out Successful" });
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;