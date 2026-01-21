import { useEffect, useState } from "react"
import api from "../../api/axios.ts"
import toast from "react-hot-toast"
import { Trash2 } from "lucide-react"
import {motion} from 'motion/react'
interface Task {
  id: string
  title: string
  day: number
  time: string
  status: string
  timer?: number
}

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const WeeklyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await api.get("/api/task/tasks")
        setTasks(response.data.tasks)
      } catch (err) {
        toast.error("Failed to load tasks")
        console.log((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    getTasks()
  }, [tasks])

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/api/task/deleteTask/${id}`)

      setTasks(prev => prev.filter(task => task.id !== id))

      toast.success("Task deleted")
    } catch (err) {
      toast.error("Failed to delete task")
      console.log((err as Error).message)
    }
  }

  if (loading) {
    return (
      <p className="text-center mt-20 text-xl text-zinc-600">
        Loading schedule...
      </p>
    )
  }

  return (
    <div className="mx-auto mt-12 mb-4 w-[50%] rounded-2xl shadow-lg p-6">

      <h1 className="text-3xl font-bold text-center text-zinc-800 mb-6">
        Weekly Overview
      </h1>

      <div className="grid grid-cols-7 gap-3">

        {days.map((dayName, index) => (
          <div key={index} className=" rounded-xl p-3 shadow border">

            <h2 className="text-center font-semibold font-serif  mb-3 border-b  border-black">
              {dayName.slice(0,3)}
            </h2>

            <div className="flex flex-wrap  flex-col gap-2">

              {tasks
                .filter(task => task.day === index)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(task => (
                  <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                    key={task.id}
                    className=" rounded-lg p-2 text-sm shadow-sm flex justify-between items-center group"
                  >
                    <div>
                      <p className="font-semibold text-zinc-800">
                        {task.title}
                      </p>
                      <p className="text-xs text-zinc-600">
                        {new Date(`1970-01-01T${task.time}`).toLocaleTimeString([],{hour:'2-digit',minute:"2-digit"})}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 transition-all hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>

                  </motion.div>
                ))}

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default WeeklyTasks
