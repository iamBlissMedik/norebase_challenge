import DesktopTable from "../Table/DesktopTable";
import MobileTable from "../Table/MobileTable";
import PaginationTable from "../Table/PaginationTable";
interface CustomTableProps<T extends Record<string, any>> {
  headers: string[];
  tableData: T[];
  itemsPerPage: number;
  width: number;
  handlePageChange: (selected: { selected: number }) => void;
  currentPage: number;
  activeButton: "prev" | "next" | null;
  clickedButton: "prev" | "next" | null;
  totalTableData: number;
  headerKeyMap: { [key: string]: keyof T };
}

const CustomTable = <T extends Record<string, any>>({
  headers,
  tableData,
  itemsPerPage,
  width,
  handlePageChange,
  activeButton,
  currentPage,
  totalTableData,
  clickedButton,
  headerKeyMap,
}: CustomTableProps<T>) => {
  return (
    <div
      className={`md:w-[${width}px] md:max-w-[${width}px] shadow-2xl  h-fit pb-3 bg-white rounded-lg`}
    >
      <DesktopTable
        tableData={tableData}
        headerKeyMap={headerKeyMap}
        headers={headers}
        width={width}
      />
      <MobileTable
        tableData={tableData}
        headerKeyMap={headerKeyMap}
        headers={headers}
        width={width}
      />
      <PaginationTable
        activeButton={activeButton}
        clickedButton={clickedButton}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalTableData={totalTableData}
      />
    </div>
  );
};

export default CustomTable;
