const p1 = 109;
const p2 = 198733;

function hash(s){
    hash_val = 0;
    for(var i = 0; i < s.length; i++){
        hash_val += s.charCodeAt(i);
        hash_val *= p1;
        hash_val %= p2;
    }
    return hash_val
}

function get_suffix(classes){
    to_ret = " "
    n = classes.length - 1
    for(var i = 0; i < n-1; i ++){
        to_ret += "sectionID = " + classes[i] +  " OR "  
    }
    to_ret += "sectionID = " + classes[n-1] ;
    return to_ret;
}

const addUser = (db, inputs) => {
    console.log(inputs);
    const query_string = 'INSERT INTO users(id, name, email, password, classes) VALUES(?,?,?,?,?)';
    const id = hash(inputs.email);
    const data = [id, inputs.name, inputs.email, inputs.password, ""];
    console.log(data);
    db.run(query_string, data, (err) => {
        if(err) {
            return console.log(err.message); 
        }
    })
}   

const addClasses = (db, inputs) => {
    console.log(inputs);
    const query_string = 'UPDATE users SET classes=classes || ? WHERE id=?';
    const data = [inputs.classes, inputs.id];
    console.log(data);
    db.run(query_string, data, (err) => {
        if(err) {
            return console.log(err.message); 
        }
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

const getClasses = (db, user) => { 
    const class_string = user.classes;
    const classes = class_string.split(",");
    console.log(classes);
    return new Promise((resolve, reject) => {
         var search_results = [];
         var sql = "SELECT * FROM courses WHERE" + get_suffix(classes);
         console.log(sql);
         return db.each(sql, (error, row) => {
              console.log(row)
              search_results.push(row);
         }, () => {resolve(search_results)});

    })


}

module.exports.addUser = addUser
module.exports.addClasses = addClasses
module.exports.getUsers = getUsers 
module.exports.getClasses = getClasses 
