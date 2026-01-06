import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


export const db=mysql.createConnection({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    user:process.env.DB_ROOT
})