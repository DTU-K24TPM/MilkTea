var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "beto12345",
    database: "estore"  
  });
module.exports = con