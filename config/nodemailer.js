import { config } from 'dotenv';config();
import nodemailer from 'nodemailer';

/* Creating a transporter object that will be used to send emails. */
export const transporter = nodemailer.createTransport({

    service: `${process.env.MAIL_SMTP_SERVICE}`,
    host: `${process.env.MAIL_SMTP_HOST}`,
    port: `${process.env.MAIL_SMTP_PORT}`,
    secure: `${process.env.MAIL_SMTP_SECURE}`,
    auth: {
      user: `${process.env.MAIL_SMTP_USER}`,
      pass: `${process.env.MAIL_SMTP_PASS}`,
    },
    tls: {
      rejectUnauthorized: false
    }
});

/* Checking to see if the transporter is ready to send emails. */
transporter.verify().then( () => {
  console.log('Server is ready to take our messages')
})
