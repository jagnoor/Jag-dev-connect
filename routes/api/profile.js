const express = require('express');
const router = express.Router();

// this is a test for http://localhost:5000/api/profile/test 
//@route GET api/profile/test
// @access Public
router.get('/test', (req, res) => res.json({ msg: "profile.js working" } ));

module.exports = router;