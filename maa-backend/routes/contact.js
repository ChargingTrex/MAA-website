const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Build transporter from env vars
const createTransporter = () => {
  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your_email@gmail.com') {
    console.warn('⚠️  SMTP not configured. Contact form emails will not be sent.');
    return null;
  }
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// POST /api/contact
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message || !subject) {
      return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    if (message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters.' });
    }

    const transporter = createTransporter();
    if (!transporter) {
      // Log the submission even if email fails, so nothing is lost
      console.log('📩 Contact form submission (email not sent — SMTP unconfigured):', { name, email, phone, subject, message });
      return res.json({ 
        success: true, 
        message: 'Your message has been received. We will contact you shortly.' 
      });
    }

    const mailOptions = {
      from: `"MAA Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `[MAA Website] ${subject} — from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2C5F2D; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0 0;">MAA Saraswati Veterinary Hospital Website</p>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td><td style="padding: 8px 0; color: #2D2D2D;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #F4830F;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0; color: #2D2D2D;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td><td style="padding: 8px 0; color: #2D2D2D;">${subject}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;">
            <h3 style="color: #2C5F2D; margin-top: 0;">Message:</h3>
            <p style="color: #2D2D2D; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 16px;">
            Sent via the MAA Saraswati Veterinary Hospital website contact form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✉️  Contact form email sent from ${email} [${subject}]`);

    res.json({ success: true, message: 'Your message has been sent! We will get back to you soon.' });
  } catch (err) {
    // Don't expose SMTP errors to client
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again or call us directly.' });
  }
});

module.exports = router;
