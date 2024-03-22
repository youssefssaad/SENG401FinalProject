import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
return (
<footer>
    <div className="container">
    <h3>Contact Us</h3>
    <p>Want to keep up with our news? Have questions? We'd love to hear from you!</p>
    <ul className="contact-info">
        <li><strong>Email:</strong> info@wealthwave.com</li>
        <li><strong>Phone:</strong> +1 (825) 935-8492</li>
        <li><strong>Address:</strong> 2500 University Dr NW, Calgary, AB, T2N 1N4</li>
    </ul>
    <div className="social-links">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /> Facebook</a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /> Twitter</a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn</a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
    </div>
    </div>
</footer>
)
}

export default Footer;