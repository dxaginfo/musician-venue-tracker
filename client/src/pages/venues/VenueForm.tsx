import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBuilding, FaSave, FaArrowLeft } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createVenue,
  updateVenue,
  getVenueById,
  reset,
  clearVenue,
} from '../../features/venues/venueSlice';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

const VenueForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { venue, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.venues
  );

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    venueType: '',
    capacity: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    notes: '',
    rating: '',
  });

  const {
    name,
    address,
    city,
    state,
    country,
    venueType,
    capacity,
    contactName,
    contactEmail,
    contactPhone,
    website,
    notes,
    rating,
  } = formData;

  const isEdit = !!id;

  useEffect(() => {
    // Load venue for editing if ID is provided
    if (isEdit) {
      dispatch(getVenueById(id));
    } else {
      dispatch(clearVenue());
    }

    // Cleanup function
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Populate form when venue is loaded in edit mode
    if (isEdit && venue) {
      setFormData({
        name: venue.name || '',
        address: venue.address || '',
        city: venue.city || '',
        state: venue.state || '',
        country: venue.country || '',
        venueType: venue.venueType || '',
        capacity: venue.capacity ? venue.capacity.toString() : '',
        contactName: venue.contactName || '',
        contactEmail: venue.contactEmail || '',
        contactPhone: venue.contactPhone || '',
        website: venue.website || '',
        notes: venue.notes || '',
        rating: venue.rating ? venue.rating.toString() : '',
      });
    }

    // Redirect after successful create/update
    if (isSuccess && !isLoading) {
      toast.success(`Venue ${isEdit ? 'updated' : 'created'} successfully`);
      navigate('/venues');
    }
  }, [venue, isError, isSuccess, isLoading, message, navigate, isEdit]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !city || !country) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Prepare venue data, converting numerical fields
    const venueData = {
      ...formData,
      capacity: capacity ? parseInt(capacity) : undefined,
      rating: rating ? parseInt(rating) : undefined,
    };

    if (isEdit) {
      dispatch(updateVenue({ venueId: id, venueData }));
    } else {
      dispatch(createVenue(venueData));
    }
  };

  if (isLoading && isEdit) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center">
            <FaBuilding className="mr-2" />
            {isEdit ? 'Edit Venue' : 'Add New Venue'}
          </h1>
          <Link
            to="/venues"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft className="mr-1" /> Back to Venues
          </Link>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="venueType" className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Type
                </label>
                <select
                  id="venueType"
                  name="venueType"
                  value={venueType}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select Type --</option>
                  <option value="Club">Club</option>
                  <option value="Bar">Bar</option>
                  <option value="Theater">Theater</option>
                  <option value="Arena">Arena</option>
                  <option value="Stadium">Stadium</option>
                  <option value="Festival">Festival</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Private">Private</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={capacity}
                  onChange={onChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={rating}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select Rating --</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={country}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="contactName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={contactName}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={contactEmail}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Phone
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  value={contactPhone}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={website}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={notes}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any additional notes about the venue..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              to="/venues"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              disabled={isLoading}
            >
              <FaSave className="mr-2" />
              {isLoading ? 'Saving...' : 'Save Venue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VenueForm;
