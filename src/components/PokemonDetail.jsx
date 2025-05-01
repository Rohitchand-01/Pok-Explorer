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

        const speciesRes = await fetch(data.species.url)
        const speciesData = await speciesRes.json()
        const evolutionRes = await fetch(speciesData.evolution_chain.url)
        const evolutionData = await evolutionRes.json()

        const chain = []
        let current = evolutionData.chain

        while (current) {
          chain.push(current.species.name)
          current = current.evolves_to[0]
        }

        setEvolutionChain(chain)
      } catch (err) {
        console.error('Error fetching Pokémon:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonData()
  }, [id])

  if (loading) return <p className="text-center text-gray-600 text-lg mt-10">Loading Pokémon...</p>
  if (!pokemon) return <p className="text-center text-red-500 text-lg mt-10">Failed to load Pokémon data.</p>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 capitalize text-gray-800">{pokemon.name}</h1>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-56 h-56 sm:w-72 sm:h-72 object-contain rounded-xl shadow transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-6 mt-6 lg:mt-0">
            <DetailCard title="Stats">
              <ul className="space-y-1 text-sm">
                {pokemon.stats.map(stat => (
                  <li key={stat.stat.name}>
                    <span className="font-medium capitalize">{stat.stat.name}:</span> {stat.base_stat}
                  </li>
                ))}
              </ul>
            </DetailCard>

            <DetailCard title="Abilities">
              <ul className="flex flex-wrap gap-2 text-sm">
                {pokemon.abilities.map(ability => (
                  <li key={ability.ability.name} className="bg-gray-100 px-3 py-1 rounded-full">
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </DetailCard>

            <DetailCard title="Top Moves">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {pokemon.moves.slice(0, 10).map(move => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </DetailCard>

            {evolutionChain.length > 1 && (
              <DetailCard title="Evolution Chain">
                <ul className="flex flex-wrap gap-2 text-sm">
                  {evolutionChain.map(name => (
                    <li
                      key={name}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full capitalize"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </DetailCard>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailCard({ title, children }) {
  return (
    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
      {children}
    </div>
  )
}

export default PokemonDetail
