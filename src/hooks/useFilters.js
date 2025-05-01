import { useState } from 'react';

const useFilters = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggleTypeFilter = (type) => {
    setSelectedTypes(prevState => {
      if (prevState.includes(type)) {
        return prevState.filter(item => item !== type);
      }
      return [...prevState, type];
    });
  };

  const clearFilters = () => setSelectedTypes([]);

  return {
    selectedTypes,
    toggleTypeFilter,
    clearFilters,
  };
};

export default useFilters;
