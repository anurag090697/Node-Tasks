/** @format */

import express from "express";
import mongoose from "mongoose";
import { job } from "./JobSchema.js";
const app = express();

const port = 7676;
const hostname = "localhost";

app.use(express.json());

app.get("/getJobs", async (req, res) => {
  try {
    const jobs = await job.find();
    res.status(200).json({
      response: {
        data: { jobs },
        Status: 200,
        Messgae: "Jobs Fetched Successfully.",
      },
    });
  } catch (err) {
    res.sendStatus(500).json({ response: { error: err } });
  }
});

app.post("/addJob", async (req, res) => {
  const tm = new job(req.body);
  try {
    const temp = await tm.save();
    res
      .status(201)
      .json({ response: { Message: "Job Added Successfully", status: 201 } });
  } catch (err) {
    res.status(400).json({ response: { message: err } });
  }
});

app.put("/updateJob/:id", async (req, res) => {
  try {
    const tm = await job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tm) return res.status(404).json({ message: "Job not found." });
    res.json({ message: "Job updated successfully.", data: tm });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

app.delete("/removeJob/:id", async (req, res) => {
  try {
    const tm = await job.findByIdAndDelete(req.params.id);
    if (!tm) return res.status(404).json({ message: "invalid id try again." });
    res.json({ message: "Job deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

mongoose.connect("mongodb://127.0.0.1:27017/Projects").then(() => {
  app.listen(port, hostname, () => {
    console.log(
      `api is woring at port ${hostname + " " + port} & database connected`
    );
  });
});
