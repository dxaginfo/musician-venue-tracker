import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout() as any);
    dispatch(reset());
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Venue Tracker
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center ml-3">
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600">
                  <FaUser className="mr-1" />
                  <span className="hidden md:inline-block">
                    {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
                  </span>
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <FaSignOutAlt className="mr-1" />
                  <span className="hidden md:inline-block">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-800 hover:bg-gray-50 font-medium rounded-lg text-sm px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
