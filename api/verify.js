import mongoose from 'mongoose';
import Contact from '../../server/models/Contact.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}

export default async function handler(req, res) {
  const { token } = req.query;

  try {
    await connectDB();

    const contact = await Contact.findOne({ verifyToken: token });
    if (!contact) {
      return res
        .status(400)
        .send(`<h2>Invalid or expired token</h2><p>Please try submitting the form again.</p>`);
    }

    contact.verified = true;
    contact.verifyToken = null;
    await contact.save();

    return res
      .status(200)
      .send(`<h2>Email verified successfully!</h2><p>Thank you, ${contact.name}. Your email is now confirmed.</p>`);
  } catch (err) {
    console.error('✗ Verification error:', err);
    return res
      .status(500)
      .send(`<h2>Server Error</h2><p>${err.message}</p>`);
  }
}