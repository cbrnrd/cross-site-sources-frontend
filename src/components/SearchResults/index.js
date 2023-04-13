import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
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

const SearchResults = ({q}) => {

  //const [articles, setArticles] = useState({})
  const { searchArticles, loading } = useSelector(state => state.articles)
  const [ searchQuery, setSearchQuery ] = useState('')
  const dispatch = useDispatch()

  console.log(q)

  useEffect(() => {
    console.log('In useEffect, q=', searchQuery)
    dispatch(searchArticlesThunk())
  }, [dispatch])

  setSearchQuery(q)

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {loading ? (<div className="text-3xl font-bold text-center">Loading...</div>) :
        showArticles(searchArticles)}
    </div>
  )

  // return (
  //   <div className="flex flex-col items-center justify-center w-full h-full">
  //     {articles ? showArticles(articles) : <h1 className="text-3xl font-bold text-center">No results</h1>}
  //   </div>
  // );

}

export default SearchResults;
