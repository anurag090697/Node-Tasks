/** @format */

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
const app = express();
const port = 6565;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/getData", async (req, res) => {
  res.send("sab changa si");
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
