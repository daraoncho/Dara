import { FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

import footerStyles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div id="footer_part">
      <footer className="py-5 lg:px-5">
        <div className="container mx-auto px-4">
          <div className={footerStyles.footer}>
            <div className="w-auto text-center lg:text-left">
              <p className="mb-0">
                Built and Designed by Adebayo Oluwadarasimi.
              </p>
              <p className="mb-0">All Rights Reserved. &copy;</p>
            </div>

            <div className="w-auto mt-4 lg:mt-0">
              <div className={footerStyles.social_icons}>
                <a href="https://github.com/daraoncho" className="mx-2">
                  <FaGithub />
                </a>
                <a href="mailto:adebayooluwadarasimi1@gmail.com" className="mx-2">
                  <IoMailOutline />
                </a>
                <a href="https://www.instagram.com/daraoncho" className="mx-2">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/in/oluwadarasimi-adebayo-446197311/" className="mx-2">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
