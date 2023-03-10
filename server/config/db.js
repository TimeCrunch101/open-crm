const mysql2 = require('mysql2')

const DB = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB_NAME,
  port: 3306,
  ssl: {
    rejectUnauthorized: false,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {
  DB
}