import { ICoinData } from "./coindata";

export const headerMapping: Record<
  string,
  keyof ICoinData | ((row: ICoinData) => string)
> = {
  "💰 Coin": "name",
  "📄 Code": "symbol",
  "🤑 Price": (row) => `$${row.price_usd}`,
  "📉 Total Supply": (row) => `${row.tsupply} ${row.symbol}`,
};
// Create a type from the keys of headerMapping
export type HeaderKeys = keyof typeof headerMapping;

export const VALID_HEADERS = [
  "💰 Coin",
  "📄 Code",
  "🤑 Price",
  "📉 Total Supply",
] as const;
export type ValidHeader = (typeof VALID_HEADERS)[number];
