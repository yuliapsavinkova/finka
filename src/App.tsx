import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Portfolio from "./components/Portfolio";
// import * as d3 from "d3";

function Stocks() {
  return (
    <div>
      <h1>Stock Portfolio Tracker</h1>
      <Portfolio />
    </div>
  );
}

function Chart() {
  // Example D3.js setup
  return <div id="chart">D3.js Chart Placeholder</div>;
}

function Home() {
  return (
    <>
      <Link to="/portfolio">Go to Portfolio</Link>
      <br />
      <Link to="/chart">Go to Chart</Link>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/portfolio" element={<Stocks />} />
      </Routes>
    </Router>
  );
}

export default App;
