import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Footer from "./components/Footer";
import app from "./styles/Navbar.module.css";
import {
  GameModeProvider,
  ThoughtFragmentsGame,
  GameToggle,
} from "./features/thought-fragments";

function App() {
  return (
    <GameModeProvider>
      <div className="App">
        <Navbar />
        <GameToggle variant="floating" />
        <ThoughtFragmentsGame />
        <div id="portfolio-content" className={app.content_wrapper}>
          <Home />
          <About />
          <Experience />
          <Work />
          <Footer />
        </div>
      </div>
    </GameModeProvider>
  );
}

export default App;
