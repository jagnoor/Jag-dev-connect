const express = require('express');
const router = express.Router();

// this is a test for http://localhost:5000/api/users/test 
//@route GET api/users/test
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Users.js working" } ));

module.exports = router;



