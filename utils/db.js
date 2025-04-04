const mysql = require('mysql2')
const  mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
})
console.log('Status mysqlPool:', mysqlPool);


mysqlPool.getConnection((err, connection) => {
    if (err) {
      console.error('Connection failed:', err);
    } else {
      console.log('Connected to the database');
      connection.release(); // ปล่อย connection เมื่อเสร็จ
    }
  });
  
module.exports = { mysqlPool };
