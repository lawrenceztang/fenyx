const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
var bodyParser = require('body-parser')

const users = [
  {
    id: 0,
    name: "William Wang",
    email: "william@uchicago.edu",
    password: "123456",
    classes: ["CMSC 15200", "CMSC 15400", "CMSC 22000","CMSC 30000"]
  }
];
const classes = [
  {
    id: 0,
    name: "CMSC 15200",
    professor: "Zach Barnes",
    users: [0]
  },
  {
    id: 1,
    name: "CMSC 22000",
    professor: "Blase Ur",
    users: [0]
  }
];

app.use(cors());
app.use(bodyParser.json())

app.use('/login', (req, res) => {
  console.log("Current users:" + users.map( x => [x.email, x.password]));
  console.log(req.body);
  users.push({email: req.body.email, password: req.body.password})
  res.send({
    token: 'test123'
  });
});

app.use('/class_display', (req, res) => {
  console.log(req.body);
  let target = classes.filter(x => (x.id == req.body.id))[0];
  console.log(target);
  let target_users = users.filter(x => (target.users.includes(x.id)));
  res.send({
    class_info: target,
    users: target_users
  })
});

app.use('/class_search',(req, res) => {
  console.log(req.body);
  res.send({
    classes: classes.filter(x => (x.name == req.body.search_input))
  })
});

app.use('/profile', (req, res) => {
  console.log(req.body);
  user = users.filter(x => (x.id == parseInt(req.body.id)))[0];
  if(user){
    res.send({
      id: user.id,
      name: user.name,
      email: user.email,
      classes: user.classes
    })
  }
  else{
    res.send({
      id: null,
      name: null,
      email: null,
      classes: null
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})