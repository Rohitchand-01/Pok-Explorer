import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonCard from './components/PokemonCard'
import Favorites from './components/Favorites'
import PokemonDetails from './components/PokemonDetail'
import Comparison from './components/Comparison'

function App () {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites')
    return storedFavorites ? JSON.parse(storedFavorites) : []
  })
  const [comparePokemons, setComparePokemons] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=150'
        )
        const data = await response.json()
        const promises = data.results.map(pokemon =>
          fetch(pokemon.url).then(res => res.json())
        )
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

  const toggleFavorite = pokemon => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === pokemon.id)
      let updatedFavorites
      if (isFavorite) {
        updatedFavorites = prevFavorites.filter(fav => fav.id !== pokemon.id)
      } else {
        updatedFavorites = [...prevFavorites, pokemon]
      }
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

  const handleComparison = pokemon => {
    if (comparePokemons.some(p => p.id === pokemon.id)) {
      setComparePokemons(prev => prev.filter(p => p.id !== pokemon.id))
    } else {
      if (comparePokemons.length < 2) {
        // Limit to 2 Pokémon for comparison
        setComparePokemons(prev => [...prev, pokemon])
      }
    }
  }

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType = selectedTypes.length
      ? pokemon.types.some(t => selectedTypes.includes(t.type.name))
      : true
    return matchesName && matchesType
  })

  return (
    <Router>
      <div className='min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300'>
        <Header />
        <div className='max-w-6xl mx-auto p-6'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    <SearchBar
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                    <TypeFilter
                      selectedTypes={selectedTypes}
                      setSelectedTypes={setSelectedTypes}
                    />
                  </div>

                  {/* Compare Pokémon Button */}
                  <div className='mt-6 text-center'>
                    <Link
                      to='/compare'
                      className={`bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition ${
                        comparePokemons.length === 2
                          ? 'cursor-pointer'
                          : 'cursor-not-allowed opacity-50'
                      }`}
                      disabled={comparePokemons.length !== 2}
                    >
                      Compare Pokémon
                    </Link>
                  </div>

                  {loading && (
                    <p className='text-center text-xl font-medium text-gray-700 mt-20'>
                      Loading Pokémons...
                    </p>
                  )}
                  {error && (
                    <p className='text-center text-xl font-medium text-red-500 mt-20'>
                      Failed to load data.
                    </p>
                  )}
                  {!loading && !error && filteredPokemons.length === 0 && (
                    <p className='text-center text-xl font-medium text-gray-700 mt-20'>
                      No Pokémon found.
                    </p>
                  )}

                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10'>
                    {filteredPokemons.map(pokemon => (
                      <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        toggleFavorite={toggleFavorite}
                        isFavorite={favorites.some(
                          fav => fav.id === pokemon.id
                        )}
                        handleComparison={handleComparison}
                        isComparing={comparePokemons.some(
                          p => p.id === pokemon.id
                        )}
                      />
                    ))}
                  </div>
                </>
              }
            />

            <Route
              path='/favorites'
              element={
                <Favorites
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path='/pokemon/:id' element={<PokemonDetails />} />
            <Route
              path='/compare'
              element={<Comparison comparePokemons={comparePokemons} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
