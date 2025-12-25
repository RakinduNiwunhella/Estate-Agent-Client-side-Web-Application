import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="brand">
            <span className="material-symbols-outlined">home</span>
            <h3>Sterling Properties </h3>
          </div>
          <p>
            Helping you find exceptional properties with trusted advice
            and transparent service.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <a href="#">About Us</a>
          <a href="#">Properties</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Get in Touch</h4>

          <div className="contact-item">
            <span className="material-symbols-outlined">mail</span>
            <p>sterlingproperties@gmail.com</p>
          </div>

          <div className="contact-item">
            <span className="material-symbols-outlined">call</span>
            <p>+94 070 225 2257</p>
          </div>

          <div className="contact-item">
            <span className="material-symbols-outlined">location_on</span>
            <p>London, UK</p>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 Sterling Properties. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;