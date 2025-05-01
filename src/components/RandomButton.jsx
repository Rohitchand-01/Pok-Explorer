// RandomButton.jsx
import { useNavigate } from 'react-router-dom'

export default function RandomButton({ pokemons }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (pokemons.length === 0) return
    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)]
    navigate(`/pokemon/${randomPokemon.id}`)
  }

  return (
    <button
      onClick={handleClick}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full transition"
    >
      Random Pokémon
    </button>
  )
}
