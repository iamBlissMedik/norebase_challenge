import ReactPaginate from "react-paginate";
interface CustomTableProps<T extends Record<string, any>> {
  headers: string[];
  coins: T[];
  itemsPerPage: number;
  width: number;
  handlePageChange: (selected: { selected: number }) => void;
  currentPage: number;
  activeButton: "prev" | "next" | null;
  clickedButton: "prev" | "next" | null;
  totalCoins: number;
  headerKeyMap: { [key: string]: keyof T };
}

const CustomTable = <T extends Record<string, any>>({
  headers,
  coins,
  itemsPerPage,
  width,
  handlePageChange,
  activeButton,
  currentPage,
  totalCoins,
  clickedButton,
  headerKeyMap,
}: CustomTableProps<T>) => {
  const pageCount = Math.ceil(totalCoins / itemsPerPage);
  return (
    <div
      className={`md:w-[${width}px] md:max-w-[${width}px] shadow-2xl  h-fit pb-3 bg-white rounded-lg`}
    >
      {/* Desktop Table */}
      <div className="hidden md:block w-full">
        <table className={`w-[${width}px] max-w-[${width}px]   table-fixed `}>
          <thead>
            <tr className="bg-white text-left font-semibold text-gray-800">
              {headers.map((header) => (
                <th key={header} className="px-6 py-3 border-b w-1/4">
                  <div className="break-words">{header}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coins.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="odd:bg-gray-200 even:bg-white text-gray-800"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className={`px-6 py-4 border-b align-top max-w-[${
                      width / headers.length
                    }px]`}
                  >
                    <div className="break-words">
                      {header === "📉 Total Supply"
                        ? `${row[headerKeyMap["📉 Total Supply"]]} ${
                            row.symbol
                          }`
                        : header === "🤑 Price"
                        ? `$${row[headerKeyMap["🤑 Price"]]}`
                        : row[headerKeyMap[header]]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <div
        className={`md:hidden space-y-4  w-full max-w-full  sm:w-[${width}px] sm:max-w-[${width}px] `}
      >
        {coins.map((row) => (
          <div key={row.id} className=" p-4 odd:bg-gray-200 even:bg-white ">
            <div className="grid grid-cols-2 gap-2 h-full w-full">
              {headers.map((header) => (
                <div key={header}>
                  <div>
                    <div className=" font-semibold text-gray-800">
                      {header}:
                    </div>
                    <div>
                      {header === "📉 Total Supply"
                        ? `${row[headerKeyMap["📉 Total Supply"]]} ${
                            row.symbol
                          }`
                        : header === "🤑 Price"
                        ? `$${row[headerKeyMap["🤑 Price"]]}`
                        : row[headerKeyMap[header]]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="w-full mt-4 bg-white">
        <ReactPaginate
          previousLabel="← Previous "
          nextLabel="Next →"
          breakLabel={null}
          onPageChange={handlePageChange}
          pageCount={pageCount}
          pageRangeDisplayed={0}
          marginPagesDisplayed={0}
          containerClassName="flex items-center justify-between px-4 md:px-6"
          previousClassName={`
             text-sm font-semibold
            rounded-md
            ${currentPage === 0 ? "invisible" : ""}
            ${
              activeButton === "prev"
                ? " border-2 border-yellow-200 "
                : "border-none"
            }
            ${clickedButton === "prev" && " border-2 !border-green-700 "}
          `}
          nextClassName={`  text-sm font-semibold
            rounded-md ${currentPage === pageCount - 1 ? "invisible" : ""}   ${
            activeButton === "next"
              ? " border-2 border-yellow-200 "
              : "border-none"
          } ${clickedButton === "next" && " border-2 !border-green-700 "}`}
          activeClassName="border border-red-400"
          activeLinkClassName="px-3 py-1 text-blue-500 font-semibold"
          renderOnZeroPageCount={null}
          pageClassName="hidden"
          pageLinkClassName="hidden"
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default CustomTable;
