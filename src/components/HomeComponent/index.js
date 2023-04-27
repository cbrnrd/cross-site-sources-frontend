import ArticleCardGrid from "../ArticleCardGrid"
import SearchBar from "../SearchBar"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { loginThunk } from "../../thunks"
import jwt_decode from 'jwt-decode'


const HomeComponent = () => {

  return (
    <>
      <h1 className="text-center font-bold mt-4 homepage-header">CROSS SITE SOURCES</h1>
      <SearchBar />
      <ArticleCardGrid />
    </>
  )
}

export default HomeComponent;
