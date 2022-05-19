const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');
const port = 3001;
var bodyParser = require('body-parser');
var courseLookup = require('./courseLookup.js');
var userLookup = require('./userLookup.js');

//database path
db_name = './courses.db';

const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'courses.db'");
});

const users = [
  {
    id: 1,
    name: "William Wang",
    email: "william@uchicago.edu",
    password: "123456",
    classes: ["CMSC 15200", "CMSC 15400", "CMSC 22000","CMSC 30000"]
  },
  {
    id: 2,
    name: "Oliver",
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
    users: [1]
  },
  {
    id: 1,
    name: "CMSC 15200",
    professor: "Bach Barnes",
    users: [1]
  },
  {
    id: 2,
    name: "CMSC 22000",
    professor: "Blase Ur",
    users: [1]
  }
];

app.use(cors());
app.use(bodyParser.json())

app.use('/login', (req, res) => {
  console.log("Current users:" + users.map( x => [x.email, x.password]));
  console.log(req.body);
  users.push({email: req.body.email, password: req.body.password})
  res.send({
    token: 'test123',
    id: 2
  });
});

app.use('/class_display', (req, res) => {
  console.log("Request Information: " + req.body.id);
  courseLookup.getClassDetails(db, req.body.id)
  .then((result) => {
    console.log("Express receives: " + JSON.stringify(result) );
      res.send({
      class_info: result,
      users: users
    })
  })
  // let target = classes.filter(x => (x.id == req.body.id))[0];
  // console.log(target);
  // let target_users = users.filter(x => (target.users.includes(x.id)));
  // res.send({
  //   class_info: target,
  //   users: target_users
  // })
});

/*course lookup route from home page and parses through array with 
following class info:
{
  id: row.index,
  class_title: row.title,
  class_num: row.num,
  instructors: row.fullNameInstructors,
  cross_listings: row.crossListings
}
*/
app.use('/class_search',(req, res) => {
  console.log(req.body);
  courseLookup.getSearchQuery(db, req.body.search_input)
  .then((result) =>{
    console.log(result);
    res.send({
    classes: result
    //classes.filter(x => (x.name == req.body.search_input))
    })
  });
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