function PokemonCard({ pokemon }) {
    return (
      <div className="relative bg-white bg-opacity-60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <img src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24 object-contain" />
        <h3 className="mt-4 text-lg font-bold capitalize text-gray-700">{pokemon.name}</h3>
        <p className="text-sm text-gray-500 mb-2">#{pokemon.id}</p>
        <div className="flex flex-wrap justify-center gap-2">
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
  