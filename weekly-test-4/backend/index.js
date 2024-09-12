/** @format */

// jaji bumv vrmv ocjn app pass
import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import nodemailer from "nodemailer";
import { sendMail } from "./mailSender.js";

const app = express();
const port = 6546;

// console.log(process.env.userMail);

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://node-tasks-2z1g.onrender.com" }));

app.get("/getit", (req, res) => {
  res.send("ello there");
});

app.post("/postMail", async (req, res) => {
  const info = req.body;
  console.log(info);
  try {
    await sendMail(
      process.env.userMail,
      process.env.userPass,
      info.usermail,
      "This mail is sent via a demo project.",
      `Hello ${info.username} I, hope this email finds you well we recieved this request from you ${info.message} please wait for our response.`
    );
    res.status(201).send("successfull");
  } catch (err) {
    res.status(400).send("Failed try again");
    console.log(err);
  }

  res.send("got it");
});

app.listen(port, () => {
  console.log("server is running away from " + port);
});
