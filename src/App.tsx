import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import { useEffect, useState } from "react";
import TradesList from "./components/TradesList.tsx";

// import Portfolio from "./components/Portfolio";
// import * as d3 from "d3";

// function Stocks() {
//   return (
//     <div>
//       <h1>Stock Portfolio Tracker</h1>
//       <Portfolio />
//     </div>
//   );
// }

// function Chart() {
//   return <div id="chart">D3.js Chart Placeholder</div>;
// }

function Home() {
  return (
    <>
      <Link to="/trades">Go to Trades</Link>
      <br />
      <Link to="/portfolio">Go to Portfolio</Link>
      <br />
      <Link to="/chart">Go to Chart</Link>
    </>
  );
}

function App() {
  return (
    // <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trades" element={<TradesList />} />
        {/* <Route path="/portfolio" element={<Stocks />} /> */}
        {/* <Route path="/chart" element={<Chart />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
