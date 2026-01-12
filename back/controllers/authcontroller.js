import { pool } from "../config/db.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../middleware/authMiddleware.js";

export const getUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all required fields!" })
        }

        const user = await pool.query(`SELECT * FROM users WHERE email= $1`, [email, password])
        const isValid = await bcrypt.compare(password, user.rows[0].hashed_password)
        if (isValid) {
            res.status(200).json(user)
        } else {
            res.json({ message: "Wrong info" })
        }
    } catch (error) {
        res.status(500).json({ message: "Err in getting user details.", err: error.message })
    }
}
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please enter all required fields!" })
        }
        const salt = await bcrypt.genSalt(7)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await pool.query(`INSERT INTO users (username,email,password) VALUES ($1, $2, $3)`, [username, email, hashedPassword])

        const token = await generateToken(user.rows[0].id)
        res.status(202).json({ message: "User created " }, user, token)
    } catch (error) {
        res.json({ message: "Err in signing up.", err: error.message })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all required fields!" })
        }

        const user = await pool.query(`SELECT * FROM users WHERE email= $1 `, [email, password])
        const isValid = await bcrypt.compare(password, user.rows[0].hashed_password)

        if (isValid) {
            res.status(200).json(user)
        } else {
            res.json({ message: "Wrong info" })
        }
        const token = await generateToken(user.rows[0].id)
        res.status(202).json({ message: "Logged in" }, token, user)

    } catch (error) {
        res.json({ message: "Err in logging in. ", err: error.message })
    }
}