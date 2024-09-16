/** @format */

import { createTransport } from "nodemailer";

export const sendMail = async (sender, pass, reciever, subject, body) => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: pass,
    },
  });
  try {
    await transport.sendMail({
      from: sender,
      to: reciever,
      subject: subject,
      text: body,
    });
  } catch (err) {
    console.log(err);
  }
};
