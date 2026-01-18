
// import api from '../api/axios.ts';

// import CreateTask from "./components/createTask"
// import TasksList from "./components/TasksList"

// import Navbar from "./components/Navbar"
import { LuArchive } from "react-icons/lu";


const App = () => {
  
  return (
  <div className="flex min-h-screen w-full">
    <div className="flex flex-col w-full">
      <div className="flex  mt-24 ml-[25%] ">
        <LuArchive className="text-3xl my-auto text-blue-400" />
        <h2 className="text-4xl pl-2 font-semibold font-serif">Schedly</h2>
      </div>
      <p className="ml-[26.5%] font-serif text-3xs text-zinc-600">Start working on your future one day at a time!</p>
    </div>


  </div>
  )
}

export default App
