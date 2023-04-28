import ArticleCardGrid from "../ArticleCardGrid"
import SearchBar from "../SearchBar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getUserThunk } from "../../thunks"


const HomeComponent = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, likedArticles, userId } = useSelector(state => state.user)

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Getting user data")
      dispatch(getUserThunk(userId))
    }
  }, [isLoggedIn])

  return (
    <>
      <h1 className="text-center font-bold mt-4 homepage-header">CROSS SITE SOURCES</h1>
      <SearchBar />
      <ArticleCardGrid />
    </>
  )
}

export default HomeComponent;
