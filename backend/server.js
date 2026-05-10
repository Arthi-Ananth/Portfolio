const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // Allows all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Verify transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use Google App Password here
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Transporter verification failed:', error.message);
        if (error.message.includes('535-5.7.8')) {
            console.log('👉 TIP: You need to use a Google App Password, not your regular password.');
            console.log('👉 Go to: https://myaccount.google.com/apppasswords');
        }
    } else {
        console.log('✅ Server is ready to take our messages');
    }
});

// Routes
app.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Best practice to use your own email as "from"
        to: process.env.EMAIL_USER, // Receive the email at your own address
        replyTo: email, // Set reply-to as the sender's email
        subject: `New Portfolio Message: ${subject}`,
        text: `You have a new message from your portfolio contact form.\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Subject: ${subject}\n\n` +
              `Message:\n${message}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">New Portfolio Contact</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999;">This email was sent from your portfolio contact form.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message.', 
            details: error.message.includes('535') ? 'Authentication failed. Please check your App Password.' : error.message 
        });
    }
});

app.get('/', (req, res) => {
    res.send('Portfolio Backend is running!');
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
