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
    return new Promise((resolve, reject) => {
        var search_results = [];
        var sql = "SELECT * FROM users";
        return db.each(sql, (error, row) => {
            search_results.push(row);
        }, () => {resolve(search_results)});

    })
}

module.exports.addUser = addUser
module.exports.test = getUsers 
