import { useState, useEffect } from "react";
import { ICoinData, ICoinDataResponse } from "../types/coindata";
import { getTickersApiService } from "../services/tickers";
const useCoins = () => {
  const PAGE_LIMIT = 10;
  const [coins, setCoins] = useState<ICoinData[]>([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeButton, setActiveButton] = useState<"prev" | "next" | null>(
    null
  );
  const [clickedButton, setClickedButton] = useState<"prev" | "next" | null>(
    null
  );

  const handleGetAllCoins = async (pageNumber: number) => {
    const start = pageNumber * PAGE_LIMIT;
    try {
      const {
        data: { data, info },
      } = await getTickersApiService(start, PAGE_LIMIT);
      const response: ICoinDataResponse[] = data;
      const coinsData: ICoinData[] = response.map((coin) => ({
        id: coin.id,
        name: coin.name,
        price_usd: coin.price_usd,
        symbol: coin.symbol,
        tsupply: coin.tsupply,
      }));
      setCoins(coinsData);
      setTotalCoins(info.coins_num);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const handlePageChange = (event: { selected: number }) => {
    setActiveButton(event.selected > currentPage ? "next" : "prev");
    setClickedButton(event.selected > currentPage ? "next" : "prev");
    setTimeout(() => setClickedButton(null), 200);

    setCurrentPage(event.selected);
  };

  useEffect(() => {
    handleGetAllCoins(currentPage);
  }, [currentPage]);

  return {
    coins,
    totalCoins,
    currentPage,
    handlePageChange,
    activeButton,
    clickedButton,
    PAGE_LIMIT,
  };
};

export default useCoins;
