import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getVenues, reset as resetVenues } from '../features/venues/venueSlice';
import { getUpcomingPerformances, reset as resetPerformances } from '../features/performances/performanceSlice';
import { getRecentInteractions, reset as resetInteractions } from '../features/interactions/interactionSlice';
import Spinner from '../components/Spinner';
import { FaBuilding, FaCalendarAlt, FaComments, FaPlus, FaExternalLinkAlt } from 'react-icons/fa';
import moment from 'moment';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { venues, isLoading: venuesLoading } = useAppSelector((state) => state.venues);
  const { performances, isLoading: performancesLoading } = useAppSelector(
    (state) => state.performances
  );
  const { interactions, isLoading: interactionsLoading } = useAppSelector(
    (state) => state.interactions
  );

  useEffect(() => {
    dispatch(getVenues());
    dispatch(getUpcomingPerformances());
    dispatch(getRecentInteractions());

    return () => {
      dispatch(resetVenues());
      dispatch(resetPerformances());
      dispatch(resetInteractions());
    };
  }, [dispatch]);

  const isLoading = venuesLoading || performancesLoading || interactionsLoading;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-gray-600">
          {user?.firstName ? `Welcome, ${user.firstName}!` : `Welcome!`}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <FaBuilding className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Venues</p>
              <h3 className="text-2xl font-bold">{venues.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <FaCalendarAlt className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Upcoming Performances</p>
              <h3 className="text-2xl font-bold">{performances.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              <FaComments className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Recent Interactions</p>
              <h3 className="text-2xl font-bold">{interactions.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Quick Actions</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/venues/new"
            className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FaPlus className="mr-2" />
            Add New Venue
          </Link>
          <Link
            to="/performances/new"
            className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FaPlus className="mr-2" />
            Add New Performance
          </Link>
          <Link
            to="/interactions/new"
            className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FaPlus className="mr-2" />
            Log New Interaction
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Performances */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium">Upcoming Performances</h2>
            <Link to="/performances" className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
              View All <FaExternalLinkAlt className="ml-1" size={12} />
            </Link>
          </div>
          <div className="p-4">
            {performances.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming performances</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {performances.slice(0, 5).map((performance) => (
                  <li key={performance.id} className="py-3">
                    <Link to={`/performances/${performance.id}`} className="block hover:bg-gray-50 -m-3 p-3">
                      <div className="flex justify-between">
                        <p className="font-medium">{performance.eventName}</p>
                        <p className="text-gray-500">
                          {moment(performance.date).format('MMM D, YYYY')}
                        </p>
                      </div>
                      <p className="text-gray-600 mt-1">{performance.venue?.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Interactions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium">Recent Interactions</h2>
            <Link to="/interactions" className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
              View All <FaExternalLinkAlt className="ml-1" size={12} />
            </Link>
          </div>
          <div className="p-4">
            {interactions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent interactions</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {interactions.slice(0, 5).map((interaction) => (
                  <li key={interaction.id} className="py-3">
                    <Link to={`/interactions/${interaction.id}`} className="block hover:bg-gray-50 -m-3 p-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{interaction.venue?.name}</p>
                          <p className="text-gray-600 mt-1">{interaction.interactionType}</p>
                        </div>
                        <p className="text-gray-500">
                          {moment(interaction.date).format('MMM D, YYYY')}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
