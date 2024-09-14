/** @format */

import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  skill: {
    type: [String],
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 120000,
  },
  location: {
    type: String,
    required: true,
  },
});

export const job = mongoose.model("jobslists", jobSchema);
