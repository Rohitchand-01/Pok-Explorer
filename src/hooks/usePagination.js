import { useState } from 'react';

const usePagination = (initialPage = 1, initialItemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
  const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  const goToPage = (page) => setCurrentPage(page);

  const setItemsPerPageHandler = (items) => setItemsPerPage(items);

  return {
    currentPage,
    itemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPageHandler,
  };
};

export default usePagination;
