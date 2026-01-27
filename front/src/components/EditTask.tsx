import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../api/axios.ts";
import { motion } from "motion/react"; 
interface Task {
  id: string | number;
  title: string;
  day: number;
  time: string;
  status: string;
  timer?: number | null;
}

interface EditTaskProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onCancel: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    day: task.day,
    time: task.time,
    timer: task.timer || null,
    status: task.status
  });
  const [isLoading, setIsLoading] = useState(false);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const statusOptions = ["incomplete", "in-progress", "completed"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "timer" || name === "day" 
        ? value === "" ? null : Number(value) 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      return toast.error("Task title cannot be empty");
    }

    if (formData.day === null || !formData.time) {
      return toast.error("Please select day and time");
    }

    setIsLoading(true);
    
    try {
      await api.patch(`/api/task/updateTask/${task.id}`, formData);
      
      const updatedTask: Task = {
        ...task,
        ...formData
      };

      onUpdate(updatedTask);
      toast.success("Task updated successfully!");
      
    } catch (error) {
      toast.error("Failed to update task");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: task.title,
      day: task.day,
      time: task.time,
      timer: task.timer || null,
      status: task.status
    });
    onCancel();
  };

  return (
    <motion.div initial={{y:2,opacity:0}} animate={{y:0,opacity:1}} transition={{ease:"easeIn",duration:0.6}} className="w-[80%] mx-auto">
      <div className=" rounded-xl  shadow-lg p-4 sm:p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaEdit className="text-amber-700" />
            <h3 className="text-lg font-semibold text-zinc-800">Edit Task</h3>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            disabled={isLoading}
          >
            <FaTimes size={14} />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="What needs to be done?"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Day
              </label>
              <select
                name="day"
                value={formData.day ?? ""}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                disabled={isLoading}
              >
                {days.map((day, index) => (
                  <option key={index} value={index}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Duration
              </label>
              <select
                name="timer"
                value={formData.timer ?? ""}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                disabled={isLoading}
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
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                disabled={isLoading}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-500 disabled:bg-zinc-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave size={12} />
                  Save Changes
                </>
              )}
            </button>
          
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditTask;