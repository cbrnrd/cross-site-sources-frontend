import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutThunk, isUserLoggedInThunk, getUserThunk } from '../../thunks';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


const NavBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector(state => state.user)
  
  useEffect(() => {
      dispatch(isUserLoggedInThunk())
  }, [])

  return (
    <nav className="bg-red-500 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        <Link className="text-lg font-bold nav-header" to='/'>XSS</Link>
        <ul className="flex">
          <li className="ml-4 hover:underline transition ease-in duration-200"><Link to='/'>Home</Link></li>
          {
            !isLoggedIn && <li className="ml-4 hover:underline transition ease-in duration-200"><Link to='/login'>Log In/Register</Link></li>
          }
          {
            isLoggedIn && <li className="ml-4 hover:underline transition ease-in duration-200"><Link to='/profile'>Profile</Link></li>
          }
          {
            isLoggedIn && <li className="ml-4 hover:underline transition ease-in duration-200"><Link to='/liked'>Liked Articles</Link></li>
          }
          {
            isLoggedIn && 
            <li className="ml-4 hover:underline transition ease-in duration-200" onClick={() => {
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
