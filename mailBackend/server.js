require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Verify transporter configuration on startup
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Transporter verification failed:", error.message);
    } else {
        console.log("✅ Server is ready to take our messages");
    }
});

// Route for sending emails
app.post("/send", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        let mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`, // Gmail overrides this anyway, but this is cleaner
            to: process.env.EMAIL_USER, // sends the email to yourself
            replyTo: email, // ensures you reply to the person who filled the form
            subject: `Portfolio Contact: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent from ${name} (${email})`);
        res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("❌ SendMail Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Failed to send email.", 
            details: error.message.includes("535") ? "Authentication failed. Check your App Password." : "An unexpected error occurred."
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
