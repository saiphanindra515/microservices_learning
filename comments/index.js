const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const comments = {};

app.get('/post/:id/comments', (req, res) => {
    res.send({status: 200, comments: comments[req.params.id] || []});
});

app.post('/post/:id/comment', (req, res) => {
    const cid = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = posts[id] || [];
    comments.push({id: cid, content})
    res.send({status: 201, comments});
});

app.listen(4000, () => {
    console.log('server listening at port 4000');
})