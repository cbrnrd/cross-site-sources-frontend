const SearchBar = () => {
  return (
    <div class="max-w-3xl mx-auto mt-4 mb-8">
      <form class="flex items-center">
        <input type="text" placeholder="Search articles"
          class="border border-gray-400 px-4 py-2 rounded-l-lg w-full" />
        <button type="submit" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-r-lg"><i
          class="fas fa-search"></i></button>
      </form>
    </div>
  );
}

export default SearchBar;
