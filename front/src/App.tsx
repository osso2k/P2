
// import api from '../api/axios.ts';

import CreateTask from "./components/createTask"
import TasksList from "./components/TasksList"

// import Navbar from "./components/Navbar"



const App = () => {
  
  return (
   <div className="flex flex-col min-h-screen font-serif w-full">
    <CreateTask />
    <TasksList />
   </div>
  )
}

export default App
