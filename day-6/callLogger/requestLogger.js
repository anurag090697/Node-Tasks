/** @format */

import morgan from "morgan";

export async function requestsLogger(req, res, next) {
  // console.log(`Incoming request: ${req.method} ${req.url}`)
  //   morgan("combined");
  
  const log = [];

  next();
}
