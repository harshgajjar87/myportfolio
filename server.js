const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const path = require('path');
require('dotenv').config();

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/contact', (req, res) => {
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

  // Send email using SendGrid
  sgMail.send(msg)
    .then(() => {
      console.log('Message sent successfully');
      res.send(`
        <script>
          alert("Message sent successfully!");
          window.location.href = "/";
        </script>
      `);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      return res.status(500).send('Something went wrong. Try again later.');
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
