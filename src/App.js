import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StockOverviewPage } from "./pages/StockOverviewPage";
import { StockDetailPage } from "./pages/StockDetailPage";
import { WatchListContextProvider } from "./context/watchListContext";
import logo from "./images/logo.png";

import "./App.css";

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <div className="text-center">
            <Link to="/">
              <img
                src={logo}
                alt="Trading King"
                style={{ maxWidth: "400px" }}
              />
            </Link>
          </div>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
