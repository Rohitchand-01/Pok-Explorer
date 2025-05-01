import React from 'react'
import PokemonCard from './PokemonCard'

function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
          Your Favorite Pokémon
        </h2>

        {favorites.length === 0 ? (
          <div className="text-center bg-white py-12 px-6 rounded-2xl shadow">
            <p className="text-lg sm:text-xl text-gray-600 font-medium">
              No favorites yet. Start adding some Pokémon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(pokemon => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                toggleFavorite={toggleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
