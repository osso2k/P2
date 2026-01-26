import api from "../../api/axios";
import {useState, useEffect} from "react"
import { motion } from "motion/react"; 
interface Task {
  id: string | number;
  title: string;
  day: number;
  time: string;
  status: string;
  timer?: number;
}
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const WeeklyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])

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
  return (
   <div className="flex flex-col mt-8 mx-auto max-h-full w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] shadow">
    <div className="mx-auto">
      <h1 className="font-serif font-semibold text-2xl text-center">Weekly Overview</h1>
      <div className="flex mt-2">
      <h2 className="font-bold text-lg md:text-2xl font-serif mr-2">{days[day]}</h2>
      <select onChange={handleChange} name="day" className="pl-2 border bg-white">
        <option value={dayIndex}>-</option>
        <option value="0">Sun</option>
        <option value="1">Mon</option>
        <option value="2">Tue</option>
        <option value="3">Wed</option>
        <option value="4">Thu</option>
        <option value="5">Fri</option>
        <option value="6">Sat</option>
      </select>
    </div>
    <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 w-full mt-4 mb-2">
      {tasks.filter(task => task.day === day).map((task)=>(
        <motion.div initial={{y:2 , opacity:0}} animate={{y:0 , opacity:1}} transition={{duration:1, ease:"easeIn"}} className="flex flex-wrap flex-col shadow-lg pl-2 rounded-lg border min-w-fit " key={task.id}>
          <h2 className="mt-2 w-full font-serif text-[16px] sm:text-[18px] md:text-xl font-semibold">{task.title}</h2>
          <div className="flex flex-wrap mt-2 w-full"><p className="font-semibold font-sans mt-3">{task.time.split(":")[0]}:{task.time.split(":")[1]}</p></div>
          <div className="flex flex-wrap w-full "><p className="text-xs sm:text-[13px] md:text-[15px] font-semibold text-amber-900">status: </p><p className="font-semibold font-serif text-xs sm:text-[13px] md:text-[15px]">{task.status}</p></div>
          <div className="flex flex-wrap w-full mb-3"><p className="text-xs sm:text-[13px] md:text-[15px] font-semibold text-amber-900">duration: </p><p className="font-semibold font-sans text-xs sm:text-[13px] md:text-[15px]">{task.timer || "-"}</p></div>
        </motion.div>
      ))}
    </div>
    </div>
   </div>
  )
}

export default WeeklyTasks