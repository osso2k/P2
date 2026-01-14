import express from "express";
import dotenv from "dotenv";
import { connectDB, tasksTable, userTable, uuidGen } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import { protectedRoutees } from "./middleware/authMiddleware.js";
import taskRouter from "./routes/taskRoutes.js";

dotenv.config()

const app = express()
const PORT = process.env.APP_PORT || null

app.use(express.json())

await connectDB()
await uuidGen()

await userTable()
await tasksTable()

app.get("/", protectedRoutees, (req, res) => {
    res.json({ message: "Heelo" })
})
app.use("/api", userRouter)
app.use("/api", protectedRoutees, taskRouter)
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

