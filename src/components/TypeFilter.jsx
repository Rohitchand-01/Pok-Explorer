function TypeFilter({ selectedTypes, setSelectedTypes }) {
  const types = [
    'fire', 'water', 'grass', 'electric', 'bug', 'normal', 'poison',
    'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost',
    'ice', 'dragon', 'flying', 'steel', 'dark'
  ]

  const handleChange = (e) => {
    const value = e.target.value
    setSelectedTypes(prev =>
      prev.includes(value)
        ? prev.filter(type => type !== value)
        : [...prev, value]
    )
  }

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <label className="block text-lg font-semibold text-gray-800 mb-3 text-center">
        Filter by Type
      </label>
      <div className="rounded-xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <select
          multiple
          value={selectedTypes}
          onChange={handleChange}
          className="w-full h-48 px-4 py-2 text-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {types.map(type => (
            <option
              key={type}
              value={type}
              className="py-2 px-3 hover:bg-gray-100"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TypeFilter
