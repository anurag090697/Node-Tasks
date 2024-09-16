/** @format */

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { taskManager } from "./taskManager.js";

const app = express();
const port = 6565;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/getTasks", async (req, res) => {
  res.send("sab changa si");
});

app.post("/addTask",  (req,res) => taskManager(req,res));

try {
  const connection = mongoose.connect(process.env.MONGO_ID);
  if (connection) {
    app.listen(port, () => {
      console.log(`Server running at port ${port} and Database connected`);
    });
  }
} catch (err) {
  console.log(err);
}
