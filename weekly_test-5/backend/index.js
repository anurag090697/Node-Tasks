/** @format */

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = 6565;

try {
    const connection = mongoose.connect(process.env.MONGO_ID);
    if (connection) {
        app.listen(port, () => {
            console.log(`Server running at port ${port} and Database connected`)
        })
    }
} catch (err) {
  console.log(err);
}
