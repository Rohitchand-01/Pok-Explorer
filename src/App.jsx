import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonCard from './components/PokemonCard'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        const data = await response.json()
        const promises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
        const results = await Promise.all(promises)
        setPokemons(results)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType ? pokemon.types.some(t => t.type.name === filterType) : true
    return matchesName && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TypeFilter setFilterType={setFilterType} />
        </div>
        {loading && <p className="text-center text-xl font-medium text-gray-700 mt-20">Loading Pokémons...</p>}
        {error && <p className="text-center text-xl font-medium text-red-500 mt-20">Failed to load data.</p>}
        {!loading && !error && filteredPokemons.length === 0 && <p className="text-center text-xl font-medium text-gray-700 mt-20">No Pokémon found.</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10">
          {filteredPokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
