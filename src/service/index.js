import axios from 'axios'
import { createSearchParams } from 'react-router-dom'

const BACKEND_URL = process.env.BACKEND_API || 'http://localhost:5000/api'
const LOGIN_URL = BACKEND_URL + '/auth/login'
const ARTICLE_URL = BACKEND_URL + '/articles'
const LOGOUT_URL = BACKEND_URL + '/auth/logout'


const api = axios.create({
  withCredentials: true,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
})


export const searchBackend = async (searchTerm) => {
  console.log("search term: ", searchTerm)
  try {
    const res = await api.get(ARTICLE_URL + `/search?${createSearchParams({q: searchTerm})}`)
    console.log("Response data:: ", res.data)
    return res.data
  } catch (err) {
    console.log("Error searching articles: ", err)
    return err
  }

}
