import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonCard from './components/PokemonCard'
import Favorites from './components/Favorites'
import PokemonDetails from './components/PokemonDetail'
import Comparison from './components/Comparison'
import RandomButton from './components/RandomButton'

function App () {
  const [pokemons, setPokemons] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [sortBy, setSortBy] = useState('id-asc')
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}`
        )
        const data = await res.json()
        const details = await Promise.all(
          data.results.map(p => fetch(p.url).then(r => r.json()))
        )
        setPokemons(details)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [itemsPerPage])

  const toggleFavorite = pokemon => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.id === pokemon.id)
      const updated = isFav
        ? prev.filter(f => f.id !== pokemon.id)
        : [...prev, pokemon]
      localStorage.setItem('favorites', JSON.stringify(updated))
      return updated
    })
  }

  const filteredPokemons = pokemons.filter(
    p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTypes.length === 0 ||
        p.types.some(t => selectedTypes.includes(t.type.name)))
  )

  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    switch (sortBy) {
      case 'id-asc':
        return a.id - b.id
      case 'id-desc':
        return b.id - a.id
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
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

                  <div className='mt-6 flex flex-col sm:flex-row justify-between gap-4 items-center'>
                    <Link
                      to='/compare'
                      className='bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition'
                    >
                      Compare Pokémon
                    </Link>

                    <RandomButton pokemons={pokemons} />
                  </div>

                  <div className='mt-6 flex flex-col sm:flex-row justify-between gap-4 items-center'>
                    <div className='flex flex-col'>
                      <label
                        htmlFor='sort'
                        className='text-sm text-gray-700 mb-1'
                      >
                        Sort by
                      </label>
                      <select
                        id='sort'
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className='p-2 rounded-md border border-gray-300 bg-white'
                      >
                        <option value='id-asc'>ID Ascending</option>
                        <option value='id-desc'>ID Descending</option>
                        <option value='name-asc'>Name Ascending</option>
                        <option value='name-desc'>Name Descending</option>
                      </select>
                    </div>

                    <div className='flex flex-col'>
                      <label
                        htmlFor='itemsPerPage'
                        className='text-sm text-gray-700 mb-1'
                      >
                        Pokémons per page
                      </label>
                      <select
                        id='itemsPerPage'
                        value={itemsPerPage}
                        onChange={e => setItemsPerPage(Number(e.target.value))}
                        className='p-2 rounded-md border border-gray-300 bg-white'
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>
                  </div>

                  {loading && (
                    <p className='text-center mt-20 text-gray-700 font-medium'>
                      Loading Pokémons...
                    </p>
                  )}
                  {error && (
                    <p className='text-center mt-20 text-red-500 font-medium'>
                      Failed to load data.
                    </p>
                  )}
                  {!loading && !error && sortedPokemons.length === 0 && (
                    <p className='text-center mt-20 text-gray-700 font-medium'>
                      No Pokémon found.
                    </p>
                  )}

                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10'>
                    {sortedPokemons.map(pokemon => (
                      <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        toggleFavorite={toggleFavorite}
                        isFavorite={favorites.some(f => f.id === pokemon.id)}
                      />
                    ))}
                  </div>

                  {!loading && !error && (
                    <div
                      onClick={() => setItemsPerPage(prev => prev + 10)}
                      className='p-4 mt-10 text-center bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition'
                    >
                      <p className='text-gray-700'>Load more</p>
                    </div>
                  )}
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
              element={<Comparison pokemons={pokemons} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
