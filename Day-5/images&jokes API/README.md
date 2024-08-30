<!-- @format -->

# Random Content API

## Overview

This project sets up an Express server that serves random jokes and images using the `anurag-213-package` npm package. It provides three API endpoints:

1. **Generate a random joke**
2. **Generate a random image URL**
3. **Generate both a random joke and a random image URL**

These endpoints allow users to easily access random content, making the server a fun and useful tool for generating random jokes and images.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/random-content-api.git
   ```
2. Navigate into the project directory:

   ```bash
   cd random-content-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The server will run on `http://localhost:6868`.

## API Endpoints

### 1. Get a Random Joke

- **Endpoint**: `/generate/joke`
- **Method**: `GET`
- **Description**: Returns a random joke.
- **Example Request**:
  ```http
  GET http://localhost:6868/generate/joke
  ```
- **Example Response**:
  ```json
  {
    "joke": "Why don't skeletons fight each other? They don't have the guts."
  }
  ```

### 2. Get a Random Image URL

- **Endpoint**: `/generate/picture`
- **Method**: `GET`
- **Description**: Returns a random image URL.
- **Example Request**:
  ```http
  GET http://localhost:6868/generate/picture
  ```
- **Example Response**:
  ```json
  {
    "url": "https://example.com/random-image.jpg"
  }
  ```

### 3. Get Both a Random Joke and Image

- **Endpoint**: `/generate/joke-picture`
- **Method**: `GET`
- **Description**: Returns both a random joke and a random image URL.
- **Example Request**:
  ```http
  GET http://localhost:6868/generate/joke-picture
  ```
- **Example Response**:
  ```json
  {
    "joke": "I'm reading a book on anti-gravity. It's impossible to put down.",
    "url": "https://example.com/random-image.jpg"
  }
  ```

## Implementation Details

The server uses Express and leverages the `anurag-213-package` package, which includes functions for generating random jokes and images:

- **`laughIt()`**: Returns a random joke.
- **`getPicture()`**: Returns a random image URL.
- **`getJokeAndPicture()`**: Returns both a random joke and a random image URL.

## Code Example

Here's a snippet of the server code:

```javascript
import express from "express";
import { laughIt, getPicture, getJokeAndPicture } from "anurag-213-package";

const app = express();
const port = 6868;

app.use(express.json());

app.get("/generate/joke", (req, res) => {
  try {
    let tm = laughIt();
    res.send({ joke: tm });
  } catch (error) {
    res.status(500).send({ error: "Failed to generate joke" });
  }
});

app.get("/generate/picture", (req, res) => {
  try {
    let tm = getPicture();
    res.send({ url: tm });
  } catch (error) {
    res.status(500).send({ error: "Failed to generate picture URL" });
  }
});

app.get("/generate/joke-picture", (req, res) => {
  try {
    let result = getJokeAndPicture();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to generate joke and picture" });
  }
});

app.listen(port, () => {
  console.log(`Server is joking around at ${port}`);
});
```

## Testing the API

You can test the API using Postman, curl, or any other HTTP client:

- **Postman**: Create a new request and enter the URL of the endpoint you want to test.
- **curl**: Use the command line to test:
  ```bash
  curl http://localhost:6868/generate/joke
  ```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.
