import { useState, useEffect } from "react";
import nav from "../styles/Navbar.module.css";
import avatar from "../assets/img/DaraAvatar.webp";
import { RiMenu2Line } from "react-icons/ri";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');

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

  return (
    <div>
      <nav className={nav.navbar}>
        <div className={nav.navbarContainer}>
          <a href="#">
            <span>Leo</span>
            <img src={avatar} alt="" />
          </a>
          <button
            className="p-2 border border-gray-400 rounded lg:hidden"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="block w-6 h-6 bg-gray-800">
              <RiMenu2Line />
            </span>
          </button>

          <div id="navbarNav">
            <div className={nav.navbarNav}>
              <ul>
                <li className={nav.navItem}>
                  <a
                    className={`${nav.navLink} ${activeLink === 'home' ? nav.active : ''}`}
                    href="#home"
                    onClick={() => setActiveLink('home')}
                  >
                    Home
                  </a>
                </li>
                <li className={nav.navItem}>
                  <a
                    className={`${nav.navLink} ${activeLink === 'about' ? nav.active : ''}`}
                    href="#about"
                    onClick={() => setActiveLink('about')}
                  >
                    About
                  </a>
                </li>
                <li className={nav.navItem}>
                  <a
                    className={`${nav.navLink} ${activeLink === 'experience' ? nav.active : ''}`}
                    href="#experience"
                    onClick={() => setActiveLink('experience')}
                  >
                    Experience
                  </a>
                </li>
                <li className={nav.navItem}>
                  <a
                    className={`${nav.navLink} ${activeLink === 'work' ? nav.active : ''}`}
                    href="#work"
                    onClick={() => setActiveLink('work')}
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
                    onClick={() => setActiveLink('contact')}
                  >
                    Contact
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
