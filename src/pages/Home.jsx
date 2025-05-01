import { useContext } from 'react'
import { PokemonContext } from '../contexts/PokemonContext'
import PokemonCard from '../components/PokemonCard'
import SearchBar from '../components/SearchBar'
import TypeFilter from '../components/TypeFilter'
import SortOptions from '../components/SortOptions'
import Pagination from '../components/Pagination'
import Header from '../components/Header'
import RandomButton from '../components/RandomButton'

function Home() {
  const {
    loading,
    error,
    paginated,
    setSearchTerm,
    searchTerm,
    selectedTypes,
    setSelectedTypes,
    sortOption,
    setSortOption,
    itemsPerPage,
    setItemsPerPage
  } = useContext(PokemonContext)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300">
      <Header />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <RandomButton />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
          <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
        </div>
        <div className="flex justify-end">
          <select
            className="px-4 py-2 rounded bg-white text-gray-800"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
        {loading && <p className="text-center text-xl text-gray-800">Loading...</p>}
        {error && <p className="text-center text-xl text-red-600">Something went wrong</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {paginated.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <Pagination />
      </div>
    </div>
  )
}

export default Home
