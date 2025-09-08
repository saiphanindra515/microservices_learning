const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const CommentsOfPosts = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send({status: 200, comments: CommentsOfPosts[req.params.id] || []});
});

app.post('/posts/:id/comments', async(req, res) => {
    console.log(req.body);
    const cid = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = CommentsOfPosts[req.params.id] || [];
    comments.push({id: cid, content});
    CommentsOfPosts[req.params.id] = comments;
   try{
      await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {postId: req.params.id, id: cid, content}
     })
   }catch(err){
    console.log(err);
   }

    res.send({status: 201, comments});
});

app.post('/events', (req, res) => {
    
})

app.listen(4001, () => {
    console.log('server listening at port 4001');
})