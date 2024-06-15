import { useState, useEffect } from "react";
import nav from "../styles/Navbar.module.css";
import avatar from "../assets/img/DaraAvatar.webp";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      
      sections.forEach(section => {
        if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
          setActiveLink(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className={nav.navbar}>
        <div className={nav.navbarContainer}>
          <a href="#">
            <span>Dara</span>
            <img src={avatar} alt="Avatar" />
          </a>
          <button
            className={nav.menuButton}
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <RxCross2 className={nav.icon} /> : <RiMenu2Line className={nav.icon} />}
          </button>

          <div id="navbarNav" className={`${nav.navbarNav} ${isMenuOpen ? nav.showMenu : ''}`}>
            <ul>
              <li className={nav.navItem}>
                <a
                  className={`${nav.navLink} ${activeLink === 'home' ? nav.active : ''}`}
                  href="#home"
                  onClick={() => { setActiveLink('home'); setIsMenuOpen(false); }}
                >
                  Home
                </a>
              </li>
              <li className={nav.navItem}>
                <a
                  className={`${nav.navLink} ${activeLink === 'about' ? nav.active : ''}`}
                  href="#about"
                  onClick={() => { setActiveLink('about'); setIsMenuOpen(false); }}
                >
                  About
                </a>
              </li>
              <li className={nav.navItem}>
                <a
                  className={`${nav.navLink} ${activeLink === 'experience' ? nav.active : ''}`}
                  href="#experience"
                  onClick={() => { setActiveLink('experience'); setIsMenuOpen(false); }}
                >
                  Experience
                </a>
              </li>
              <li className={nav.navItem}>
                <a
                  className={`${nav.navLink} ${activeLink === 'work' ? nav.active : ''}`}
                  href="#work"
                  onClick={() => { setActiveLink('work'); setIsMenuOpen(false); }}
                >
                  Work
                </a>
              </li>
              {/* <li>
                <a href="#blog">Blog</a>
              </li> */}
              {/* <li className={nav.navItem}>
                <a
                  className={`${nav.navLink} ${activeLink === 'contact' ? nav.active : ''}`}
                  href="#contact"
                  onClick={() => { setActiveLink('contact'); setIsMenuOpen(false); }}
                >
                  Contact
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
