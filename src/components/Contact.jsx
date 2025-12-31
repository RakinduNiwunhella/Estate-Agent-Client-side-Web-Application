import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page" id="contact">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">
        Have a question about a property or need assistance? Get in touch with us.
      </p>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Our Office</h2>
          <p><strong>Estate Agent UK Ltd</strong></p>
          <p>45 High Street</p>
          <p>London, SW1A 1AA</p>
          <p>Email: sterlingproperties@gmail.com</p>
          <p>Phone: +44 12 3456 7890</p>
        </div>

        <form className="contact-form">
          <label>
            Name
            <input type="text" placeholder="Your name" required />
          </label>

          <label>
            Email
            <input type="email" placeholder="Your email" required />
          </label>

          <label>
            Message
            <textarea placeholder="Your message" rows="4" required></textarea>
          </label>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;