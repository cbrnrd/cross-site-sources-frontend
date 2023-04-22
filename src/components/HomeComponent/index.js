import ArticleCardGrid from "../ArticleCardGrid"
import SearchBar from "../SearchBar"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { loginThunk } from "../../thunks"
import jwt_decode from 'jwt-decode'


const HomeComponent = () => {

  return (
    <>
        <SearchBar />
        <ArticleCardGrid />
    </>
  )
}

export default HomeComponent;
