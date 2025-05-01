// src/components/PokemonList.jsx

import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemons, searchTerm, filterType }) {
  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? pokemon.types.some(t => t.type.name === filterType) : true;
    return matchesName && matchesType;
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10">
      {filteredPokemons.map(pokemon => (
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
          <PokemonCard pokemon={pokemon} />
        </Link>
      ))}
    </div>
  );
}

export default PokemonList;
