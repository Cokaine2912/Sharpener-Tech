const mysql = require("mysql2")

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'node-complete',
    password : "Sql2835@"
})

module.exports = pool.promise();