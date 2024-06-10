import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = (email, bookTitle, dueDate) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reminder: Book Due Date Approaching',
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #f60;">Community Library Reminder</h2>
      <p>Dear User,</p>
      <p>This is a reminder that the book <strong>"${bookTitle}"</strong> is due on <strong>${dueDate}</strong>.</p>
      <p>Please make sure to return or renew it on time.</p>
      <p>Best regards,<br>Your Community Library</p>
    </div>
    `,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default sendReminderEmail;
