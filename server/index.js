const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*", // Replace with your React app's URL
  })
);
app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
  const { Name, phoneNo, Drugs, Pharmacy } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // you can use any email service
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASSWORD, // your email password
    },
  });

  // Set up email data
  let mailOptions = {
    from: "quickxmarket@gmail.com",
    to: process.env.ADMIN_EMAIL, // admin email
    subject: "New Drugs Order Placed",
    text: `${Name} wants to order the following drugs:\n${Drugs}\nFrom:${Pharmacy}\nPhone Number${phoneNo}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
