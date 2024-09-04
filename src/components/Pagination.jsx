import React from "react";

const Pagination = ({
  pagination,
  previousPage,
  nextPage,
  currentPage,
  setCurrentPage,
  pageNumbers,
}) => {
  return (
    <div className="pagination flex gap-3 border py-2 px-4 rounded-md">
      <button
        className={`prev px-3 py-1 rounded-md ${
          !pagination.prev
            ? "text-gray-400 cursor-not-allowed bg-gray-200"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={previousPage}
        disabled={!pagination.prev}
      >
        Previous
      </button>
      {pageNumbers.map((page, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(page)}
          className={`${
            currentPage === page
              ? "bg-[#286140] text-white px-3 py-1 rounded-md"
              : "text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-md"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        className={`next px-3 py-1 rounded-md ${
          !pagination.next
            ? "text-gray-400 cursor-not-allowed bg-gray-200"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={nextPage}
        disabled={!pagination.next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
