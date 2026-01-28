import api from "../../api/axios";
import {useState, useEffect} from "react"
import { motion } from "motion/react"; 
import { FaEdit } from "react-icons/fa";
import EditTask from "./EditTask";
import {FaTrash} from "react-icons/fa"
import toast from "react-hot-toast";
interface Task {
  id: string | number;
  title: string;
  day: number;
  time: string;
  status: string;
  timer?: number | null;
}
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const WeeklyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const dayIndex = new Date().getDay()
  const [day,setDay] = useState<number>(dayIndex)
  
  useEffect(()=>{
    const getTasks = async ()=>{
      const response = await api.get("/api/task/tasks")
      setTasks(response.data.tasks)
    }
    getTasks()
  },[tasks])

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setDay(Number(e.target.value))
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(prev => prev?.id === task.id ? null : task)
  }
  

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
    setEditingTask(null)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }
  const deleteTask = async (id: string | number) => {
    await api.delete(`/api/task/deleteTask/${id}`)
    toast.success("Task deleted!")
  }
 
  return (
   <div className="flex flex-col mt-8 mx-auto max-h-full w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] shadow">
      <h1 className="font-serif font-semibold text-xl sm:text-2xl md:text-3xl italic text-center mx-auto">Weekly Overview</h1>
      <div className="flex mt-2">
      <h2 className="font-bold text-lg md:text-2xl font-serif mr-2">{days[day]}</h2>
      <select onChange={handleChange} name="day" className="pl-1 border bg-white">
        <option value={dayIndex}>Today</option>
        <option value="0">Sun</option>
        <option value="1">Mon</option>
        <option value="2">Tue</option>
        <option value="3">Wed</option>
        <option value="4">Thu</option>
        <option value="5">Fri</option>
        <option value="6">Sat</option>
      </select>
    </div>
    <div className="">
    <div className="grid max-w-full gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 mt-4 mb-2">
      {tasks.filter(task => task.day === day).map((task)=>(
        <motion.div initial={{y:2 , opacity:0}} animate={{y:0 , opacity:1}} transition={{duration:1, ease:"easeIn"}} className="flex flex-wrap flex-col shadow-lg pl-2 rounded-lg border min-w-full" key={task.id}>
          <h2 className="w-full mt-2 wrap-break-word font-serif text-[16px] sm:text-[18px] md:text-xl font-semibold">{task.title}</h2>
          <div className="flex flex-wrap mt-5 max-w-full"><p className="font-semibold font-sans">{task.time.split(":")[0]}:{task.time.split(":")[1]}</p></div>
          <div className="flex flex-wrap max-w-full "><p className="text-xs sm:text-[13px] md:text-[15px] font-semibold text-amber-900">status: </p><p className="font-semibold font-serif text-xs sm:text-[13px] md:text-[15px]">{task.status}</p></div>
          <div className="flex flex-wrap max-w-full mb-3"><p className="text-xs sm:text-[13px] md:text-[15px] font-semibold text-amber-900">duration: </p><p className="font-semibold font-sans text-xs sm:text-[13px] md:text-[15px]">{task.timer || "-"}</p><FaEdit onClick={()=>handleEditTask(task)} className="ml-auto cursor-pointer text-xl text-amber-800 hover:text-amber-600 transition-colors" title="Edit this task" /><FaTrash onClick={()=>deleteTask(task.id)} className="text-zinc-700 hover:text-zinc-500 py-1 text-2xl"/></div>
          
        </motion.div>
      ))}
    </div>
    {editingTask && (
      <div className="mt-4">
        <EditTask 
          task={editingTask}
          onUpdate={handleUpdateTask}
          onCancel={handleCancelEdit}
        />
      </div>
    )}
    </div>
   </div>
  )
}

export default WeeklyTasks
