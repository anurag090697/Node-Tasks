/** @format */

import express from "express";
import fs from "fs/promises";
import path from "path";
import { validateRegistration } from "./validateForm.js";

const app = express();

app.use(express.json());

const usersDataPath = path.resolve("./", "usersData.json");

const readUsersData = async () => {
  try {
    const data = await fs.readFile(usersDataPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users data:", err);
    return [];
  }
};

const writeUsersData = async (data) => {
  try {
    await fs.writeFile(usersDataPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing users data:", err);
  }
};

app.post("/register", validateRegistration, async (req, res, next) => {
  try {
    const users = await readUsersData();
    const newUser = req.body;
    users.push(newUser);

    await writeUsersData(users);

    res
      .status(201)
      .json({ message: "Registration successful!", user: newUser });
  } catch (err) {
    next(err);
  }
});

app.get("/users", async (req, res, next) => {
  try {
    const users = await readUsersData();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
};

app.use(errorHandler);

const PORT = 6568;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
