import CustomTable from "./components/ui/CustomTable";
import { coinHeaderKeyMap } from "./types/tableMobileHeader";
import useCoins from "./hooks/useCoins";
const coinHeaders = ["💰 Coin", "📄 Code", "🤑 Price", "📉 Total Supply"];
function App() {
  const {
    coins,
    totalCoins,
    currentPage,
    handlePageChange,
    activeButton,
    clickedButton,
    PAGE_LIMIT,
  } = useCoins();
  return (
    <>
      {coins && (
        <div className="w-full pt-5 flex justify-center h-screen overflow-auto py-4 bg-gray-200">
          <CustomTable
            headers={coinHeaders}
            tableData={coins}
            width={700}
            itemsPerPage={PAGE_LIMIT}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalTableData={totalCoins}
            activeButton={activeButton}
            clickedButton={clickedButton}
            headerKeyMap={coinHeaderKeyMap}
          />
        </div>
      )}
    </>
  );
}

export default App;
