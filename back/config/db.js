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
        hashed_password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        );`)
        console.log("user Table exists!")
    } catch (error) {
        console.log("ERR in creating user table", error.message)
    }
}

export const tasksTable = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS tasks (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            scheduled_at TIMESTAMP,
            timer INTEGER,
            status TEXT NOT NULL DEFAULT 'incomplete',
            created_at TIMESTAMP DEFAULT NOW()
            )`)
        console.log("tasks table exists!")
    } catch (error) {
        console.log("ERR in creating task table", error.message)
    }
}
