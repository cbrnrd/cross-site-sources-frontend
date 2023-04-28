import SearchResults from "../SearchResults";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";


const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [q, setQ] = useState('');


  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <SearchResults searchQuery={searchQuery} />
    </div>
  );
};




export default SearchResultsPage;
