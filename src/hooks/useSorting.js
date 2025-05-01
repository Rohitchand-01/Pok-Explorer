import { useState } from 'react';

const useSorting = () => {
  const [sortBy, setSortBy] = useState('id'); // Default sort by ID

  const changeSort = (sortOption) => {
    setSortBy(sortOption);
  };

  return {
    sortBy,
    changeSort,
  };
};

export default useSorting;
