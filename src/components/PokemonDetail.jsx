import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PokemonDetail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [evolutionChain, setEvolutionChain] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true) // Start loading state
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
        setPokemon(data)

        const speciesResponse = await fetch(data.species.url)
        const speciesData = await speciesResponse.json()
        const evolutionResponse = await fetch(speciesData.evolution_chain.url)
        const evolutionData = await evolutionResponse.json()
        setEvolutionChain(evolutionData)
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error)
      } finally {
        setLoading(false) // End loading state
      }
    }

    fetchPokemonData()
  }, [id])

  if (loading) return <p className="text-center text-lg font-semibold text-gray-700 mt-10">Loading...</p>
  if (!pokemon) return <p className="text-center text-lg font-semibold text-red-500 mt-10">Failed to load Pokémon data.</p>

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300 rounded-xl shadow-lg mt-10">
      <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-900 capitalize">{pokemon.name}</h2>

      <div className="flex flex-col sm:flex-row sm:justify-center gap-12">
        <div className="flex justify-center sm:w-1/2">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-64 h-64 sm:w-80 sm:h-80 object-contain mb-4 sm:mb-0 shadow-xl rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
          />
        </div>

        <div className="flex flex-col gap-6 sm:w-1/2 text-gray-800">
          <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Stats</h3>
            <ul className="space-y-2 text-gray-600">
              {pokemon.stats.map(stat => (
                <li key={stat.stat.name} className="hover:text-blue-600 transition-all duration-300">
                  <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Abilities</h3>
            <ul className="space-y-2 text-gray-600">
              {pokemon.abilities.map(ability => (
                <li key={ability.ability.name} className="hover:text-blue-600 transition-all duration-300">
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Moves</h3>
            <ul className="space-y-2 text-gray-600">
              {pokemon.moves.slice(0, 10).map(move => (
                <li key={move.move.name} className="hover:text-blue-600 transition-all duration-300">
                  {move.move.name}
                </li>
              ))}
            </ul>
          </div>

          {evolutionChain && (
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Evolution Chain</h3>
              <ul className="space-y-2 text-gray-600">
                {evolutionChain.chain.evolves_to.map(evolution => (
                  <li key={evolution.species.name} className="hover:text-blue-600 transition-all duration-300">
                    {evolution.species.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
