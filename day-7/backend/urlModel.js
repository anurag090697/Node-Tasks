/** @format */

import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  dwarf: {
    type: String,
    required: true,
  },
});

export const makeURL = mongoose.model("url", urlSchema);