const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// Load User Models
const User = require("../../models/Users");

// this is a test for http://localhost:5000/api/users/test
//@route GET api/users/test
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users.js working" }));

// @route GET api/users/register
// @desc Register users
// @access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url("req.body.email", {
        s: "200", // image size
        r: "pg", // rating
        d: "mm" // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login user / returing JWT token
// @access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email to prevent duplicates
  User.findOne({ email: email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ email: "email not found" });
    }

    //check password

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched for JWT token
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // create JWT payload

        //sign token JWT
        jwt.sign(payload, keys.secretorKey, { expiresIn: 3600 }, () => {
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token
            });
          };
        }); // 3600 = 1 hour
      } else {
        return res.status(400).json({ password: "password incorrect" });
      }
    });
  });
});

module.exports = router;
