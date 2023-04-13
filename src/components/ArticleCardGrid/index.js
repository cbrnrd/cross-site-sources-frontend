import ArticleCard from '../ArticleCard';
import { getFrontpageArticles } from "../../thunks"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ArticleCardGrid = () => {
  const { articles, loading } = useSelector(state => state.articles)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFrontpageArticles())
  }, [dispatch])

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (<div className="text-3xl font-bold text-center">Loading...</div>) :
        articles.map((article) => (
          <ArticleCard article={article} />
        ))}
    </div>
  );
}

export default ArticleCardGrid;
