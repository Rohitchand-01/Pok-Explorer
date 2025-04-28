function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <input
        type="text"
        placeholder="Search Pokémon..."
        className="w-full sm:w-64 md:w-80 lg:w-96 px-6 py-3 rounded-full bg-white bg-opacity-60 backdrop-blur-md shadow-md placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-300 transition"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  }
  
  export default SearchBar;
  