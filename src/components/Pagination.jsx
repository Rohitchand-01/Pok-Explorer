import { useContext } from 'react'
import { PokemonContext } from '../contexts/PokemonContext'

function Pagination() {
  const { currentPage, setCurrentPage, totalPages } = useContext(PokemonContext)

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:bg-gray-200"
      >
        Prev
      </button>
      <span className="flex items-center justify-center text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
