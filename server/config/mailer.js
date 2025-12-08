import { Resend } from 'resend';

let transporter = null;
let initialized = false;

async function initializeTransporter() {
  if (initialized) return transporter;
  
  const hasResend = !!process.env.RESEND_API_KEY;
  const hasBrevo = !!(process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASSWORD);
  const hasSendGrid = !!process.env.SENDGRID_API_KEY;
  const hasGmail = !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);

  console.log('🔍 Email provider check:');
  console.log(`  - RESEND: ${hasResend ? '✓' : '✗'}`);
  console.log(`  - BREVO: ${hasBrevo ? '✓' : '✗'}`);
  console.log(`  - SENDGRID: ${hasSendGrid ? '✓' : '✗'}`);
  console.log(`  - GMAIL: ${hasGmail ? '✓' : '✗'}`);

  if (hasResend) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      transporter = {
        sendMail: async (msg) => {
          try {
            const fromEmail = msg.from || process.env.RESEND_FROM_EMAIL || 'hello@marlonisaguirre.site';
            console.log(`📧 Sending via Resend from: ${fromEmail} to: ${msg.to}`);
            const result = await resend.emails.send({
              from: fromEmail,
              to: msg.to,
              replyTo: process.env.RESEND_REPLY_TO || msg.replyTo,
              subject: msg.subject,
              html: msg.html,
            });
            console.log('✓ Resend response:', JSON.stringify(result, null, 2));
            if (result.id) {
              console.log('✓ Resend email sent:', result.id);
            } else if (result.error) {
              console.error('✗ Resend error:', result.error);
              throw new Error(result.error);
            }
            return result;
          } catch (err) {
            console.error('✗ Resend send error:', err.message || err);
            throw err;
          }
        },
      };
      console.log('✓ Resend transporter created');
      initialized = true;
      return transporter;
    } catch (err) {
      console.error('Failed to create Resend transporter:', err.message || err);
    }
  }

  if (hasBrevo) {
    try {
      const nodemailer = (await import('nodemailer')).default;
      transporter = nodemailer.createTransport({
        host: process.env.BREVO_SMTP_HOST,
        port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
        secure: process.env.BREVO_SMTP_PORT === '465',
        auth: {
          user: process.env.BREVO_SMTP_USER,
          pass: process.env.BREVO_SMTP_PASSWORD,
        },
      });
      console.log('✓ Brevo SMTP transporter created');
      initialized = true;
      return transporter;
    } catch (err) {
      console.log('Failed to create Brevo transporter:', err.message || err);
    }
  }

  if (hasSendGrid) {
    try {
      const sgMail = (await import('@sendgrid/mail')).default;
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      transporter = {
        sendMail: async (msg) => {
          const sgMsg = {
            to: msg.to,
            from: msg.from || process.env.SENDGRID_FROM || process.env.EMAIL_USER,
            subject: msg.subject,
            html: msg.html,
            text: msg.text,
          };
          try {
            const res = await sgMail.send(sgMsg);
            console.log('SendGrid send result:', res[0].statusCode);
            return res;
          } catch (err) {
            console.error('SendGrid send error:', err.message || err);
            throw err;
          }
        },
      };
      console.log('✓ SendGrid transporter created');
      initialized = true;
      return transporter;
    } catch (err) {
      console.log('Failed to load SendGrid:', err.message || err);
    }
  }

  if (hasGmail) {
    try {
      const nodemailer = (await import('nodemailer')).default;
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      console.log('✓ Gmail transporter created');
      initialized = true;
      return transporter;
    } catch (err) {
      console.log('Failed to create Gmail transporter:', err.message || err);
    }
  }

  // Fallback: no email service
  console.log('⚠️  No email provider configured. Messages will not be sent.');
  transporter = {
    sendMail: async () => {
      console.log('Email disabled: no email provider configured.');
      return Promise.resolve({ message: 'Email disabled' });
    },
  };
  initialized = true;
  return transporter;
}

// Export a wrapper that initializes on first use
export default {
  sendMail: async (msg) => {
    const t = await initializeTransporter();
    return t.sendMail(msg);
  },
};
