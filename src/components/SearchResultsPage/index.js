import SearchResults from "../SearchResults";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchArticlesThunk } from "../../thunks";
import { searchBackend } from "../../service";


const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  //const { articles, loading } = useSelector(state => state.articles)

  return (
    <>
      <SearchResults q={searchQuery} />
    </>
  )
}


export default SearchResultsPage;
