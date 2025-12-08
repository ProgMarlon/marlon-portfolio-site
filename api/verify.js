import mongoose from 'mongoose';
import Contact from '../../lib/models/Contact.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { token } = req.query;

  try {
    await connectDB();

    if (!token || typeof token !== 'string') {
      return res.status(400).send(`
        <h2>Invalid verification link</h2>
        <p>Please check your email and try again.</p>
      `);
    }

    const contact = await Contact.findOne({ verifyToken: token });
    if (!contact) {
      return res.status(404).send(`
        <h2>Token not found</h2>
        <p>This link may have expired or already been used.</p>
      `);
    }

    contact.verified = true;
    contact.verifyToken = null;
    await contact.save();

    return res.status(200).send(`
      <h2>Email Verified ✅</h2>
      <p>Thank you, ${contact.name}. Your email is now confirmed.</p>
    `);
  } catch (error) {
    console.error('✗ Verification error:', error);
    return res.status(500).send(`
      <h2>Server Error</h2>
      <p>Something went wrong. Please try again later.</p>
    `);
  }
}