import express from "express";
import dotenv from "dotenv";
import { connectDB, userTable, uuidGen } from "./config/db.js";

dotenv.config()

const app = express()
const PORT = process.env.APP_PORT || null

app.use(express.json())

await connectDB()
await uuidGen()
await userTable()

app.get("/", (req, res) => {
    res.json({ message: "Heelo" })
})

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

