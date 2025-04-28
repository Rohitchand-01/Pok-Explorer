import React from "react";
import pokeballImage from "../assets/pokeball.png"; // Import the image

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-purple-700 via-pink-500 to-purple-300 py-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
        <img 
          src={pokeballImage} // Use the imported image
          alt="Pokéball" 
          className="w-8 h-8 mr-4"  // Adjust the size of the image as needed
        />
        <h1 className="text-3xl font-extrabold text-white tracking-wide text-center">
          PokéExplorer
        </h1>
      </div>
    </header>
  );
};

export default Header;
