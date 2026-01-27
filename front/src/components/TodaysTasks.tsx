import  {useEffect, useState } from "react"
import api from "../../api/axios.ts"
import toast from "react-hot-toast";
import {FaTrash} from "react-icons/fa"
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

    useEffect(() => {
      const getTasks = async () => {
        const dayIndex = new Date().getDay();
        const response = await api.get("/api/task/todaysTasks", { params: { dayIndex } });
        setTasks(response.data.tasks);
      };
      getTasks();
    }, [tasks]);
  const deleteTask = async (id: string | number) => {
    await api.delete(`/api/task/deleteTask/${id}`)
    toast.success("Task deleted!")
  }

  return (
    <div className="grid grid-cols-2">
      {tasks.length > 0 ? (
        tasks.map((task) => (
            <div key={task.id} className="flex-col max-w-[80%] border rounded-lg mb-1">
                <h2 className="text-left text-sm font-bold font-serif pb-2 px-3 mt-1 ">{task.title}</h2>  
                <div className="flex flex-wrap my-1 mx-2">
                  <p className="text-xs font-medium font-sans mx-auto">{task.time}</p>
                  <p className="text-xs font-medium font-sans mx-auto">{task.status}</p>
                  <FaTrash className="hover:text-red-600 hover:scale-115 transition-all ease-in-out duration-500 cursor-pointer w-4 h-4 mx-auto" onClick={()=>deleteTask(task.id)} />
              </div>
            </div>
          ))
      ) : (
        <p className="w-full mx-auto">All clear!</p>
      )}
    </div>
  )
}

export default TasksList
