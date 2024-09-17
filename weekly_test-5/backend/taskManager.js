/** @format */

import cron from "node-cron";
import moment from "moment";
import { sendMail } from "./mailSender.js";
import { taskM } from "./taskModel.js";
import "dotenv/config";

export async function taskManager(req, res) {
  const tm = req.body;
  tm.log = [];
  let logtime = new Date(Date.now());
  tm.log.push(`Added this task at ${logtime.toLocaleString()}`);
  const newData = await addTask(tm);
  // let time = moment(tm.date_time, "YYYY-MM-DDTHH:mm").format("*,mm,HH,DD,MM*");
  const [date, time] = tm.date_time.split("T");
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");
  cron.schedule(
    `${minutes} ${hours} ${day} ${month} *`,
    async () => {
      try {
        await sendMail(
          process.env.userMail,
          process.env.userPass,
          tm.email,
          "This mail is sent via a demo project.",
          `Hello user, I hope this email finds you well. This is a reminder mail for you to ${tm.title} and message- ${tm.message}. As it was set for this exact moment.`
        );
          // res.status(201).send("successfull");
          updateTask(newData);
      } catch (err) {
        // res.status(400).send("Failed try again");
        console.log(err);
      }
    },
    { scheduled: true, timezone: "Asia/Kolkata" }
  );
  
  // console.log(time);
  res.send("Task scheduled");
}

async function addTask(arr) {
  const tm = Date.now().toLocaleString();
  const task = new taskM(arr);
  try {
    const temp = await task.save();
    // console.log(temp);
    return temp;
  } catch (err) {
    console.log(err);
  }
}

async function updateTask(data) {
  let arr = data;
  arr.status = "completed";
  let tm = new Date(Date.now());
  arr.log.push(`task completed at ${tm.toLocaleString()}`);
  try {
    const temp = await taskM.findByIdAndUpdate(arr._id, arr, { new: true });
    if (!temp) console.log("error");
  } catch (err) {
    console.log(err);
  }
}
