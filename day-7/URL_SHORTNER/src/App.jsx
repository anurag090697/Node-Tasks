/** @format */

import { useState } from "react";
import "./App.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [newUrl, setnewUrl] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const justDoIt = () => {
    seterrmsg("Copied to clipboard....");
    setTimeout(() => {
      seterrmsg("");
    }, 3000);
  };

  return (
    <div className='container'>
      <h1>URL SHORTNER</h1>
      <form action=''>
        <input type='text' />
        <button>MODIFY URL</button>
      </form>
      <div>
        <CopyToClipboard text={newUrl} onCopy={justDoIt}>
          <p className='ansp'>{newUrl}</p>
        </CopyToClipboard>
        <p className='errmsg'>{errmsg}</p>
      </div>
    </div>
  );
}

export default App;
