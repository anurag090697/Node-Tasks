/** @format */

import { nanoid } from "nanoid";
import { makeURL } from "./urlModel.js";

function isUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}

async function createShortenedUrl(inputUrl) {
  const chotu = nanoid(8);

  const existingUrl = await makeURL.findOne({ url: inputUrl });
  if (existingUrl) {
    return {
      url: existingUrl.url,
      chotu: existingUrl.dwarf,
      message: "URL already exists.",
    };
  }

  const newUrl = await new makeURL({
    url: inputUrl,
    dwarf: chotu,
  }).save();

  return {
    url: newUrl.url,
    chotu: newUrl.dwarf,
    message: "Copy the shortened URL.",
  };
}

export async function doTheMagic(req, res) {
  try {
    const input = req.body.url;

    if (isUrl(input)) {
      const result = await createShortenedUrl(input);
      res.status(201).json(result);
    } else {
      const existingUrl = await makeURL.findOne({ dwarf: input });
      if (existingUrl) {
        res.json({
          url: existingUrl.url,
          chotu: existingUrl.dwarf,
          message: "Already exists.",
        });
      } else {
        res.status(404).json({ message: "URL not found." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
