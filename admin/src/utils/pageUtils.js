export const getTotalPages = ({ totalItems, itemsPerPage }) => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const getPageNumbers = ({
  currentPage,
  totalPages,
  maxVisiblePages = 7,
}) => {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);

  pages.push(1);

  let start = Math.max(2, currentPage - halfVisible);
  let end = Math.min(totalPages - 1, currentPage + halfVisible);

  if (end - start + 1 < maxVisiblePages - 2) {
    if (start === 2) {
      end = Math.min(totalPages - 1, start + maxVisiblePages - 3);
    } else {
      start = Math.max(2, end - maxVisiblePages + 3);
    }
  }

  if (start > 2) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};
