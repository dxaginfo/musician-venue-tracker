import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBuilding,
  FaCalendarAlt,
  FaComments,
  FaUser,
  FaChartBar,
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route: string) => {
    return path === route || path.startsWith(`${route}/`);
  };

  return (
    <aside className="w-64 h-screen pt-16 bg-white border-r border-gray-200 hidden md:block">
      <div className="overflow-y-auto py-4 px-3 h-full">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center p-2 text-base font-normal rounded-lg ${isActive('/') && path === '/' ? 'bg-blue-100 text-blue-600' : 'text-gray-900 hover:bg-gray-100'}`}
            >
              <FaHome className="w-6 h-6 mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/venues"
              className={`flex items-center p-2 text-base font-normal rounded-lg ${isActive('/venues') ? 'bg-blue-100 text-blue-600' : 'text-gray-900 hover:bg-gray-100'}`}
            >
              <FaBuilding className="w-6 h-6 mr-3" />
              <span>Venues</span>
            </Link>
          </li>
          <li>
            <Link
              to="/performances"
              className={`flex items-center p-2 text-base font-normal rounded-lg ${isActive('/performances') ? 'bg-blue-100 text-blue-600' : 'text-gray-900 hover:bg-gray-100'}`}
            >
              <FaCalendarAlt className="w-6 h-6 mr-3" />
              <span>Performances</span>
            </Link>
          </li>
          <li>
            <Link
              to="/interactions"
              className={`flex items-center p-2 text-base font-normal rounded-lg ${isActive('/interactions') ? 'bg-blue-100 text-blue-600' : 'text-gray-900 hover:bg-gray-100'}`}
            >
              <FaComments className="w-6 h-6 mr-3" />
              <span>Interactions</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`flex items-center p-2 text-base font-normal rounded-lg ${isActive('/profile') ? 'bg-blue-100 text-blue-600' : 'text-gray-900 hover:bg-gray-100'}`}
            >
              <FaUser className="w-6 h-6 mr-3" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
