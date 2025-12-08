import mongoose from 'mongoose';
import Contact from '../lib/models/Contact.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
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

    // Generate a unique verification token
    const token = crypto.randomBytes(32).toString('hex');

    // Save contact with token + verified=false
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      verifyToken: token,
      verified: false,
    });
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

    // Admin notification
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

    // User auto-response with verification link
    await transporter.sendMail({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      replyTo: process.env.EMAIL_USER || 'marloncopilot@gmail.com',
      subject: 'Please verify your email',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your Message Details:</strong></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>To confirm your email, please click the link below:</p>
        <p><a href="https://marlonisaguirre.site/api/verify?token=${token}">Verify Email</a></p>
        <hr>
        <p>Best regards,<br>Marlon C. Isaguirre Jr.</p>
      `,
    });

    console.log('✓ Contact saved, verification email sent');

    // Important: do not imply full success until verified
    return res.status(201).json({
      success: true,
      message: 'Message received. Please check your email to verify ownership.',
      data: { id: newContact._id, verified: newContact.verified },
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