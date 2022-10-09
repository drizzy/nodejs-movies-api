import { transporter } from '../../config/nodemailer'; 

/**
 * It takes an email, subject, and text as arguments, and then sends an email to the email address
 * provided with the subject and text provided
 * @param email - The email address of the recipient.
 * @param subject - The subject of the email
 * @param text - The text of the email.
 */
const sendEmail = async (email, subject, text) => {

  try {

    const mailOptions = {
      from: `${process.env.MAIL_SMTP_FROM}`,
      to: email,
      subject: subject,
      html: text,
    }

    await transporter.sendMail(mailOptions, (e, info) => {

      if (e) return console.log(e);
          console.log('Send mail susccess');
          transporter.close();
    });

  } catch (e) {
    console.log('Email not send: ', e);
  }
}

export default sendEmail;