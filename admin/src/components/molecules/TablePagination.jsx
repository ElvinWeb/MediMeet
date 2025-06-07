import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { useMemo, useCallback } from "react";

// Utility functions (moved inline for better organization)
const getTotalPages = ({ totalItems, itemsPerPage }) => {
  return Math.ceil(totalItems / itemsPerPage);
};

const getPageNumbers = ({ currentPage, totalPages, maxVisiblePages = 7 }) => {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);
  
  // Always show first page
  pages.push(1);
  
  let start = Math.max(2, currentPage - halfVisible);
  let end = Math.min(totalPages - 1, currentPage + halfVisible);
  
  // Adjust range to maintain consistent number of visible pages
  if (end - start + 1 < maxVisiblePages - 2) {
    if (start === 2) {
      end = Math.min(totalPages - 1, start + maxVisiblePages - 3);
    } else {
      start = Math.max(2, end - maxVisiblePages + 3);
    }
  }
  
  // Add ellipsis after first page if needed
  if (start > 2) {
    pages.push('...');
  }
  
  // Add middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  // Add ellipsis before last page if needed
  if (end < totalPages - 1) {
    pages.push('...');
  }
  
  // Always show last page (if more than 1 page)
  if (totalPages > 1) {
    pages.push(totalPages);
  }
  
  return pages;
};

const TablePagination = ({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  showItemsPerPage = false,
  itemsPerPageOptions = [10, 25, 50, 100],
  onItemsPerPageChange,
  maxVisiblePages = 7,
  showTotalItems = true,
  showPageInfo = true,
  className = "",
  size = "default",
}) => {
  const totalPages = useMemo(
    () => getTotalPages({ totalItems, itemsPerPage }),
    [totalItems, itemsPerPage]
  );

  const pageNumbers = useMemo(
    () => getPageNumbers({ currentPage, totalPages, maxVisiblePages }),
    [currentPage, totalPages, maxVisiblePages]
  );

  const startItem = useMemo(
    () => (currentPage - 1) * itemsPerPage + 1,
    [currentPage, itemsPerPage]
  );

  const endItem = useMemo(
    () => Math.min(currentPage * itemsPerPage, totalItems),
    [currentPage, itemsPerPage, totalItems]
  );

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = useCallback((page) => {
    if (page !== currentPage && typeof page === 'number') {
      onPageChange(page);
    }
  }, [currentPage, onPageChange]);

  const handleItemsPerPageChange = useCallback((event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  }, [onItemsPerPageChange]);

  

  const sizeClasses = {
    small: {
      container: "px-3 py-2",
      button: "px-2 py-1 text-xs",
      text: "text-xs",
      icon: "size-4"
    },
    default: {
      container: "px-4 py-3 sm:px-6",
      button: "px-4 py-2 text-sm",
      text: "text-sm",
      icon: "size-5"
    },
    large: {
      container: "px-6 py-4",
      button: "px-6 py-3 text-base",
      text: "text-base",
      icon: "size-6"
    }
  };

  const styles = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={`flex items-center justify-between border-t border-gray-200 bg-white ${styles.container} ${className}`}>
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white ${styles.button} font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white`}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        
        {showPageInfo && (
          <span className={`flex items-center ${styles.text} text-gray-700`}>
            Page {currentPage} of {totalPages}
          </span>
        )}
        
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white ${styles.button} font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white`}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between gap-5">
        <div className="flex items-center space-x-4">
          {showItemsPerPage && onItemsPerPageChange && (
            <div className="flex items-center space-x-2">
              <label htmlFor="items-per-page" className={`${styles.text} text-gray-700`}>
                Show:
              </label>
              <select
                id="items-per-page"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className={`rounded-md border border-gray-300 ${styles.text} text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showTotalItems && (
            <div>
              <p className={`${styles.text} text-gray-700`}>
                Showing{" "}
                <span className="font-medium">{startItem}</span>
                {" "}to{" "}
                <span className="font-medium">{endItem}</span>
                {" "}of{" "}
                <span className="font-medium">{totalItems.toLocaleString()}</span>
                {" "}results
              </p>
            </div>
          )}
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination navigation"
            role="navigation"
          >
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white`}
              aria-label="Go to previous page"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className={styles.icon} aria-hidden="true" />
            </button>

            {pageNumbers.map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={`page-${page}`}
                  onClick={() => handlePageClick(page)}
                  disabled={currentPage === page}
                  className={`relative inline-flex items-center ${styles.button} font-semibold transition-colors duration-150 ${
                    currentPage === page
                      ? "z-10 bg-indigo-600 text-white focus:z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-default"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  }`}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ) : (
                <span
                  key={`ellipsis-${index}`}
                  className={`relative inline-flex items-center ${styles.button} font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset cursor-default`}
                  aria-hidden="true"
                >
                  {page}
                </span>
              )
            )}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white`}
              aria-label="Go to next page"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className={styles.icon} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

TablePagination.propTypes = {
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  showItemsPerPage: PropTypes.bool,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  onItemsPerPageChange: PropTypes.func,
  maxVisiblePages: PropTypes.number,
  showTotalItems: PropTypes.bool,
  showPageInfo: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large']),
};

export default TablePagination;