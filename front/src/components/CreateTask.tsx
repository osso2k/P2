import { GrFormAdd } from "react-icons/gr";

const createTask = () => {
  return (
    <div className="mt-10 w-[50%] mx-auto h-[50%] bg-amber-50 rounded-2xl">
      <div className="flex flex-col gap-2">
        <div className="flex mt-10 ml-5">
            <GrFormAdd className="text-5xl my-auto text-blue-500" />
            <h2 className="my-auto text-xl text-zinc-900">Add New Task</h2>
        </div>
        <div className="flex flex-col gap-2 ml-6 mt-15  ">
            <div>
                <label className="my-auto text-amber-900 text-2xl pr-2">Title: </label><input type="text" name="title" className="focus:border-red-500 h-10 my-auto  w-[35%] rounded-lg  bg-white text-black pl-2" />
            </div>
            <div>
                <label className="my-auto text-amber-900 text-2xl pr-2">Date: </label><input type="date" placeholder="Date" name="date" className="focus:border-red-500 h-10 my-auto  w-[35%] rounded-lg  bg-white text-black pl-2" />
            </div>
            <div>
                <label className="my-auto text-amber-900 text-2xl pr-2">time: </label><input type="time" name="time" className="focus:border-red-500 h-10 my-auto  w-[35%] rounded-lg  bg-white text-black pl-2" />
            </div>
            <div>
                <label className="my-auto text-amber-900 text-2xl pr-2">duration: </label><input type="number" name="duration" className="focus:border-red-500 h-10 my-auto  w-[35%] rounded-lg  bg-white text-black pl-2" />
            </div>

        </div>

      </div>
    </div>
  )
}

export default createTask
