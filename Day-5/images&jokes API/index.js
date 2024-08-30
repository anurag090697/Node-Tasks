/** @format */
import express, { json } from "express";
// import jokes from "./Jokes.json" assert { type: "json" };
import { laughIt, getPicture } from "anurag-213-package";

const app = express();
const port = 6868;

app.get("/generate/joke", (req, res) => {
  let tm = laughIt();
  res.send({ joke: tm });
});

app.get("/generate/picture", (req, res) => {
  let tm = getPicture();
  res.send({ url: tm });
});

app.get("/generate/joke-pic", (req, res) => {
  let tm = getPicture();
  let tm2 = laughIt();
  res.send({ Picture: tm, Joke: tm2 });
});

app.listen(port, () => {
  console.log(`server is joking around at ${port}`);
});

// function getJoke() {
//   let idx = Math.floor(Math.random() * 15);
//   return jokes[idx];
// }
