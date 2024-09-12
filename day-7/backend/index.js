/** @format */

import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 6868;

try {
  const connection = await mongoose.connect(
    "mongodb://127.0.0.1:27017/Projects"
  );
  if (connection) {
    console.log("db connected \n ");
    app.listen(port, () => {
      console.log("running at port- " + port);
    });
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const exists = collections.some(collection => collection.name === "url_shortner");
    console.log(`Collection exists: ${exists}`);
  }
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => {
  res.send("hello there");
});
