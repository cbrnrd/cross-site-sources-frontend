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
  //const { articles, loading } = useSelector(state => state.articles)

  const { articles, loading, error } = useSelector(state => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("asdf");
    dispatch(searchArticlesThunk());
  }, [dispatch]);

  return (
    <>
      <SearchResults articles={articles} loading={loading} />
    </>
  )
}


export default SearchResultsPage;
