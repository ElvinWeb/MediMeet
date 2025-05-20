export const getTotalPages = ({ totalItems, itemsPerPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return totalPages;
};

export const getPageNumbers = ({ currentPage, totalItems, itemsPerPage }) => {
  const pageNumbers = [];
  const totalPages = getTotalPages({ totalItems, itemsPerPage });

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    if (currentPage <= 4) {
      pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pageNumbers.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  return pageNumbers;
};
