const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send({status: 200, posts});
})
app.post('/events', (req, res) => {
    const { type, data} = req.body;

    if (type === 'PostCreated'){
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }

    if (type === 'CommentCreated'){
        const {postId,  id, content } = data;
        posts[postId]?.comments.push({id, content});
    }

    console.log(posts)
    res.send({});
})


app.listen(4002, () => {
    console.log('server listening at port 4002');
})