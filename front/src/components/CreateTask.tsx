import { useState } from "react";
import toast from "react-hot-toast";
import { GrFormAdd } from "react-icons/gr";
import api from "../../api/axios";

interface TaskData {
    title:string;
    day:number | undefined;
    time:string;
    timer:number | null;
}
const CreateTask = () => {
    const [task,setTask]= useState<TaskData>({title:"",day:undefined, time:"",timer:null})

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name,value} = e.target
        setTask({...task,[name]:name==="timer"? Number(value):value})
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(!task.title || task.day === undefined || !task.time){
            return toast.error("NOOOOO NAUGHTY BOI!")
        }
        try {
            await api.post("/api/task/createTask",task)
            toast.success("Task Added!")
            setTask({title:"",day:undefined,time:"",timer:null})
        } catch (error) {
            toast.error("Failed to Add Task.")
            console.log((error as Error).message)
        }

    }
  return (
    <div className="flex flex-wrap mt-10 w-[50%] mx-auto h-[50%] bg-orange-50 rounded-2xl border">
      <div className="grid grid-cols-[4fr_2fr] h-full w-full">
        <div className="order-1 flex flex-col gap-2 w-full">
        <div className="flex mt-10 ml-5">
            <GrFormAdd className="text-5xl my-auto text-blue-500" />
            <h2 className="my-auto text-2xl text-zinc-900 font-semibold border-b border-r pr-1 pb-1 shadow-[3px_6px_12px_rgba(0,0,0,0.09)] ">Add New Task</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 ml-6 mt-15  w-full">
            <div className="flex w-full ">
                <input value={task.title} onChange={handleChange} placeholder="What needs to be done?"  type="text" name="title" className="focus:border-red-500 h-10 my-auto  w-[70%] rounded-lg  bg-white text-black pl-2" />
            </div>
            <div className="flex w-full mt-2">
                <label className="my-auto text-amber-900 text-2xl pr-2">Day: </label>
                <select name="day" value={task.day ?? ""} onChange={handleChange} className="bg-white pl-1 py-2 rounded my-auto cursor-pointer border">
                    <option value="0">Monday</option>
                    <option value="1">Tuesday</option>
                    <option value="2">Wednesday</option>
                    <option value="3">Thursday</option>
                    <option value="4">Friday</option>
                    <option value="5">Saturday</option>
                    <option value="6">Sunday</option>
                </select>
                <label className=" text-amber-900 text-2xl mx-2 my-auto">time: </label><input value={task.time} onChange={handleChange}  type="time" name="time" className="bg-white border rounded-xl px-4 py-2 shadow-sm cursor-pointer w-20" />
            </div>
            <div className="flex w-full">
                <label className="my-auto text-amber-900 text-2xl pr-2">duration: </label>
                <select name="timer" value={task.timer ?? ""} onChange={handleChange} className="bg-white border rounded-xl px-4 py-2 shadow-sm cursor-pointer">
                    <option value="">-</option>
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                </select>
            </div>

        </div>
        <button type="submit" className="px-4 py-2 bg-yellow-50 border flex mx-[25%] mt-2 cursor-pointer text-2xl rounded-xl">Add</button>
        </form>

      </div>
        <div className="order-2 flex flex-col mt-10 text-black border-l mb-3">
            <h3 className=" text-center text-2xl font-semibold font-serif">BE EFFICIENT!</h3>
            <p className="text-xs text-zinc-600 font-mono text-center">Always decompose into simpler tasks.</p>
            <p>{task.title}</p>
            <p>{task.day}</p>
            <p>{task.time}</p>
            <p>{task.timer}</p>
        </div>
      </div>
    </div>
  )
}

export default CreateTask
