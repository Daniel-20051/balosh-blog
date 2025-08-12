export interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const getTotalPages = (totalItems: number, pageSize: number) => {
  if (pageSize <= 0) return 0;
  return Math.max(1, Math.ceil(totalItems / pageSize));
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const totalPages = getTotalPages(totalItems, pageSize);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const visiblePages = () => {
    const pages: number[] = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }
    for (let p = start; p <= end; p += 1) pages.push(p);
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-between gap-2 mt-4"
      aria-label="Pagination"
    >
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages} • {totalItems} items
      </div>
      <ul className="inline-flex items-center gap-1">
        <li>
          <button
            className={`px-3 py-2 cursor-pointer text-sm rounded-md border ${
              isFirst
                ? "text-gray-400 bg-white border-gray-200 cursor-not-allowed"
                : "text-gray-700 bg-white hover:bg-gray-50 border-gray-300"
            }`}
            onClick={() => !isFirst && onPageChange(1)}
            disabled={isFirst}
          >
            First
          </button>
        </li>
        <li>
          <button
            className={`px-3 py-2 cursor-pointer text-sm rounded-md border ${
              isFirst
                ? "text-gray-400 bg-white border-gray-200 cursor-not-allowed"
                : "text-gray-700 bg-white hover:bg-gray-50 border-gray-300"
            }`}
            onClick={() => !isFirst && onPageChange(currentPage - 1)}
            disabled={isFirst}
          >
            Prev
          </button>
        </li>
        {visiblePages().map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-2 cursor-pointer text-sm rounded-md border ${
                page === currentPage
                  ? "bg-[#f88326] text-white border-[#f88326]"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`px-3 py-2 cursor-pointer text-sm rounded-md border ${
              isLast
                ? "text-gray-400 bg-white border-gray-200 cursor-not-allowed"
                : "text-gray-700 bg-white hover:bg-gray-50 border-gray-300"
            }`}
            onClick={() => !isLast && onPageChange(currentPage + 1)}
            disabled={isLast}
          >
            Next
          </button>
        </li>
        <li>
          <button
            className={`px-3 py-2 cursor-pointer text-sm rounded-md border ${
              isLast
                ? "text-gray-400 bg-white border-gray-200 cursor-not-allowed"
                : "text-gray-700 bg-white hover:bg-gray-50 border-gray-300"
            }`}
            onClick={() => !isLast && onPageChange(totalPages)}
            disabled={isLast}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
