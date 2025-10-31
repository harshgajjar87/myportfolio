const sgMail = require('@sendgrid/mail');

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  const output = `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong><br>${message}</p>
  `;

  // SendGrid email options
  const msg = {
    to: process.env.SENDGRID_FROM_EMAIL, // Send to the from email or another recipient
    from: process.env.SENDGRID_FROM_EMAIL, // Must be a verified sender in SendGrid
    subject: `New Contact: ${subject}`,
    html: output,
  };

  try {
    await sgMail.send(msg);
    console.log('Message sent successfully');
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Something went wrong. Try again later.' });
  }
};
