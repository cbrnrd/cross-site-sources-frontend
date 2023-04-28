import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../ArticleCard";
import { searchArticlesThunk } from "../../thunks";

const SearchResults = ({ searchQuery }) => {
  const dispatch = useDispatch()
  const { articles, loading, error } = useSelector((state) => state.search)
  const showArticles = (articles) => {
    const internal = articles.internal;
    const externalArticles = articles.external;
    return (
      <>
        <h1 className="text-3xl font-bold text-center">Internal Articles</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {internal.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <br></br>
        <h1 className="text-3xl font-bold text-center">External Articles</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 ps-4">
          {externalArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </>
    )
  }

  useEffect(() => {
    dispatch(searchArticlesThunk(searchQuery))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="text-3xl font-bold text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {loading && <div className="text-3xl font-bold text-center">Loading...</div>}
      {error && <div className="text-3xl font-bold text-center">Error: {error}</div>}
      {articles && showArticles(articles.results)}
    </div>
  )
}


export default SearchResults;
