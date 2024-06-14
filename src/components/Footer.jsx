import { FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";

import footerStyles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div id="footer_part">
      <footer className="py-5 lg:px-5">
        <div className="container">
          <div className={footerStyles.footer}>
            <div className="w-auto">
              <p className="mb-0">
                Built and Designed by Adebayo Oluwadarasimi.
              </p>
              <p className="mb-0">All Rights Reserved. &copy;</p>
            </div>

            <div className="w-auto">
              <div className={footerStyles.social_icons}>
                <a href="https://github.com/daraoncho">
                  <FaGithub />
                </a>
                <a href="mailto:adebayooluwadarasimi1@gmail.com">
                  <IoMailOutline />
                </a>
                <a href="https://www.instagram.com/daraoncho">
                  <FaInstagram />
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
