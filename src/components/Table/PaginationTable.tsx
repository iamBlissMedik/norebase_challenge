import ReactPaginate from "react-paginate";
import { TablePaginationProps } from "../../types/table";

const PaginationTable = ({
  handlePageChange,
  activeButton,
  currentPage,
  totalTableData,
  clickedButton,
  itemsPerPage,
}: TablePaginationProps) => {
  const pageCount = Math.ceil(totalTableData / itemsPerPage);

  return (
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
  );
};

export default PaginationTable;
