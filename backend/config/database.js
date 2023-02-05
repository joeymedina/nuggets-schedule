import mysql from "mysql2"
const data = require('./config.json');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: data.password,
    database: 'NuggetsSchedule'
});

export default db;
