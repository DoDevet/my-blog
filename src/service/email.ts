import nodemailer from "nodemailer";
import { IFormEmail } from "./contact";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_ID,
    pass: process.env.NODEMAILER_PW,
  },
});
const sendEmail = async ({ message, subject }: IFormEmail) => {
  const info = await transporter.sendMail({
    from: process.env.NODEMAILER_ID,
    to: process.env.NODEMAILER_ID,
    subject: `[BLOG] : ${subject}`,
    text: message,
    html: `<h1>${subject}</h1>
    <div>${message}</div>`,
  });

  return transporter.sendMail(info);
};

export default sendEmail;
