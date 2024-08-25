import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/db_con.js";
import nodemailer from "nodemailer"; // Import nodemailer module

dotenv.config();
const app = express();

//middlewares
app.use(express.json()); //Send responses in json format
app.use(morgan("tiny")); //log requests
app.use(cors());

// Define sendTimetableNotification function
const sendTimetableNotification = async (studentEmails, subject, message) => {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  // Iterate over student emails and send an email to each student
  for (const email of studentEmails) {
    // Compose the email message
    const mailOptions = {
      from: process.env.USER, // Set from address
      to: email,
      subject: subject,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to:", email);
    } catch (err) {
      console.log("Error sending email", err);
    }
  }
};

app.get("/", (req, res) => {
  res.send("Hello from express");
});

// Route to send notification
app.post("/send-notification", async (req, res) => {
  const { studentEmails, subject, message } = req.body; // Extract data from request body

  if (!studentEmails || !subject || !message) {
    return res
      .status(400)
      .send(
        "Please provide studentEmails, subject, and message in the request body."
      );
  }

  try {
    await sendTimetableNotification(studentEmails, subject, message);
    res.send("Notification sent successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending notification.");
  }
});

//server config
const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  try {
    // await connect();
    console.log(`Notification service is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
