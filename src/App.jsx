import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonCard from './components/PokemonCard'
import Favorites from './components/Favorites'
import PokemonDetails from './components/PokemonDetail'
import Comparison from './components/Comparison' // NEW: Import Comparison component

function App() {
  const [pokemons, setPokemons] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [sortBy, setSortBy] = useState('id-asc')
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites')
    return storedFavorites ? JSON.parse(storedFavorites) : []
  })

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit='+itemsPerPage)
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

  useEffect(() => {
    fetchData()
  }, [itemsPerPage])

  const toggleFavorite = (pokemon) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === pokemon.id)
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = prevFavorites.filter(fav => fav.id !== pokemon.id)
      } else {
        updatedFavorites = [...prevFavorites, pokemon]
      }
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedTypes.length
      ? pokemon.types.some(t => selectedTypes.includes(t.type.name))
      : true
    return matchesName && matchesType
  })

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300">
        <Header />
        <div className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={
              <>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <TypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
                </div>

                {/* Compare Pokémon Button */}
                <div className="mt-6 text-center flex justify-between">
                  <Link to="/compare" className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition">
                    Compare Pokémon
                  </Link>
                  <div className='display flex gap-4'>
                    <div>
                      <label htmlFor='sort'>Sort by</label>
                      <select onChange={(e) => setSortBy(e.target.value)} name='sort'>
                        <option value="id-asc">ID Ascending</option>
                        <option value="id-desc">ID Descending</option>
                        <option value="name-asc">Name Ascending</option>
                        <option value="name-desc">Name Descending</option>
                      </select>
                    </div>
                    <div>
                      <label for='cars'>Pokémons per page</label>
                      <select onChange={(e) => setItemsPerPage(Number(e.target.value))} name='Pages'>
                        <option onClick={() => setItemsPerPage(10)} value={10}>10</option>
                        <option onClick={() => setItemsPerPage(20)} value={20}>20</option>
                        <option onClick={() => setItemsPerPage(50)} value={50}>50</option>
                      </select>
                    </div>
                  </div>
                </div>

                {loading && <p className="text-center text-xl font-medium text-gray-700 mt-20">Loading Pokémons...</p>}
                {error && <p className="text-center text-xl font-medium text-red-500 mt-20">Failed to load data.</p>}
                {!loading && !error && filteredPokemons.length === 0 && <p className="text-center text-xl font-medium text-gray-700 mt-20">No Pokémon found.</p>}
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10">
                  {sortBy == "id-asc" && filteredPokemons.sort((a, b) => a.id - b.id).map(pokemon => (
                    <PokemonCard 
                      key={pokemon.id} 
                      pokemon={pokemon} 
                      toggleFavorite={toggleFavorite} 
                      isFavorite={favorites.some(fav => fav.id === pokemon.id)}
                    />
                  ))}
                  {sortBy == "id-desc" && filteredPokemons.sort((a, b) => b.id - a.id).map(pokemon => (
                    <PokemonCard 
                      key={pokemon.id} 
                      pokemon={pokemon} 
                      toggleFavorite={toggleFavorite} 
                      isFavorite={favorites.some(fav => fav.id === pokemon.id)}
                    />
                  ))}
                  {sortBy == "name-asc" && filteredPokemons.sort((a, b) => a.name.localeCompare(b.name)).map(pokemon => (
                    <PokemonCard 
                      key={pokemon.id} 
                      pokemon={pokemon} 
                      toggleFavorite={toggleFavorite} 
                      isFavorite={favorites.some(fav => fav.id === pokemon.id)}
                    />
                  ))}
                  {sortBy == "name-desc" && filteredPokemons.sort((a, b) => b.name.localeCompare(a.name)).map(pokemon => (
                    <PokemonCard 
                      key={pokemon.id} 
                      pokemon={pokemon} 
                      toggleFavorite={toggleFavorite} 
                      isFavorite={favorites.some(fav => fav.id === pokemon.id)}
                    />
                  ))}
                </div>
                
                <div className='p-4 mt-10 text-center bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100' onClick={() => setItemsPerPage(prev => {
                  const newLimit = prev + 10
                  setItemsPerPage(newLimit)
                  fetchData()
                  return newLimit
                })}>
                  <p>Load more</p>
                </div>
              </>
            } />
            
            <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />

            {/* New Route: Comparison */}
            <Route path="/compare" element={<Comparison pokemons={pokemons} />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
