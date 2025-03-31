const mysql = require('mysql2')
const  mysqlPool = mysql.createPool({
    host: '54.151.250.200',
    user: 'admin_db',
    password: 'dbAdmin#12345',
    database: 'watermark_db',
    port: 3306,
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
