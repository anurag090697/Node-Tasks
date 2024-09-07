/** @format */

import express from "express";
import { requestsLogger } from "./requestLogger.js";
import morgan from "morgan";
const app = express();

const port = 6699;
const hostname = "localhost";

// app.use(requestsLogger);
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/post", (req, res) => {
  res.send("now you've done it");
});

app.listen(port, () => {
  console.log("server is trying to run away from " + port);
});
