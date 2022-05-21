const addUser = (db, inputs) => {
    console.log(inputs);
    const query_string = 'INSERT INTO users(id, name, email, password, classes) VALUES(?,?,?,?,?)';
    const data = [Date.now(), inputs.name, inputs.email, inputs.password, ""];
    console.log(data);
    db.run(query_string, data, (err) => {
        if(err) {
            return console.log(err.message); 
        }
        console.log('Row was added to the table: ${this.lastID}');
    })
}   

const getUsers = (db) => {
    const query_string = "SELECT * FROM users";
    db.run(query_string, (err, row) => {
        if(err) {
            return console.log(err.message); 
        }
        console.log(row);
    })
	return(
			  [
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
			]
		)
}

module.exports.getUsers = getUsers
module.exports.addUser = addUser
