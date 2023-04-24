import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutThunk, isUserLoggedInThunk } from '../../thunks';
import { useDispatch } from 'react-redux';

import jwt_decode from 'jwt-decode'
import { useEffect } from 'react';


const NavBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, jwt } = useSelector(state => state.user)
  
  useEffect(() => {
      console.log("called")
      dispatch(isUserLoggedInThunk())
  }, [])

  return (
    <nav className="bg-red-500 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        <Link className="text-lg font-bold nav-header" to='/'>X Site Sources</Link>
        <ul className="flex">
          <li className="ml-4"><Link to='/'>Home</Link></li>
          {
            !isLoggedIn && <li className="ml-4"><Link to='/login'>Log In/Register</Link></li>
          }
          {
            isLoggedIn && <li className="ml-4"><Link to='/profile'>Profile</Link></li>
          }
          {
            isLoggedIn && 
            <li className="ml-4" onClick={() => {
              dispatch(logoutThunk())
              navigate('/')
            }}><Link to='/logout'>Log Out</Link></li>
          }
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
