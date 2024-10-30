import { useEffect, useState } from "react";
import CustomTable from "./components/ui/CustomTable";
import { ValidHeader } from "./types/mobileHeader";
import { getTickersApiService } from "./services/tickers";
import { ICoinData, ICoinDataResponse } from "./types/coindata";
import { ClipLoader } from "react-spinners";
const headers: ValidHeader[] = [
  "💰 Coin",
  "📄 Code",
  "🤑 Price",
  "📉 Total Supply",
];

function App() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeButton, setActiveButton] = useState<"prev" | "next" | null>(
    null
  );
  const [coins, setCoins] = useState<ICoinData[]>([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const PAGE_LIMIT = 10;
  const handleGetAllCoins = async (pageNumber: number) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: { selected: number }) => {
    setActiveButton(event.selected > currentPage ? "next" : "prev");
    setCurrentPage(event.selected);
  };
  useEffect(() => {
    handleGetAllCoins(currentPage);
  }, [currentPage]);
  return (
    <div className="w-full pt-5 flex justify-center h-screen overflow-auto py-4 bg-gray-200">
      {loading ? (
        <ClipLoader color="#36D7B7" size={60} />
      ) : (
        <CustomTable
          headers={headers}
          coins={coins}
          width={700}
          itemsPerPage={PAGE_LIMIT}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalCoins={totalCoins}
          activeButton={activeButton}
        />
      )}
    </div>
  );
}

export default App;
