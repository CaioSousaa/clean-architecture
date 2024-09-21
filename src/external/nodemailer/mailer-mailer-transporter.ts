import * as nodemailer from "nodemailer";

export class MailerTransport {
  createTransporter() {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.SECRET,
      },
    });

    return transporter;
  }

  sendEmailToken(mailOptions: nodemailer.SendMailOptions) {
    const transporter = this.createTransporter();
    return transporter.sendMail(mailOptions);
  }
}
