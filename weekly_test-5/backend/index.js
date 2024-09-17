/** @format */

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { taskManager } from "./taskManager.js";
import { taskM } from "./taskModel.js";

const app = express();
const port = 6565;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/getTasks", async (req, res) => {
  const temp = await taskM.find();
  res.send(temp);
});

app.post("/addTask", (req, res) => taskManager(req, res));

app.delete("/removeTask/:id", async (req, res) => {
  const temp = req.params.id;
  // console.log(temp);
  // res.send("delete");
  try {
    const tm = await taskM.findByIdAndDelete(temp);
    if (!tm) return res.status(404).json({ message: "invalid id try again." });
    res.json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

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
