import { Link } from 'react-router-dom'

function Header () {
  return (
    <header className="p-6 bg-gray-900">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">
          PokéExplorer
        </h1>
        <div className="flex space-x-6">
          <Link 
            to="/" 
            className="text-white hover:text-gray-300 transition duration-150">
            Home
          </Link>
          <Link 
            to="/favorites" 
            className="text-white hover:text-gray-300 transition duration-150">
            Favorites
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
