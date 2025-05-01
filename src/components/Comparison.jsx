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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Compare Pokémon</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
        <select
          value={selectedPokemon1}
          onChange={e => setSelectedPokemon1(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value="">Select First Pokémon</option>
          {Array.isArray(pokemons) && pokemons.map(pokemon => (
            <option key={pokemon.id} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>

        <select
          value={selectedPokemon2}
          onChange={e => setSelectedPokemon2(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value="">Select Second Pokémon</option>
          {Array.isArray(pokemons) && pokemons.map(pokemon => (
            <option key={pokemon.id} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700 transition duration-300"
        >
          Compare
        </button>
      </div>

      {pokemon1Data && pokemon2Data && (
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
          {[pokemon1Data, pokemon2Data].map((pokemon, idx) => (
            <div
              key={pokemon.name}
              className="w-full md:w-1/2 bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-48 h-48 object-contain mb-4"
              />
              <h3 className="text-2xl font-bold capitalize text-center text-gray-800 mb-4">
                {pokemon.name}
              </h3>
              <ul className="w-full space-y-2 text-gray-700">
                {pokemon.stats.map(stat => (
                  <li key={stat.stat.name} className="flex justify-between border-b pb-1">
                    <span className="capitalize">{stat.stat.name}</span>
                    <span className="font-semibold">{stat.base_stat}</span>
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
