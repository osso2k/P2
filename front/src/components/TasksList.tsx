import { useEffect, useState } from "react"
import api from "../../api/axios.ts"
import toast from "react-hot-toast"


interface Task {
    title: string
    status: string
    scheduled_at: string
    timer: string
}

const TasksList = () => {
    const [tasks,setTasks] = useState<Task[]>([])

    useEffect(()=>{
        const getTasks = async ()=>{
                try {
                    const task = await api.get("/api/task/tasks")
                    setTasks(task.data)
                } catch (error) {
                    console.log((error as Error).message)
                    toast.error("Failed to load tasks")
                }
            }
        getTasks()
    },[])

  return (
    <div className="h-screen pt-12">
      <div className="flex flex-col text-black bg-pink-50 h-[80%] w-[70%] mx-auto rounded-2xl">
        <h1 className="mx-auto text-2xl mt-4">Current</h1>
        <div className="flex flex-col mx-auto">
        {tasks.map((task,idx)=>(
            
            <div className="" key={idx}>
                <h2 className="text-2xl">Title: {task.title}</h2>
                <p className="text-xl">Status: {task.status}</p>
                <p>Scheduled For: {new Date(task.scheduled_at).toLocaleString("en-US", {weekday: "short",hour: "numeric",minute: "2-digit",hour12: true}).replace(",", "")}</p>
                <p>Timer: {task.timer|| 0}</p>
            </div>
        ))}</div>
      </div>
    </div>
  )
}

export default TasksList
