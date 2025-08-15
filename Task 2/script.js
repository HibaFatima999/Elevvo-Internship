document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear previous messages
  document.querySelectorAll(".error").forEach(el => el.textContent = "");
  document.getElementById("successMessage").textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  let hasError = false;

  // Validate name
  if (!name) {
    document.getElementById("nameError").textContent = "Full name is required.";
    hasError = true;
  }

  // Validate email
  if (!email) {
    document.getElementById("emailError").textContent = "Email is required.";
    hasError = true;
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address.";
      hasError = true;
    }
  }

  // Validate subject
  if (!subject) {
    document.getElementById("subjectError").textContent = "Subject is required.";
    hasError = true;
  }

  // Validate message
  if (!message) {
    document.getElementById("messageError").textContent = "Message is required.";
    hasError = true;
  }

  // Show success message if no errors
  if (!hasError) {
    document.getElementById("successMessage").textContent =
      "Thank you! Your message has been submitted.";
    this.reset();
  }
});
