import express from 'express';
import Contact from '../../lib/models/Contact.js';
import transporter from '../config/mailer.js';

const router = express.Router();

// POST - Submit contact form
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Save to MongoDB
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();

    // Send email to you (portfolio owner)
    const ownerMailOptions = {
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.EMAIL_USER || 'marlon.copilot@gmail.com', // Send to yourself
      replyTo: email, // Reply goes to form submitter
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
    };

    // Send confirmation email to visitor
    const visitorMailOptions = {
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      replyTo: process.env.EMAIL_USER || 'marlon.copilot@gmail.com',
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
    };

    // Send emails (Resend or fallback providers)
    try {
      await transporter.sendMail(ownerMailOptions);
      await transporter.sendMail(visitorMailOptions);
      console.log('✓ Confirmation emails sent');
    } catch (mailError) {
      console.error('Email send error (non-blocking):', mailError.message);
      // Continue - email failure should not prevent form success
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Check your email for confirmation.',
      data: newContact,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting form. Please try again later.',
      error: error.message,
    });
  }
});

// GET - Get all contact submissions (optional - for admin)
router.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
});

export default router;
