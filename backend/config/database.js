import mysql from "mysql2"
import data from './config.json' assert { type: 'json'};

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: data.password,
    database: 'NuggetsSchedule'
});

export default db;
