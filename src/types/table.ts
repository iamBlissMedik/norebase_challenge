export interface TableProps<T extends Record<string, any>> {
  headers: string[];
  tableData: T[];
  headerKeyMap: { [key: string]: keyof T };
  width: number;
}
export interface TablePaginationProps {
  handlePageChange: (selected: { selected: number }) => void;
  currentPage: number;
  activeButton: "prev" | "next" | null;
  clickedButton: "prev" | "next" | null;
  totalTableData: number;
  itemsPerPage: number;
}