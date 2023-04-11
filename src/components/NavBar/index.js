import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-red-500 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        <Link className="text-lg font-bold" to='/'>XSS</Link>
        <ul className="flex">
          <li className="ml-4"><Link to='/'>Home</Link></li>
          <li><a href="#" className="ml-4">Log In/Register</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
