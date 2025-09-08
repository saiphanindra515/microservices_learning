const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send({status: 200, posts})
});

app.post('/posts', async(req, res) => {
    console.log('post req', req.body);
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {id, title};

    try{
        await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }})
    }catch(err){
        console.log(err);
    }
  
    res.send({status: 201, id, title});
});

app.post('/events', (req, res) => {
    console.log(req.body);
})

app.listen(4000, () => {
    console.log('server listening at port 4000');
})