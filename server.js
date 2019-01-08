
const express = require('express');
const bodyParser = require('body-parser');
const Scaledrone = require('scaledrone-node-push');
const app = express();
const port = process.env.PORT || 4000;

const sd = new Scaledrone({
  channelId: 'vIh5lXOnewFxNIeC',
  secretKey: 'ShhBsVrNCxAFkM5GMT3PgepRlulvbRsd'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res) => {
  res.send(req.body)

});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});