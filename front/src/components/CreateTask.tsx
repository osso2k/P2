import { useState } from "react";
import toast from "react-hot-toast";
import { GrFormAdd } from "react-icons/gr";
import api from "../../api/axios";
import TodaysTasks from "./TodaysTasks";

interface TaskData {
    title:string;
    day:number | null;
    time:string;
    timer:number | null;
}
const CreateTask = () => {
    const [task,setTask]= useState<TaskData>({title:"",day:null, time:"",timer:null})

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name,value} = e.target
        setTask({...task, [name]:name === "timer" || name === "day" ? value === "" ? null : Number(value) : value})
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(!task.title || task.day === null || !task.time){
            return toast.error("NOOOOO NAUGHTY BOI!")
        }
        try {
            await api.post("/api/task/createTask",task)
            toast.success("Task Added!")
            setTask({title:"",day:null,time:"",timer:null})
        } catch (error) {
            toast.error("Failed to Add Task.")
            console.log((error as Error).message)
        }

    }
  return (
    <div className="mt-8 mb-6 mx-auto w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] bg-orange-50 rounded-2xl border shadow-lg">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <GrFormAdd className="text-3xl sm:text-4xl lg:text-5xl text-blue-500 shrink-0" />
          <h2 className="text-xl sm:text-2xl text-zinc-900 font-semibold font-serif">
            Add New Task
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

            <div className="space-y-4">
              <div>
                <input 
                  value={task.title} 
                  onChange={handleChange} 
                  placeholder="What needs to be done?"  
                  type="text" 
                  name="title" 
                  className="w-full h-10 sm:h-12 px-4 rounded-lg bg-white text-black border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                />
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Day</label>
                  <select 
                    name="day" 
                    value={task.day ?? ""} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 text-sm text-zinc-500 rounded-lg bg-white border border-gray-200 cursor-pointer focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option className="" value="">Select day</option>
                    <option className="" value="0">Sunday</option>
                    <option className="" value="1">Monday</option>
                    <option className="" value="2">Tuesday</option>
                    <option className="" value="3">Wednesday</option>
                    <option className="" value="4">Thursday</option>
                    <option className="" value="5">Friday</option>
                    <option className="" value="6">Saturday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Time</label>
                  <input 
                    value={task.time} 
                    onChange={handleChange}  
                    type="time" 
                    name="time" 
                    className="w-full px-3 py-2 rounded-lg text-sm text-zinc-500 bg-white border border-gray-200 cursor-pointer focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>


              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Duration</label>
                <select 
                  name="timer" 
                  value={task.timer ?? ""} 
                  onChange={handleChange} 
                  className="w-full px-3 text-sm text-zinc-500 py-2 rounded-lg bg-white border border-gray-200 cursor-pointer focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">No duration</option>
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>


              <button 
                type="submit" 
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-stone-400 border border-black hover:bg-stone-600 text-white font-medium rounded-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Add Task
              </button>
            </div>


            <div className="lg:border-l lg:border-gray-200 lg:pl-8">
              <div className="mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl text-center font-semibold font-serif text-zinc-800">
                  BE EFFICIENT!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 font-mono text-center mt-1">
                  Always decompose into simpler tasks.
                </p>
              </div>
              <TodaysTasks />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask
