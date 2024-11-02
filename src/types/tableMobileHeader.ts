import { ICoinData } from "./coindata";

export const coinHeaderKeyMap: { [key: string]: keyof ICoinData } = {
  "💰 Coin": "name",
  "📄 Code": "symbol",
  "🤑 Price": "price_usd",
  "📉 Total Supply": "tsupply",
};
