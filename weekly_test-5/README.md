<!-- @format -->

## PLAN_IT: A Task Management Application

**PLAN_IT** helps you stay organized by managing your tasks and sending you reminders at the scheduled time.

### Functionality

- **Create Tasks:** Define your tasks with details and schedule them for a specific date and time.
- **Email Reminders:** Receive email notifications for upcoming tasks at the designated time.
- **Task Management:** View, edit (currently under development), and delete existing tasks.
- **Responsive UI:** Access and manage your tasks from any device with a user-friendly interface.

### Technologies Used

- **Frontend:**
  - React: JavaScript library for building user interfaces.
  - Axios: HTTP client for making API calls from React to the backend.
  - Tailwind CSS: Utility-first CSS framework for rapid styling.
  - Google Fonts: Wide selection of fonts for customization.
- **Backend:**
  - Node.js: JavaScript runtime environment for server-side execution.
  - Express.js: Web framework for building web applications and APIs with Node.js.
  - MongoDB: database for storing task data.
  - Node-cron: Task scheduler for executing automated tasks at specific times.
  - Nodemailer: Email sending library for Node.js.

### How it Works

1. Users create tasks through a simple form in the navbar, providing details and setting a reminder time.
2. The frontend utilizes Axios to communicate with the backend API for task creation.
3. The backend, built with Express.js, stores the task information in a MongoDB database.
4. Node-cron is used to schedule the email sending based on the specified time for each task.
5. When the scheduled time arrives, Nodemailer sends an email notification to the user's designated email address.
6. Upon sending the email reminder, the task status is updated from "Pending" to "Completed" in the database.
7. Users can view all tasks in a list below the form.
8. Deleting tasks is currently functional, while editing functionality is under development.

### Hosted Link

Access PLAN_IT at: [Click here](https://node-tasks.vercel.app/)

**Additional Notes:**

This is a well-structured application demonstrating strong technical skills. Consider adding a brief note about future plans or potential areas for improvement.
