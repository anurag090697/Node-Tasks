/** @format */

import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  async function getData() {
    const response = await axios.get("http://localhost:6565/getData");
    console.log(response);
  }
  getData();
  return (
    <div className='container min-h-dvh w-full bg-gradient-to-tr from-cyan-200 to-lime-200'>
      <nav className='w-full py-4 px-2 flex items-center justify-between font-medium border-b-2 border-gray-500 bg-emerald-200'>
        <h1 className='text-3xl text-rose-500'>PLAN_IT</h1>
        <form action='' className='flex gap-4 px-8'>
          <input
            type='text'
            placeholder='Task Title....'
            className=' text-center p-2 outline-orange-300 rounded-lg border-2 border-gray-300'
          />
          <input
            type='text'
            name=''
            id=''
            placeholder='Task detail...'
            className=' text-center p-2 outline-orange-300 rounded-lg border-2 border-gray-300'
          />
          <input
            type='time'
            name=''
            id=''
            className=' text-center p-2 outline-orange-300 rounded-lg border-2 border-gray-300'
          />
          <input
            type='date'
            className=' text-center p-2 outline-orange-300 rounded-lg border-2 border-gray-300'
          />
          <button>Add Task</button>
        </form>
      </nav>
    </div>
  );
}

export default App;
