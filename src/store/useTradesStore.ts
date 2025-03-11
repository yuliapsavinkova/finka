import { create } from "zustand";

interface Trade {
  symbol: string;
  quantity: number;
  price: number;
  date: string;
}

interface TradeStore {
  trades: Trade[];
  fetchAllTrades: () => Promise<void>;
  addTrade: (trade: Trade) => void;
  saveAllTrades: () => Promise<void>;
}

export const useTradeStore = create<TradeStore>((set, get) => ({
  trades: [],
  fetchAllTrades: async () => {
    try {
      const response = await fetch("http://localhost:5001/api/google-trades");
      const data = await response.json();
      set({ trades: data.map(([symbol, quantity, price, date]: any) => ({ symbol, quantity, price, date })) });
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  },
  addTrade: (trade) => {
    set((state) => ({ trades: [...state.trades, trade] }));
  },
  saveAllTrades: async () => {
    try {
      const response = await fetch("http://localhost:5001/api/google-trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trades: get().trades.map(({ symbol, quantity, price, date }) => [symbol, quantity, price, date]),
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error saving trades:", error);
    }
  },
}));
