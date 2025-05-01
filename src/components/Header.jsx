import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="px-4 sm:px-8 py-4 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
          PokéExplorer
        </h1>
        <div className="flex space-x-4 sm:space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-pink-500 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-gray-700 hover:text-pink-500 font-medium transition-colors duration-200"
          >
            Favorites
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
