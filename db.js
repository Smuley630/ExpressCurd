const mysql2= require('mysql2')

const pool = mysql2.createPool({

    host: 'localhost',
    user:'root',
    password:'Smuley630@',
    database:'hr_db',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
    port:3306, ssl: {
        rejectUnauthorized: false, // Disable SSL certificate validation
      },

})
module.exports=pool
