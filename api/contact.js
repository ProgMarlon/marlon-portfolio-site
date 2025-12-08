import mongoose from 'mongoose';
import Contact from '../server/models/Contact.js'; 
import nodemailer from 'nodemailer';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    await connectDB();

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 587,
      secure: false,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
      },
    });

    await transporter.sendMail({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.EMAIL_USER || 'marloncopilot@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      replyTo: process.env.EMAIL_USER || 'marloncopilot@gmail.com',
      subject: 'We received your message!',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your Message Details:</strong></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>Marlon C. Isaguirre Jr.</p>
      `,
    });

    console.log('✓ Contact saved and emails sent');

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! Check your email for confirmation.',
      data: newContact,
    });
  } catch (error) {
    console.error('✗ Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error submitting form. Please try again later.',
      error: error.message,
    });
  }
}