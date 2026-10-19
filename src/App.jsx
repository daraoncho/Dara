import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameModeProvider } from "./features/thought-fragments";
import PortfolioSite from "./components/PortfolioSite";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <GameModeProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<PortfolioSite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GameModeProvider>
  );
}

export default App;
