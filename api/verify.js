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

    if (!token || typeof token !== 'string') {
      return res
        .status(400)
        .send(`<h2>Invalid verification link</h2><p>Please check your email and try again.</p>`);
    }

    const contact = await Contact.findOne({ verifyToken: token });
    if (!contact) {
      return res
        .status(404)
        .send(`<h2>Token not found</h2><p>This link may have expired or already been used.</p>`);
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
      .send(`<h2>Server Error</h2><p>Something went wrong. Please try again later.</p>`);
  }
}