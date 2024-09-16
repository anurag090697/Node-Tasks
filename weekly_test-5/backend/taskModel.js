/** @format */

import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  date_time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  email: {
    type: String,
    required: true,
  },
  log: [
    {
      type: String,
    },
  ],
});

export const taskM = new mongoose.model("To-DO_List", taskSchema);
