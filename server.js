const express = require('express');
const mongoose = require('mongoose');

// point url's to files in routes/api 
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

// DB Config for Mongoose 

const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db) // connects the const db 
.then(() => console.log('MongoDB is connected') // if connected based on username /password in keys.js console log
).catch(err => console.log('err')); // if there is a error display err message 

app.get("/", (req,res) => res.send('Hello!!'));

//use routes 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on localhost:${port}`));




