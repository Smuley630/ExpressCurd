const mysql2= require('mysql2')

const pool = mysql2.createPool({

    host:'0.0.0.0',
    user:'root',
    password:'Smuley630@',
    database:'hr_db',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
    port:3306

})
module.exports=pool
