import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="p-6 bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Pokédex</h1>
        <Link to="/favorites" className="text-white font-medium">Favorites</Link>
      </nav>
    </header>
  )
}

export default Header
