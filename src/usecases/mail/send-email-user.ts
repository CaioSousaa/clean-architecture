import { User } from "../../domain/entities/user";
import { MailerTransport } from "../../external/nodemailer/mailer-mailer-transporter";

export class SendEmailUser {
  private mailer: MailerTransport;

  constructor() {
    this.mailer = new MailerTransport();
  }

  async execute(user: User, token: string) {
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Confirmation Token to Modify Data",
      text: `
      Hello ${user.first_name}, here is your token to modify data.
      Your access token: ${token}
      `,
    };

    try {
      await this.mailer.sendEmailToken(mailOptions);
      console.log("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}
