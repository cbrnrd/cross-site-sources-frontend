import SearchResults from "../SearchResults";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchArticlesThunk } from "../../thunks";
import { searchBackend } from "../../service";


const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [q, setQ] = useState('');
  //const [result, setResult] = useState({});
  //const { articles, loading } = useSelector(state => state.articles)

  const { articles, loading, error } = useSelector(state => state.search);
  const dispatch = useDispatch();

  searchBackend(q).then((res) => {
    console.log("Response: ", res);
    dispatch(searchArticlesThunk(res));
  });

  useEffect(() => {
    dispatch(searchArticlesThunk(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <SearchResults articles={articles} loading={loading} />
    </div>
  );
};




export default SearchResultsPage;
