import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target[0].value;
    navigate(`/search`, {state: { q: searchQuery }});
  }
  return (
    <div className="max-w-3xl mx-auto mt-4 mb-8">
      <form className="flex items-center" onSubmit={handleSubmit}>
      
        <input type="text" placeholder="Search articles"
          className="border border-gray-400 px-4 py-2 rounded-l-lg w-full" />
        <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-r-lg"><i
          className="fas fa-search"></i></button>
      </form>
    </div>
  );
}

export default SearchBar;
