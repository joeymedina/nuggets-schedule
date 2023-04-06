import mysql from "mysql2"
import { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } from './config.js'

console.log(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT);
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    multipleStatements: true
});

export default db;
