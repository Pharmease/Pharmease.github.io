const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*", 
  })
);
app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
  const { Name, phoneNo, Drugs, Pharmacy } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER, 
           pass: process.env.EMAIL_PASSWORD, 
    },
  });

  // Set up email data
  let mailOptions = {
    from: "quickxmarket@gmail.com",
    to: process.env.ADMIN_EMAIL, 
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
