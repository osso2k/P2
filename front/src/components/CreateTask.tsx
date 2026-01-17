import React, { useState } from "react"
import api from "../../api/axios.ts"
import toast from "react-hot-toast"

// interface TaskData {
//     title: string;
//     scheduledAt: string;
//     timer: number |null;
// }
const CreateTask = () => {
    const [task,setTask] = useState({title:"",scheduledAt:"",timer:0})
    const [loading, setLoading] = useState(false)


    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setTask({...task, [name]: name === "timer" ? Number(value) : value})
}
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (!task.title || !task.scheduledAt){
            return toast.error("Fill fields")
        }
        try {
            setLoading(true)
            await api.post("/api/task/createTask", task)
            setLoading(false)

            setTask({ title: "", scheduledAt: "", timer: 0 })
            toast.success("Task added!")
        } catch (error) {
            toast.error("Failed to create task")
            console.log((error as Error).message)
        }

    }
  return (
    <div className="flex flex-col mx-auto bg-linear-to-br mt-20 from-zinc-900 via-black to-zinc-900  shadow-lg shadow-zinc-700  max-h-full w-[60%] rounded-4xl py-10">
        <h1 className="text-4xl font-extrabold mx-auto p-4">Add your task</h1>
      <form className="flex h-[50%] mt-10 flex-col text-xl" action="" onSubmit={handleSubmit}>
        <div className="ml-8 my-3" >
            <label className="text-3xl font-semibold  ">Title:</label>
            <input className="text-black bg-white rounded-lg border text-lg h-12 pl-2 ml-28 " onChange={handlechange} type="text" name="title" value={task.title} />
        </div>
        <div className="ml-8 my-3" >
            <label className="text-3xl font-semibold  ">Scheduled At:</label>
            <input className="text-black bg-white text-lg h-12 pl-2 ml-3  p-3 rounded-lg border focus:ring-2 focus:ring-purple-500 " onChange={handlechange} type="datetime-local" name="scheduledAt" value={task.scheduledAt} />
        </div>    
        <div className="ml-8 my-3" >
            <label className="text-3xl font-semibold  ">Duration:</label>
            <input className="text-black bg-white rounded-lg border text-lg h-12 pl-2 ml-28 " placeholder="leave empty if not sure" onChange={handlechange} type="number" name="timer" value={task.timer} />
        </div>    
         <button className="px-4 py-2 bg-zinc-600 max-w-30 mx-auto rounded-lg hover:scale-110 cursor-pointer transition-all ease-in-out duration-700" disabled={loading}> {loading ? "Adding..." : "Add task"}</button>
      </form>
    </div>
  )
}

export default CreateTask
