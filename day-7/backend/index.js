/** @format */

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { makeURL } from "./urlModel.js";
import { doTheMagic } from "./generator.js";
import cors from "cors";

const app = express();
const port = 6868;
// console.log(process.env.MONGO_ID);
app.use(express.json());
app.use(cors({origin:"*"}))

app.get("/", (req, res) => {
  res.send("hello there");
});

app.post("/urlShortner", doTheMagic);

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
