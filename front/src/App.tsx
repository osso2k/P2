
// import api from '../api/axios.ts';

import CreateTask from "./components/CreateTask"
// import TasksList from "./components/TasksList"

// import Navbar from "./components/Navbar"
import { LuArchive } from "react-icons/lu";
import {motion} from 'motion/react'
import WeeklyTasks from "./components/WeeklyTasks";

const App = () => {
  
  return (
  <motion.div initial={{y:5, opacity:0}} animate={{opacity:1, y:0}} transition={{ease:'easeIn' , duration:0.8}} className="flex flex-col w-full">
    <div className="flex flex-wrap flex-col w-full">
      <div className="flex  mt-10 ml-[25%] ">
        <LuArchive className="text-3xl my-auto text-blue-400" />
        <h2 className="text-4xl italic pl-2 font-semibold font-serif">Schedly</h2>
      </div>
      <p className="ml-[26.5%] font-serif text-3xs text-zinc-600">Start working on your future one day at a time!</p>
    </div>
    <WeeklyTasks />
    <CreateTask />
  </motion.div>
  )
}

export default App
