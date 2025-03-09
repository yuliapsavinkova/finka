import { usePortfolioStore } from "../store/portfolioStore";

function Portfolio() {
  const { trades, addTrade, removeTrade } = usePortfolioStore();

  const handleAddTrade = () => {
    const newTrade = {
      id: Date.now().toString(),
      stock: "AAPL",
      quantity: 10,
      price: 150,
    };
    addTrade(newTrade);
  };

  return (
    <div>
      <h2>Portfolio Trades</h2>
      <button onClick={handleAddTrade}>Add Trade</button>
      <ul>
        {trades.map((trade) => (
          <li key={trade.id}>
            {trade.stock} - {trade.quantity} shares @ ${trade.price}
            <button onClick={() => removeTrade(trade.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;
