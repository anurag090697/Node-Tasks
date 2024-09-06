/** @format */

import fs from "fs";
export function requestsLogger(req, res, next) {
  let intime = Date.now();
  // console.log("midddleware is working");
  const logs = {};
  logs.Method = req.method;
  logs.reqURL = "http://localhost:6698" + req.url;
  logs.timeStamp = new Date().toLocaleString();

  let entime = Date.now();


  fs.appendFile("logs.json", JSON.stringify(logs, null, 2), (err) => {
    if (err) {
      console.error("Error writing to logs.json:", err);
    }
  });

  const finaltime = entime - intime;
  console.log("Anurag Shukla time- " +finaltime + "ms");
  next();
}
