/** @format */

import { useState } from "react";
import "./App.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

function App() {
  const [newUrl, setnewUrl] = useState("URL");
  const [shorty, setShorty] = useState("SHORTENeD");
  const [errmsg, seterrmsg] = useState("");

  const justDoIt = () => {
    seterrmsg("Copied to clipboard....");
    setTimeout(() => {
      seterrmsg("");
    }, 3000);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post(
      "https://url-shortner-api-5066.onrender.com/urlShortner",
      {
        url: newUrl,
      }
    );
    // console.log(response);
    let tm = response.data;
    setShorty(tm.chotu);
    setnewUrl(tm.url);
    seterrmsg(tm.message);
  }

  return (
    <div className='container'>
      <h1>URL SHORTNER</h1>
      <form action='' onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          value={newUrl}
          onChange={(e) => setnewUrl(e.target.value)}
        />
        <button>MODIFY URL</button>
      </form>
      <div>
        <CopyToClipboard text={newUrl} onCopy={justDoIt}>
          <p className='ansp'>URL</p>
        </CopyToClipboard>
        <CopyToClipboard text={shorty} onCopy={justDoIt}>
          <p className='ansp'>SHORTENED</p>
        </CopyToClipboard>

        <p className='errmsg'>{errmsg}</p>
      </div>
    </div>
  );
}

export default App;
