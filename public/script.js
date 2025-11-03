// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburger');
const navUl = document.querySelector('nav ul');

hamburgerBtn.addEventListener('click', () => {
  navUl.classList.toggle('show');
});

// Hide navbar on link click
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navUl.classList.remove('show');
  });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const messageDiv = document.getElementById('response-message');

    if (response.ok) {
      messageDiv.textContent = result.message;
      messageDiv.style.color = '#00ff00'; // Green for success
      this.reset(); // Clear the form
    } else {
      messageDiv.textContent = result.error || 'Something went wrong. Try again later.';
      messageDiv.style.color = '#ff0000'; // Red for error
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('response-message').textContent = 'Something went wrong. Try again later.';
    document.getElementById('response-message').style.color = '#ff0000';
  }
});
