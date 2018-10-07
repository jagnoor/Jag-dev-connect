const express = require('express');
const router = express.Router();


// this is a test for http://localhost:5000/api/posts/test 
//@route GET api/posts/test
// @access Public
router.get('/test', (req, res) => res.json({ msg: "posts.js working" } ));

module.exports = router;