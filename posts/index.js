const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send({status: 200, posts})
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {id, title};
    res.send({status: 201, id, title});
});

app.listen(4000, () => {
    console.log('server listening at port 4000');
})