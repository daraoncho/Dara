import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import app from "./styles/Navbar.module.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className={app.content_wrapper}>
        <Home />
        <About />
        <Experience />
        <Work />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
