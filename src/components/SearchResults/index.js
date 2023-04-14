import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../ArticleCard";
import { Link } from "react-router-dom";
import { searchBackend } from "../../service";
import { searchArticlesThunk } from "../../thunks";
/*
{
  internalArticles: [],
  externalArticles: []
}
*/
const showArticles = (articles) => {
  console.log("Articles: ", articles);
  const internal = articles.internalArticles;
  const externalArticles = articles.externalArticles;
  return (
    <>
      <h1 className="text-3xl font-bold text-center">Internal Articles</h1>
      {internal.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      <br></br>
      <h1 className="text-3xl font-bold text-center">External Articles</h1>
      {externalArticles.map((article) => (
        <Link to={article.url}><ArticleCard key={article.id} article={article} /></Link>
      ))}
    </>
  )
}

const SearchResults = ({articles, loading}) => {
  console.log("Articles: ", articles);
  console.log("Loading: ", loading);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {loading ? (
        <div className="text-3xl font-bold text-center">Loading...</div>
      ) : showArticles(articles)}
    </div>
  )
}


/*
const SearchResults = ({ searchQuery }) => {
  const dispatch = useDispatch()
  const { articles, loading, error } = useSelector((state) => state.search)

  useEffect(() => {
    dispatch(searchArticlesThunk(searchQuery))
  }, [dispatch, searchQuery])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {loading ? (<div className="text-3xl font-bold text-center">Loading...</div>) :
        showArticles(articles)}
    </div>
  )
}

*/
export default SearchResults;
