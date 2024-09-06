/** @format */

import express from "express";
import { requestsLogger } from "./requestsLogger.js";
const app = express();

const port = 6698;
const hostName = "localhost";
const tempData = [];

app.use(express.json());

app.use(requestsLogger);

app.get("/data", (req, res) => {
  // console.log("api is working");
  res.send(req.headers);
});

app.post("/placeData", (req, res) => {
  // console.log("going to post");
  const tmm = req.body;
  // console.log(tmm)
  res.send("you have posted data successfully");
});

app.listen(port, () => {
  console.log("server is running at " + hostName + " & " + port);
});
