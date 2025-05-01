import { useContext } from 'react'
import { PokemonContext } from '../contexts/PokemonContext'

function RandomButton() {
  const { randomPokemon } = useContext(PokemonContext)

  return (
    <button
      onClick={randomPokemon}
      className="w-full sm:w-64 md:w-80 lg:w-96 px-6 py-3 rounded-full bg-gradient-to-r from-purple-700 via-pink-500 to-purple-300 text-white font-bold hover:scale-105 transition"
    >
      Random Pokémon
    </button>
  );
}

export default RandomButton;
