import { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';

function SortOptions() {
  const { sortOption, setSortOption } = useContext(PokemonContext);

  return (
    <select
      className="w-full sm:w-64 md:w-80 lg:w-96 px-6 py-3 rounded-full bg-white bg-opacity-60 backdrop-blur-md shadow-md text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="id">Sort by ID</option>
      <option value="name">Sort by Name</option>
      <option value="alphabetical">Sort Alphabetically</option>
    </select>
  );
}

export default SortOptions;
