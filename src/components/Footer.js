import React from "react";
import "./Footer.css"


const Footer = () => (
  <div className="footer">
    <p className="footer-text">&copy; {new Date().getFullYear()} Copyright:This is a shopping cart app</p>
  </div>
);

export default Footer;