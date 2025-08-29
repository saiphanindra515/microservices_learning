const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send({status: 200, posts})
});

app.post('/posts', (req, res) => {
    console.log('post req', req.body);
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {id, title};
    res.send({status: 201, id, title});
});

app.listen(4000, () => {
    console.log('server listening at port 4000');
})