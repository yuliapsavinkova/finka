import { useTradeStore } from "../store/useTradesStore.ts";
import { useEffect } from "react";

const TradesList = () => {
  const { trades, fetchAllTrades, addTrade, saveAllTrades } = useTradeStore();

  useEffect(() => {
    fetchAllTrades(); // Fetch trades when component mounts
  }, []);

  return (
    <div>
      <h1>Trades</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index}>
              <td>{trade.symbol}</td>
              <td>{trade.quantity}</td>
              <td>{trade.price}</td>
              <td>{trade.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => {
          const newTrade = {
            symbol: "AAPL",
            quantity: 10,
            price: 150,
            date: new Date().toISOString().split("T")[0],
          };
          addTrade(newTrade);
        }}
      >
        Add Trade
      </button>

      <button onClick={saveAllTrades}>Save Trades to Google Sheets</button>
    </div>
  );
};

export default TradesList;
