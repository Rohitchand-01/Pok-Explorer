function TypeFilter({ selectedTypes, setSelectedTypes }) {
  const types = ['fire', 'water', 'grass', 'electric', 'bug', 'normal', 'poison', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon', 'flying', 'steel', 'dark']

  const handleChange = (e) => {
    const value = e.target.value
    setSelectedTypes(prev =>
      prev.includes(value) ? prev.filter(type => type !== value) : [...prev, value]
    )
  }

  return (
    <div className="flex flex-col gap-4 mb-6">
      <label className="text-lg font-medium text-gray-800">Filter by Type</label>
      <select
        multiple
        value={selectedTypes}
        onChange={handleChange}
        className="w-full sm:w-64 md:w-80 lg:w-96 px-6 py-3 rounded-lg bg-white shadow-sm border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all ease-in-out duration-200 hover:bg-gray-50"
      >
        {types.map(type => (
          <option key={type} value={type} className="bg-white hover:bg-blue-50 transition-all ease-in-out">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TypeFilter
