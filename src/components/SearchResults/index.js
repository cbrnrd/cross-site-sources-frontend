import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleCard from "../ArticleCard";
import { searchArticlesThunk } from "../../thunks";

const SearchResults = () => {
  // get query from `q` param
  const { q } = useParams();
  const dispatch = useDispatch();
  const { searchArticles, loading } = useSelector((state) => state.articles);

  // dispatch search thunk
  useEffect(() => {
    dispatch(searchArticlesThunk(q));
  }, [dispatch, q]);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        searchArticles.map((article) => <ArticleCard article={article} />)
      )}
    </div>
  );

}

export default SearchResults;
