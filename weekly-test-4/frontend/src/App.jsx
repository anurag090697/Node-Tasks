/** @format */

import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  async function handlesubmit(e) {
    e.preventDefault();
    setReply("");
    const formdata = {
      username: uname,
      usermail: email,
      message: msg,
    };
    if (uname && email && msg) {
      console.log(email, uname, msg);
      try {
        // const response = await axios.get("http://localhost:6546/getit");
        const response = await axios.post(
          "http://localhost:6546/postMail",
          formdata
        );
        setReply(response.status);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className='container flex flex-col gap-3 items-center justify-center min-h-dvh w-full'>
      <form
        action=''
        onSubmit={(e) => handlesubmit(e)}
        className='flex flex-col gap-3 items-center justify-center border-2 p-8 border-orange-200 rounded-xl text-lg text-emerald-700'
      >
        <input
          type='text'
          name='name'
          className='w-full border-sky-200 border-2 rounded p-2 text-center outline-sky-500'
          placeholder='Full Name...'
          value={uname}
          required
          onChange={(e) => {
            setUname(e.target.value);
          }}
        />
        <input
          type='email'
          name='email'
          className='w-full border-sky-200 border-2 rounded p-2 text-center outline-sky-500'
          placeholder='Your EMAIL...'
          value={email}
          required
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <textarea
          name='message'
          id=''
          className='w-full border-sky-200 border-2 rounded p-2 text-center outline-sky-500'
          placeholder='Your Message...'
          required
          value={msg}
          onChange={(e) => {
            setMsg(e.currentTarget.value);
          }}
        ></textarea>
        <button className='border-2 rounded-lg p-2 bg-orange-400 font-medium text-sky-600 hover:text-emerald-500 hover:border-emerald-500 hover:bg-sky-50'>
          Submit
        </button>
      </form>
      <p
        className={`font-medium ${
          reply === 201 ? "text-emerald-500" : "text-rose-400"
        } ${reply ? "" : "hidden"}`}
      >
        {reply === 201 ? "Check you indbox" : "Failed try again"}
      </p>
    </div>
  );
}

export default App;
