import  {useEffect, useState } from "react"
import api from "../../api/axios.ts"

interface Task {
  title:string;
  day:number;
  time:string;
  status:string;
  timer?:number
}
const TasksList = () => {
  const [tasks,setTasks] = useState<Task[]>([])
  const [quote,setQuote]= useState<string>("")
  useEffect(()=>{
    const getTasks = async ()=>{
      const response = await api.get("/api/task/tasks")
      setTasks(response.data.tasks)
      setQuote(response.data.quote)
    }
    getTasks()
  },[])
  const date = new Date()
  const dayIndex = date.getDay()
  return (
    <div className="flex flex-col w-full mt-6">
      <h1 className="mx-auto font-serif text-xl font-semibold">--Today--</h1>
      <div className="grid grid-cols-3">
        {tasks.length > 0 ? (
          tasks.filter(task => task.day === dayIndex).length > 0 ? (
            tasks
              .filter(task => task.day === dayIndex)
              .map((task, idx) => (
                <div key={idx} className="flex flex-col px-5 py-4 border rounded-xl mx-auto ">
                  <h2 className="text-3xs font-semibold mx-auto">{task.title}</h2>
                  <div className="flex text-sm font-sans gap-1 mx-auto">
                    <p className="text-center font-extrabold">{(task.time).split(":")[0]}:{(task.time).split(":")[1]}</p>
                  </div>
                  <div className="flex mx-auto justify-between w-full">
                    <p className="mr-2">{task.timer}</p>
                    <p>{task.status}</p>
                  </div>
                </div>
              ))
          ) : (
            <p className="w-full max-auto">All clear!</p>
          )
        ) : (
           <p className="w-full max-auto">All clear!</p>
        )}
      </div>
      <div className="flex mt-4 mx-20">
        <p className="text-xs  mx-auto text-center font-semibold">{quote}</p>
      </div>
      
    </div>
  )
}

export default TasksList
