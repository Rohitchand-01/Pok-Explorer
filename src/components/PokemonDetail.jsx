import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PokemonDetail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [evolutionChain, setEvolutionChain] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
        setPokemon(data)

        const speciesResponse = await fetch(data.species.url)
        const speciesData = await speciesResponse.json()
        const evolutionResponse = await fetch(speciesData.evolution_chain.url)
        const evolutionData = await evolutionResponse.json()

        const chain = []
        let current = evolutionData.chain

        while (current) {
          chain.push(current.species.name)
          current = current.evolves_to[0]
        }

        setEvolutionChain(chain)
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonData()
  }, [id])

  if (loading) {
    return <p className="text-center text-xl font-medium mt-10 text-gray-700">Loading Pokémon...</p>
  }

  if (!pokemon) {
    return <p className="text-center text-xl font-medium mt-10 text-red-500">Unable to load Pokémon data.</p>
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-3xl shadow-md mt-10">
      <h2 className="text-4xl font-bold text-center text-gray-900 capitalize mb-8">{pokemon.name}</h2>

      <div className="flex flex-col sm:flex-row gap-10">
        <div className="flex justify-center sm:w-1/2">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-64 h-64 object-contain rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-6 sm:w-1/2 text-gray-800">
          <Card title="Stats">
            <ul className="space-y-1">
              {pokemon.stats.map(stat => (
                <li key={stat.stat.name}>
                  <span className="font-semibold">{stat.stat.name.toUpperCase()}</span>: {stat.base_stat}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Abilities">
            <ul className="space-y-1">
              {pokemon.abilities.map(ability => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </Card>

          <Card title="Top Moves">
            <ul className="space-y-1">
              {pokemon.moves.slice(0, 10).map(move => (
                <li key={move.move.name}>{move.move.name}</li>
              ))}
            </ul>
          </Card>

          {evolutionChain.length > 1 && (
            <Card title="Evolution Chain">
              <ul className="flex flex-wrap gap-2 text-blue-700 font-medium">
                {evolutionChain.map(name => (
                  <li key={name} className="capitalize bg-blue-100 px-3 py-1 rounded-full">{name}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3>
      {children}
    </div>
  )
}

export default PokemonDetail
