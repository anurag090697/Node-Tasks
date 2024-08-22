/** @format */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tasksFile = path.join(__dirname, "tasks.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readTasks() {
  try {
    const data = fs.readFileSync(tasksFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

function addTask() {
  rl.question("Enter new task: ", (task) => {
    const tasks = readTasks();
    tasks.push({ task, completed: false });
    writeTasks(tasks);
    console.log("Task added successfully!");
    showMenu();
  });
}

function viewTasks() {
  const tasks = readTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. [${task.completed ? "X" : " "}] ${task.task}`);
    });
  }
  showMenu();
}

function completeTask() {
  const tasks = readTasks();
  if (tasks.length === 0) {
    console.log("No tasks to complete.");
    showMenu();
  } else {
    rl.question("Enter the number of the task to mark as complete: ", (num) => {
      const index = parseInt(num) - 1;
      if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        writeTasks(tasks);
        console.log("Task marked as complete!");
      } else {
        console.log("Invalid task number.");
      }
      showMenu();
    });
  }
}

function removeTask() {
  const tasks = readTasks();
  if (tasks.length === 0) {
    console.log("No tasks to remove.");
    showMenu();
  } else {
    rl.question("Enter the number of the task to remove: ", (num) => {
      const index = parseInt(num) - 1;
      if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        writeTasks(tasks);
        console.log("Task removed successfully!");
      } else {
        console.log("Invalid task number.");
      }
      showMenu();
    });
  }
}

function showMenu() {
  console.log("\n--- Task Manager ---");
  console.log("1. Add a new task");
  console.log("2. View tasks");
  console.log("3. Mark a task as complete");
  console.log("4. Remove a task");
  console.log("5. Exit");
  rl.question("Choose an option: ", handleOption);
}

// Function to handle user's menu choice
function handleOption(option) {
  switch (option) {
    case "1":
      addTask();
      break;
    case "2":
      viewTasks();
      break;
    case "3":
      completeTask();
      break;
    case "4":
      removeTask();
      break;
    case "5":
      rl.close();
      break;
    default:
      console.log("Invalid option. Please try again.");
      showMenu();
  }
}

showMenu();
