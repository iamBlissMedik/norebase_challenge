import ReactPaginate from "react-paginate";
import { headerMapping, ValidHeader } from "../../types/mobileHeader";
import { ICoinData } from "../../types/coindata";
interface CustomTableProps {
  headers: readonly ValidHeader[];
  coins: ICoinData[];
  itemsPerPage: number;
  width: number;
  handlePageChange: (selected: { selected: number }) => void;
  currentPage: number;
  activeButton: "prev" | "next" | null;
  clickedButton: "prev" | "next" | null;
  totalCoins: number;
}

const CustomTable = ({
  headers,
  coins,
  itemsPerPage,
  width,
  handlePageChange,
  activeButton,
  currentPage,
  totalCoins,
  clickedButton,
}: CustomTableProps) => {
  const pageCount = Math.ceil(totalCoins / itemsPerPage);
  // Calculate the midpoint for splitting headers
  const midIndex = Math.ceil(headers.length / 2);
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
            {coins.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-gray-200 even:bg-white text-gray-800"
              >
                <td
                  className={`px-6 py-4 border-b align-top max-w-[${
                    width / headers.length
                  }px]`}
                >
                  <div className=" break-words">{row.name}</div>
                </td>
                <td
                  className={`px-6 py-4 border-b align-top max-w-[${
                    width / headers.length
                  }px]`}
                >
                  <div className=" break-words">{row.symbol}</div>
                </td>
                <td
                  className={`px-6 py-4 border-b align-top max-w-[${
                    width / headers.length
                  }px]`}
                >
                  <div className=" break-words">${row.price_usd}</div>
                </td>
                <td
                  className={`px-6 py-4 border-b align-top max-w-[${
                    width / headers.length
                  }px]`}
                >
                  <div className=" break-words ">
                    {row.tsupply} {row.symbol}
                  </div>
                </td>
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
            <div className="grid gap-2 h-full w-full">
              {/* Top section */}
              <div className="flex justify-between gap-1 w-full">
                {headers.slice(0, midIndex).map((header) => {
                  const value =
                    typeof headerMapping[header] === "function"
                      ? headerMapping[header](row) // Call function for custom formatting
                      : row[headerMapping[header]]; // Directly access row data

                  return (
                    <div
                      key={header}
                      className={`max-w-[${width / 2}px] w-1/2`}
                    >
                      <div className="font-semibold text-black">{header}:</div>
                      <div className="text-gray-800 break-words">{value}</div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom section */}
              <div className="flex justify-between gap-1  w-full">
                {headers.slice(midIndex).map((header) => {
                  const value =
                    typeof headerMapping[header] === "function"
                      ? headerMapping[header](row) // Call function for custom formatting
                      : row[headerMapping[header]]; // Directly access row data

                  return (
                    <div
                      key={header}
                      className={`max-w-[${width / 2}px] w-1/2 `}
                    >
                      <div className="font-semibold text-black">{header}:</div>
                      <div className="text-gray-800 break-words ">{value}</div>
                    </div>
                  );
                })}
              </div>
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
