/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formdata, setFormdata] = useState({});

  function changeValue(e) {
    let tm = formdata;
    let k = e.currentTarget.name;
    let v = e.target.value;
    tm[k] = v;
    setFormdata(tm);
    // console.log();
  }

  // async function editTask(arr) {
  //   // let tm = arr;
  //   // tm.editing = true;
  //   setFormdata({ ...arr, editing: true });
  //   console.log(formdata);
  // }
  async function handleSubmit(e) {
    e.preventDefault();
    let tm = formdata.date_time;
    let diff = Date.now() - new Date(tm);
    console.log(tm);
    if (diff > 0) alert("Cannot do a task in the past please set future time.");
    else {
      const response = await axios.post(
        "https://to-do-list-1t7m.onrender.com/addTask",
        formdata
      );
      // console.log(response);
      alert(response.data);
      getData();
    }
  }

  async function getData() {
    const response = await axios.get(
      "https://to-do-list-1t7m.onrender.com/getTasks"
    );
    setTasks(response.data);
  }

  async function deleteTask(id) {
    const response = await axios.delete(
      `https://to-do-list-1t7m.onrender.com/removeTask/${id}`
    );
    // console.log(response);
    alert(response.data.message);
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container min-h-dvh min-w-full w-full bg-gradient-to-tr from-cyan-200 to-lime-200'>
      <nav className='w-full py-4 px-2 flex flex-wrap items-center gap-4 justify-center lg:justify-between font-medium border-b-2 border-gray-500 bg-emerald-200'>
        <h1 className='text-3xl text-rose-500'>PLAN_IT</h1>
        <form
          action=''
          className='flex flex-wrap gap-4 px-8 justify-center'
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type='text'
            placeholder='Task Title....'
            className=' text-center p-2 outline-orange-300 rounded-lg border-2 border-gray-300'
            name='title'
            // value={formdata.title}
            onChange={(e) => changeValue(e)}
            required
          />
          <input
            type='text'
            onChange={(e) => changeValue(e)}
            required
            name='message'
            id=''
            // value={formdata.message}
            placeholder='Task detail...'
            className=' text-center p-2 outline-orange-300 rounded-lg border-2 border-gray-300'
          />
          <input
            type='email'
            placeholder='Email....'
            className=' text-center p-2 outline-orange-300 rounded-lg border-2 border-gray-300'
            name='email'
            // value={formdata.email}
            required
            onChange={(e) => changeValue(e)}
          />
          <input
            type='datetime-local'
            required
            name='date_time'
            id=''
            // value={formdata.date_time}
            className=' text-center p-2 outline-orange-300 rounded-lg border-2 border-gray-300'
            onChange={(e) => changeValue(e)}
          />

          <button className='border-2 border-sky-700 px-2 text-sky-700 rounded-lg shadow-md bg-gradient-to-r from-orange-300 to-fuchsia-400 shadow-fuchsia-900 hover:shadow-none hover:from-fuchsia-400 hover:to-emerald-400 hover:text-white '>
            Add Task
          </button>
        </form>
      </nav>
      <div className='p-10 flex flex-col gap-6'>
        {tasks.length ? (
          tasks.map((ele, idx) => {
            return (
              <div
                key={idx}
                className=' grid-cols-2 gap-3 md:gap-0
               md:grid-cols-5 grid items-center text-center rounded-lg shadow-md font-medium text-xl text-gray-500 border-2 px-2 py-4 border-gray-400'
              >
                <h2 className='text-indigo-600'>{ele.title}</h2>
                <h3 className='text-orange-500 md:col-span-2'>{ele.message}</h3>
                <h3
                  className={`${
                    ele.status === "pending"
                      ? "text-rose-500"
                      : "text-green-500"
                  }`}
                >
                  {ele.status}
                </h3>

                <button
                  className='text-rose-400 text-2xl hover:text-rose-600 mx-auto'
                  onClick={() => deleteTask(ele._id)}
                >
                  <FaTrash />
                </button>
                {/* <button
                  className='text-cyan-400 text-2xl mx-auto hover:text-cyan-600'
                  // onClick={() => editTask(ele)}
                >
                  <MdEditSquare />
                </button> */}
              </div>
            );
          })
        ) : (
          <p className='text-3xl text-rose-400 text-center my-auto'>
            No Tasks to display
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
