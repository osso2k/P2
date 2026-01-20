import { pool } from "../config/db.js"
// import OpenAI from "openai"
// import dotenv from 'dotenv'
// dotenv.config()
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })


export const getTasks = async (req, res) => {
    try {
        const userId = req.user.id
        if (userId) {
            const tasks = await pool.query(`SELECT * FROM tasks WHERE (user_id = $1) ORDER BY day,time ASC LIMIT 10;`, [userId])
            // const motivation = await openai.responses.create({
            //     model: "gpt-5-nano",
            //     input: `Generate a motivational quote regarding users tasks.1-Only one quote.2-CAnt be longer than a sentence.3-It makes the user think.4-just give me the quote no fluff,once again only quote,use this as a reference${tasks.rows[0].title}`,
            //     store: true
            // })
            res.status(202).json({ tasks: tasks.rows })
        }

    } catch (error) {
        res.json({ message: "ERR in fetching tasks", err: error.message })
    }
}
export const createTask = async (req, res) => {
    try {
        const { title, timer, day, time } = req.body

        if (!title || day === undefined || !time) {
            return res.json({ message: "Please Enter title and preferred date-time" })
        }

        const userId = req.user.id
        const task = await pool.query(`INSERT INTO tasks (user_id, title, day, time, timer) VALUES ($1,$2,$3,$4,$5) RETURNING id`, [userId, title, day, time, timer ?? null])

        res.status(202).json({ message: "Task created!", taskId: task.rows[0].id })
    } catch (error) {
        res.status(401).json({ message: "Err in creating task", err: error.message })
    }
}
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const userID = req.user.id
        const { title, timer, day, time, status } = req.body
        if (!id) {
            return res.json({ message: "Couldn't update task!" })
        }
        const task = await pool.query(`UPDATE tasks SET title=COALESCE($1,title),timer=COALESCE($2,timer), day=COALESCE($3,day),time=COALESCE($4,time), status=COALESCE($5,status) WHERE id = $6 AND user_id=$7 RETURNING id`, [title, timer, day, time, status, id, userID])

        if (task.rows.length === 0) {
            return res.json({ message: "Task not found" })
        }
        res.status(203).json({ message: "task updated!" })

    } catch (error) {
        res.json({ message: "Err in updating task", er: error.message })
    }
}
export const deleteTask = async (req, res) => {

}