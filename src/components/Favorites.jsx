import React from 'react'
import PokemonCard from './PokemonCard'

function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">Favorite Pokémon</h2>
        
        {favorites.length === 0 ? (
          <div className="col-span-full text-center py-6 bg-white rounded-lg shadow-md">
            <p className="text-xl font-medium text-gray-700">No favorite Pokémon found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {favorites.map(pokemon => (
              <div key={pokemon.id} className="relative">
                <PokemonCard
                  pokemon={pokemon}
                  toggleFavorite={toggleFavorite} // Ensure toggleFavorite is passed here
                  isFavorite={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
