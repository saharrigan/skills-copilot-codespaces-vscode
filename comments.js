//Create web server
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

//Set up the database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('comments.json');
const db = low(adapter);

//Set up the database
db.defaults({ comments: [] }).write();

//Get the comments from the database
app.get('/comments', (req, res) => {
    const comments = db.get('comments').value();
    res.send(comments);
});

//Post a comment to the database
app.post('/comments', (req, res) => {
    const comment = req.body;
    db.get('comments').push(comment).write();
    res.send(comment);
});

//Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});