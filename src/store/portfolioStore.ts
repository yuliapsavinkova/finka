// import { create } from "zustand";
// import { fetchTrades, saveTrades } from "../utils/googleSheets";

// interface Trade {
//   id: string;
//   stock: string;
//   quantity: number;
//   price: number;
// }

// interface PortfolioState {
//   trades: Trade[];
//   loadTrades: () => Promise<void>;
//   addTrade: (trade: Trade) => Promise<void>;
// }

// export const usePortfolioStore = create<PortfolioState>((set) => ({
//   trades: [],

//   loadTrades: async () => {
//     const fetchedTrades = await fetchTrades();
//     set({ trades: fetchedTrades });
//   },

//   addTrade: async (trade) => {
//     await saveTrades(trade);
//     set((state) => ({ trades: [...state.trades, trade] }));
//   },
// }));
