import { useState } from 'react'

function Comparison({ pokemons }) {
  const [selectedPokemon1, setSelectedPokemon1] = useState('')
  const [selectedPokemon2, setSelectedPokemon2] = useState('')
  const [pokemon1Data, setPokemon1Data] = useState(null)
  const [pokemon2Data, setPokemon2Data] = useState(null)

  const handleCompare = async () => {
    if (selectedPokemon1 && selectedPokemon2) {
      const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon1}`)
      const data1 = await res1.json()
      setPokemon1Data(data1)

      const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon2}`)
      const data2 = await res2.json()
      setPokemon2Data(data2)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 bg-white rounded-3xl shadow-md">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">Compare Pokémon</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
        <select
          value={selectedPokemon1}
          onChange={e => setSelectedPokemon1(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        >
          <option value="">Select First Pokémon</option>
          {pokemons?.map(pokemon => (
            <option key={pokemon.id} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>

        <select
          value={selectedPokemon2}
          onChange={e => setSelectedPokemon2(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        >
          <option value="">Select Second Pokémon</option>
          {pokemons?.map(pokemon => (
            <option key={pokemon.id} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          className="mt-2 md:mt-0 px-6 py-2 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 transition"
        >
          Compare
        </button>
      </div>

      {pokemon1Data && pokemon2Data && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[pokemon1Data, pokemon2Data].map(pokemon => (
            <div
              key={pokemon.name}
              className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center shadow-sm"
            >
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-36 h-36 object-contain mb-4"
              />
              <h3 className="text-2xl font-semibold capitalize text-gray-700 mb-4">
                {pokemon.name}
              </h3>
              <ul className="w-full space-y-2 text-gray-600 text-sm sm:text-base">
                {pokemon.stats.map(stat => (
                  <li
                    key={stat.stat.name}
                    className="flex justify-between border-b border-gray-200 pb-1"
                  >
                    <span className="capitalize">{stat.stat.name}</span>
                    <span className="font-medium">{stat.base_stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Comparison
