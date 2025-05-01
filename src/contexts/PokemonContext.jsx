import { createContext, useEffect, useMemo, useState, useCallback } from 'react'

export const PokemonContext = createContext()

export function PokemonProvider({ children }) {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState('id-asc')

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        const data = await res.json()
        const details = await Promise.all(
          data.results.map(p => fetch(p.url).then(res => res.json()))
        )
        setPokemons(details)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = useCallback((pokemon) => {
    setFavorites(prev =>
      prev.find(fav => fav.id === pokemon.id)
        ? prev.filter(fav => fav.id !== pokemon.id)
        : [...prev, pokemon]
    )
  }, [])

  const filtered = useMemo(() => {
    return pokemons.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.every(type =>
        p.types.map(t => t.type.name).includes(type)
      )
      return matchesSearch && matchesTypes
    })
  }, [pokemons, searchTerm, selectedTypes])

  const sorted = useMemo(() => {
    const sortedPokemons = [...filtered]
    if (sortOption === 'id-asc') sortedPokemons.sort((a, b) => a.id - b.id)
    if (sortOption === 'id-desc') sortedPokemons.sort((a, b) => b.id - a.id)
    if (sortOption === 'name-asc') sortedPokemons.sort((a, b) => a.name.localeCompare(b.name))
    if (sortOption === 'name-desc') sortedPokemons.sort((a, b) => b.name.localeCompare(a.name))
    return sortedPokemons
  }, [filtered, sortOption])

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sorted.slice(start, end)
  }, [sorted, currentPage, itemsPerPage])

  return (
    <PokemonContext.Provider value={{
      pokemons,
      loading,
      error,
      searchTerm,
      setSearchTerm,
      selectedTypes,
      setSelectedTypes,
      favorites,
      toggleFavorite,
      itemsPerPage,
      setItemsPerPage,
      currentPage,
      setCurrentPage,
      sortOption,
      setSortOption,
      paginated,
      filtered,
      sorted
    }}>
      {children}
    </PokemonContext.Provider>
  )
}
