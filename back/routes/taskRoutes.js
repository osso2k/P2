import { Router } from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskControllers.js'

const taskRouter = Router()

taskRouter.get('/tasks', getTasks)
taskRouter.post('/createTask', createTask)
taskRouter.patch('/updateTask/:id', updateTask)
taskRouter.delete('/deleteTask/:id', deleteTask)

export default taskRouter