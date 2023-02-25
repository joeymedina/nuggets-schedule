import dotenv from 'dotenv';
dotenv.config();
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const HOST = process.env.NODE_HOST;
export const DB_NAME = process.env.MYSQLDATABASE;
export const DB_USER = process.env.MYSQLUSER;
export const DB_PASS = process.env.MYSQLPASSWORD;
export const PORT = process.env.PORT;
export const DB_HOST = process.env.MYSQLHOST;
export const DB_PORT = process.env.MYSQLPORT
