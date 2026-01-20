import  {useEffect, useState } from "react"
import api from "../../api/axios.ts"
import toast from "react-hot-toast";

interface Task {
  id: string | number;
  title: string;
  day: number;
  time: string;
  status: string;
  timer?: number;
}
const TasksList = () => {
  const [tasks,setTasks] = useState<Task[]>([])

  useEffect(()=>{
    const getTasks = async ()=>{
      const response = await api.get("/api/task/tasks")
      setTasks(response.data.tasks)
    }
    getTasks()
  },[tasks])
  const deleteTask = async (id: string | number) => {
    await api.delete(`/api/task/deleteTask/${id}`)
    toast.success("Task deleted!")
  }
  const date = new Date()
  const dayIndex = date.getDay()
  return (
    <div className="flex flex-col w-full mt-6">
      <h1 className="mx-auto font-serif text-xl font-semibold">--Today--</h1>
      <div className="grid grid-cols-3 w-full">
        {tasks.length > 0 ? (
          tasks.filter(task => task.day === dayIndex).length > 0 ? (
            tasks
              .filter(task => task.day === dayIndex)
              .map((task) => (
                <div key={task.id} className="flex flex-col px-1 py-2 border rounded-xl mx-auto ">
                  <h2 className="text-3xs font-semibold mx-auto">{task.title}</h2>
                  <div className="flex text-sm font-sans gap-1 mx-auto">
                    <p className="text-center font-extrabold">{(task.time).split(":")[0]}:{(task.time).split(":")[1]}</p>
                  </div>
                  <div className="flex mx-auto justify-between w-full">
                    <p className="mr-2">{task.timer}</p>
                    <p>{task.status}</p>
                  </div>
                  <button onClick={()=>deleteTask(task.id)} className="flex justify-end border rounded-lg py-1 px-4 mx-auto w-11 text-center border-red-300 bg-red-100 text-semibold  cursor-pointer">X</button>
                </div>
              ))
          ) : (
            <p className="w-full mx-auto">All clear!</p>
          )
        ) : (
           <p className="w-full mx-auto">All clear!</p>
        )}
      </div>      
    </div>
  )
}

export default TasksList
