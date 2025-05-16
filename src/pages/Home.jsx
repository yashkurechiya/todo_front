import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import TodoItem from '../components/Todoitem';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {isAuthenticated} = useContext(Context);



  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(tasks);

    try {
      setLoading(true);

      const { data } = await axios.post(`${server}/task/new`, {
        title, description,
      },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setLoading(false);
      setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);

    }

  }
  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh(prev => !prev);

    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  const editTask = async (id) => {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");
    
    if (!newTitle || !newDescription) {
      toast.error("Both title and description are required");
      return;
    }
    
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {
          title: newTitle,
          description: newDescription,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      
      
      toast.success(data.message);
      setRefresh((prev) => !prev); // trigger re-fetching updated data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };



  useEffect(() => {
    axios.get(`${server}/task/my`, {
      withCredentials: true,
    })
      .then(res => {
        setTasks(res.data.tasks);
      })
      .catch(e => {
        toast.error(e.response?.data?.message || "Error fetching tasks.");
      });
  }, [refresh]); // <- Add 'refresh' to dependency array

  if (!isAuthenticated) return <Navigate to={'/login'} />


   return (
    <div className="min-h-screen w-full 	bg-slate-900 flex flex-col items-center px-4 py-10">
      {/* Form Section */}
      <form
        onSubmit={submitHandler}
        className="w-full max-w-xl bg-gray-800 p-6 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-semibold text-white text-center">Add New Task</h2>

        {/* Task Input */}
        <div>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description Input */}
        <div>
          <input
            type="text"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={loading}
            type="submit"
            className={`w-full p-3 rounded-md text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>

      {/* Task List Section */}
      <section className="w-full max-w-2xl mt-10 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TodoItem
              key={task._id}
              title={task.title}
              description={task.description}
              onEdit={() => editTask(task._id)}
              onDelete={() => deleteTask(task._id)}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center mt-4">No tasks available. Add one!</p>
        )}
      </section>
    </div>
  );
};

export default Home;