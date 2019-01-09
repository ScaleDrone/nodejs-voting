
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;  

// const Scaledrone = require('scaledrone-node-push');
// const sd = new Scaledrone({
//   channelId: process.env.CHANNEL_ID,
//   secretKey: process.env.SECRET_KEY
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


app.post('/vote', (req, res) => {
    const { body } = req
    console.log(body)
    const reqArray = Object.values(body)
    const votedPlayer = reqArray.map(player => player.votingFor)
    res.json(votedPlayer)
//     const room = 'votes';
//     sd.publish(room, votedPlayer, error => {
//     // check for errors
//     if(error){
//         console.log(error)

//     }else res.json(votedPlayer)
    
// });


  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});