import { TableProps } from "../../types/table";

const MobileTable = <T extends Record<string, any>>({
  tableData,
  headerKeyMap,
  headers,
  width,
}: TableProps<T>) => {
  return (
    <div
      className={`md:hidden space-y-4  w-full max-w-full  sm:w-[${width}px] sm:max-w-[${width}px] `}
    >
      {tableData.map((row) => (
        <div key={row.id} className=" p-4 odd:bg-gray-200 even:bg-white ">
          <div className="grid grid-cols-2 gap-2 h-full w-full">
            {headers.map((header) => (
              <div key={header}>
                <div>
                  <div className=" font-semibold text-gray-800">{header}:</div>
                  <div>
                    {header === "📉 Total Supply"
                      ? `${row[headerKeyMap["📉 Total Supply"]]} ${row.symbol}`
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
  );
};

export default MobileTable;
