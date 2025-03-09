import { create } from "zustand";

interface Trade {
  id: string;
  stock: string;
  quantity: number;
  price: number;
}

interface PortfolioState {
  trades: Trade[];
  addTrade: (trade: Trade) => void;
  removeTrade: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  trades: [],
  addTrade: (trade) => set((state) => ({ trades: [...state.trades, trade] })),
  removeTrade: (id) =>
    set((state) => ({
      trades: state.trades.filter((trade) => trade.id !== id),
    })),
}));
