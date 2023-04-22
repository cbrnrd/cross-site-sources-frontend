import ArticleCardGrid from "../ArticleCardGrid"
import SearchBar from "../SearchBar"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { loginThunk } from "../../thunks"


const HomeComponent = () => {

  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.user)
  
  const jwtPresent = localStorage.getItem('jwt') ? true : false

  console.log("JWT present: ", jwtPresent)
  console.log("Is logged in: ", isLoggedIn)
  if (jwtPresent && !isLoggedIn) {
    dispatch(loginThunk(localStorage.getItem('jwt')))
  }


  return (
    <>
        <SearchBar />
        <ArticleCardGrid />
    </>
  )
}

export default HomeComponent;
