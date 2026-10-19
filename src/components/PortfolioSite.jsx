import { useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Experience from "./Experience";
import Work from "./Work";
import Footer from "./Footer";
import app from "../styles/Navbar.module.css";
import { ThoughtFragmentsGame, GameToggle } from "../features/thought-fragments";

/** Main single-page portfolio (Home → Work). */
export default function PortfolioSite() {
  useEffect(() => {
    document.title = "Dara";

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const scrollToHash = () => {
      const target = document.getElementById(hash);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    };

    requestAnimationFrame(scrollToHash);
  }, []);

  return (
    <>
      <Navbar enableGame />
      <GameToggle variant="floating" />
      <ThoughtFragmentsGame />
      <div id="portfolio-content" className={app.content_wrapper}>
        <Home />
        <About />
        <Experience />
        <Work />
        <Footer />
      </div>
    </>
  );
}
