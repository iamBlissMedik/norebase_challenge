import { TableProps } from "../../types/table";

const DesktopTable =<T extends Record<string, any>> ({tableData,headerKeyMap,headers,width}:TableProps<T>) => {
  return (
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
          {tableData.map((row, rowIndex) => (
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
                      ? `${row[headerKeyMap["📉 Total Supply"]]} ${row.symbol}`
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
  );
}

export default DesktopTable