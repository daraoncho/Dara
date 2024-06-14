import nav from "../styles/Navbar.module.css";
import dara from "../assets/img/dara.webp";
import { RiMenu2Line } from "react-icons/ri";

const Navbar = () => {
  return (
    <div>
      <nav className={nav.navbar}>
        <div className={nav.navbarContainer}>
          <a href="#">
            <span>Leo</span>
            <img src={dara} alt="" />
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
                  <a className={nav.navLink} href="#home">
                    Home
                  </a>
                </li>
                <li className={nav.navItem}>
                  <a className={nav.navLink} href="#about">
                    About
                  </a>
                </li>
                <li className={nav.navItem}>
                  <a className={nav.navLink} href="#experience">
                    Experience
                  </a>
                </li>
                <li className={nav.navItem}>
                  <a className={nav.navLink} href="#work">
                    Work
                  </a>
                </li>
                {/* <li>
                  <a href="#blog">Blog</a>
                </li> */}
                {/* <li className={nav.navItem}>
                  <a className={nav.navLink} href="#contact">
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
