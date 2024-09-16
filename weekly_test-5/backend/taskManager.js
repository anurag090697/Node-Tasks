/** @format */

import cron from "node-cron";
import moment from "moment";
import { sendMail } from "./mailSender.js";
import "dotenv/config";

export async function taskManager(req, res) {
  const tm = req.body;
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
          `Hello ${tm.name}, I hope this email finds you well. This is a reminder mail for you to ${tm.title} and message- ${tm.message}. As it was set for this exact moment.`
        );
        // res.status(201).send("successfull");
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
