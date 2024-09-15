/** @format */

import express from "express";
import mongoose from "mongoose";
import { job } from "./JobSchema.js";
import "dotenv/config";

const app = express();
// console.log(process.env.DB_PASS)
const port = 7676;
const hostname = "localhost";

app.use(express.json());

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.get("/getJobs", async (req, res, next) => {
  console.log("GET /getJobs route handler started");
  try {
    console.log("Attempting to fetch jobs from database...");
    const jobs = await job.find().lean();
    console.log(`Successfully fetched ${jobs.length} jobs`);

    res.status(200).json({
      data: { jobs },
      status: 200,
      message: "Jobs Fetched Successfully.",
    });
    console.log("Response sent successfully");
  } catch (err) {
    console.error("Error in GET /getJobs:", err);
    next(err);
  }
});

app.post("/addJob", async (req, res) => {
  const tm = new job(req.body);
  try {
    const temp = await tm.save();
    res
      .status(201)
      .json({ response: { data : tm , Message: "Job Added Successfully", status: 201 } });
  } catch (err) {
    res.status(400).json({ message: err });
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

// mongoose.connect(process.env.DB_PASS).then(() => {
//   app.listen(port, hostname, () => {
//     console.log(
//       `api is woring at port ${hostname + " " + port} & database connected`
//     );
//   });
// });
// mongodb://127.0.0.1:27017/Projects

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_ID);
    console.log("Connected to cloud database");

    app.listen(port, () => {
      console.log(`API is working on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();
