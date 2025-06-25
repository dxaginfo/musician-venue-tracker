import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaBuilding,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaCalendarAlt,
  FaComments,
  FaStar,
  FaStarHalfAlt,
  FaArrowLeft,
  FaPlus,
} from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getVenueById, deleteVenue, reset } from '../../features/venues/venueSlice';
import { getPerformancesByVenue } from '../../features/performances/performanceSlice';
import { getInteractionsByVenue } from '../../features/interactions/interactionSlice';
import Spinner from '../../components/Spinner';
import moment from 'moment';

const VenueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { venue, isLoading: venueLoading } = useAppSelector((state) => state.venues);
  const { performances, isLoading: performancesLoading } = useAppSelector(
    (state) => state.performances
  );
  const { interactions, isLoading: interactionsLoading } = useAppSelector(
    (state) => state.interactions
  );

  const [activeTab, setActiveTab] = useState('performances');

  useEffect(() => {
    if (id) {
      dispatch(getVenueById(id));
      dispatch(getPerformancesByVenue(id));
      dispatch(getInteractionsByVenue(id));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      dispatch(deleteVenue(id!));
      toast.success('Venue deleted successfully');
      navigate('/venues');
    }
  };

  const renderRatingStars = (rating: number | undefined) => {
    if (!rating) return 'Not rated';

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    return <div className="flex">{stars}</div>;
  };

  const isLoading = venueLoading || performancesLoading || interactionsLoading;

  if (isLoading) {
    return <Spinner />;
  }

  if (!venue) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Venue not found</h3>
          <p className="text-gray-600 mb-4">
            The venue you're looking for doesn't exist or has been deleted.
          </p>
          <Link
            to="/venues"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaArrowLeft className="mr-2" /> Back to Venues
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/venues"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <FaArrowLeft className="mr-1" /> Back to Venues
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <FaBuilding className="mr-2 text-blue-600" /> {venue.name}
              </h1>
              <p className="text-gray-600 flex items-center mt-2">
                <FaMapMarkerAlt className="mr-1 text-red-500" />
                {venue.address ? `${venue.address}, ` : ''}
                {venue.city}, {venue.state ? `${venue.state}, ` : ''}
                {venue.country}
              </p>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/venues/${venue.id}/edit`}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaEdit className="mr-1" /> Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-medium mb-4">Venue Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Venue Type</p>
                  <p className="font-medium">{venue.venueType || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-medium">
                    {venue.capacity ? venue.capacity.toLocaleString() : 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Performance</p>
                  <p className="font-medium">
                    {venue.lastPerformedAt
                      ? moment(venue.lastPerformedAt).format('MMMM D, YYYY')
                      : 'Never performed here'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="font-medium">{renderRatingStars(venue.rating)}</div>
                </div>
                {venue.notes && (
                  <div>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="font-medium">{venue.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Contact Information</h2>
              <div className="space-y-4">
                {venue.contactName && (
                  <div>
                    <p className="text-sm text-gray-500">Contact Person</p>
                    <p className="font-medium">{venue.contactName}</p>
                  </div>
                )}
                {venue.contactEmail && (
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium flex items-center">
                      <FaEnvelope className="mr-2 text-blue-500" />
                      <a
                        href={`mailto:${venue.contactEmail}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {venue.contactEmail}
                      </a>
                    </p>
                  </div>
                )}
                {venue.contactPhone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium flex items-center">
                      <FaPhone className="mr-2 text-green-500" />
                      <a
                        href={`tel:${venue.contactPhone}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {venue.contactPhone}
                      </a>
                    </p>
                  </div>
                )}
                {venue.website && (
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="font-medium flex items-center">
                      <FaGlobe className="mr-2 text-purple-500" />
                      <a
                        href={venue.website.startsWith('http') ? venue.website : `https://${venue.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {venue.website}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${activeTab === 'performances' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('performances')}
            >
              <FaCalendarAlt className="inline mr-2" />
              Performances ({performances.length})
            </button>
            <button
              className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${activeTab === 'interactions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('interactions')}
            >
              <FaComments className="inline mr-2" />
              Interactions ({interactions.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'performances' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Performance History</h2>
                <Link
                  to={`/performances/new?venueId=${venue.id}`}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <FaPlus className="mr-1" /> Add Performance
                </Link>
              </div>

              {performances.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    No performances recorded for this venue yet.
                  </p>
                  <Link
                    to={`/performances/new?venueId=${venue.id}`}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaPlus className="mr-2" /> Add First Performance
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Event
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {performances.map((performance) => (
                        <tr key={performance.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {moment(performance.date).format('MMM D, YYYY')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                              to={`/performances/${performance.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              {performance.eventName}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {performance.startTime} - {performance.endTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {performance.isCancelled ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Cancelled
                              </span>
                            ) : moment(performance.date).isBefore(new Date()) ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Completed
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                Upcoming
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/performances/${performance.id}`}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'interactions' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Interaction History</h2>
                <Link
                  to={`/interactions/new?venueId=${venue.id}`}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <FaPlus className="mr-1" /> Add Interaction
                </Link>
              </div>

              {interactions.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    No interactions recorded with this venue yet.
                  </p>
                  <Link
                    to={`/interactions/new?venueId=${venue.id}`}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaPlus className="mr-2" /> Add First Interaction
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Contact
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Follow Up
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {interactions.map((interaction) => (
                        <tr key={interaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {moment(interaction.date).format('MMM D, YYYY')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                              to={`/interactions/${interaction.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              {interaction.interactionType}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {interaction.contactName || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {interaction.followUpDate
                              ? moment(interaction.followUpDate).format('MMM D, YYYY')
                              : 'None'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/interactions/${interaction.id}`}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
