import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config()

export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

export const connectDB = async () => {
    try {
        await pool.query(`SELECT 1;`)
        console.log("DB Connected!")
    } catch (error) {
        console.log("Err in connectDB", error.message)
    }

}

export const uuidGen = async () => {
    try {
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`)
    } catch (error) {
        console.log(error.message)
    }
}

export const userTable = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        );`)
        console.log("user Table exists!")
    } catch (error) {
        console.log("ERR in creating user table", error.message)
    }
}
