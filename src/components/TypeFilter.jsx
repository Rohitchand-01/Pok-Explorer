const types = ['fire', 'water', 'grass', 'electric', 'bug', 'normal', 'poison', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon', 'flying', 'steel', 'dark'];

function TypeFilter({ setFilterType }) {
  return (
    <select
      className="w-full sm:w-64 md:w-80 lg:w-96 px-6 py-3 rounded-full bg-white bg-opacity-60 backdrop-blur-md shadow-md text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
      onChange={(e) => setFilterType(e.target.value)}
    >
      <option value="">All Types</option>
      {types.map(type => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default TypeFilter;
