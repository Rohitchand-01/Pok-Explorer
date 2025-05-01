import { Link } from 'react-router-dom'

function PokemonCard({ pokemon, toggleFavorite, isFavorite }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
      <Link to={`/pokemon/${pokemon.id}`} className="w-full flex flex-col items-center gap-2">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain transition-transform duration-300 hover:scale-105"
        />

        <div>
          <h3 className="text-xl font-bold capitalize text-gray-800">{pokemon.name}</h3>
          <p className="text-sm text-gray-400">#{pokemon.id}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {pokemon.types.map(t => (
            <span
              key={t.type.name}
              className="text-xs font-medium text-white px-3 py-1 rounded-full"
              style={{ backgroundColor: getTypeColor(t.type.name) }}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </Link>

      <button
        onClick={() => toggleFavorite(pokemon)}
        className={`mt-4 w-full py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow 
          ${isFavorite
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-green-500 text-white hover:bg-green-600'}`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  )
}

function getTypeColor(type) {
  const colors = {
    fire: '#f87171',
    water: '#60a5fa',
    grass: '#34d399',
    electric: '#fbbf24',
    bug: '#86efac',
    normal: '#a1a1aa',
    poison: '#c084fc',
    ground: '#facc15',
    fairy: '#f9a8d4',
    fighting: '#f87171',
    psychic: '#a78bfa',
    rock: '#d1d5db',
    ghost: '#818cf8',
    ice: '#7dd3fc',
    dragon: '#818cf8',
    flying: '#93c5fd',
    steel: '#cbd5e1',
    dark: '#64748b'
  }
  return colors[type] || '#6b7280'
}

export default PokemonCard
