import { Link } from 'react-router-dom'

function PokemonCard({ pokemon, toggleFavorite, isFavorite }) {
  return (
    <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300">
      <Link to={`/pokemon/${pokemon.id}`} className="block text-center">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-24 h-24 object-contain sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
        />
        <h3 className="mt-4 text-xl font-semibold capitalize text-gray-800">{pokemon.name}</h3>
        <p className="text-sm text-gray-500 mb-2">#{pokemon.id}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {pokemon.types.map(t => (
            <span
              key={t.type.name}
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: getTypeColor(t.type.name) }}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </Link>

      <button
        onClick={() => toggleFavorite(pokemon)}
        className={`mt-5 w-full py-2 rounded-full font-semibold text-sm transition-all duration-200 shadow 
          ${isFavorite
            ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
            : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'}`}
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
