import mysql from "mysql2"
import { HOST, DB_NAME, DB_USER, DB_PASS } from './config.js'

const db = mysql.createConnection({
    host: HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});

export default db;
