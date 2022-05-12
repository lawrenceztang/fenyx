const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;


app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})