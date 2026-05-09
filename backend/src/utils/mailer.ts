import nodemailer from "nodemailer";

const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;

if (!mailUser || !mailPass) {
  console.warn("Mail credentials are missing. Set MAIL_USER and MAIL_PASS.");
}

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});
