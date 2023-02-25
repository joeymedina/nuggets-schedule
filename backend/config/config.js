import dotenv from 'dotenv';
dotenv.config();
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const HOST = process.env.NODE_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT