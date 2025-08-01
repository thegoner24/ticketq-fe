'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaTicketAlt, FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';

export default function CreateTicketPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Standard',
    section: '',
    row: '',
    seat: '',
    price: '',
    eventDate: '',
    venue: '',
    artist: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    }
    
    if (!formData.row.trim()) {
      newErrors.row = 'Row is required';
    }
    
    if (!formData.seat.trim()) {
      newErrors.seat = 'Seat is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price))) {
      newErrors.price = 'Price must be a valid number';
    }
    
    if (!formData.eventDate.trim()) {
      newErrors.eventDate = 'Event date is required';
    }
    
    if (!formData.venue.trim()) {
      newErrors.venue = 'Venue is required';
    }
    
    if (!formData.artist.trim()) {
      newErrors.artist = 'Artist is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to create ticket
    setTimeout(() => {
      // In a real app, this would be an API call
      console.log('Creating ticket:', formData);
      
      // Redirect to tickets page after successful creation
      router.push('/tickets');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-28 py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <FaTicketAlt className="text-red-500 mr-2 md:mr-3 text-xl md:text-2xl flex-shrink-0" />
            <h1 className="text-xl md:text-2xl font-bold text-white">Purchase New Ticket</h1>
          </div>
          <Link 
            href="/tickets" 
            className="text-red-500 hover:text-red-400 flex items-center text-sm md:text-base"
          >
            <FaArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-1" />
            Back to Tickets
          </Link>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit} className="px-3 py-4 sm:px-4 sm:py-5 md:p-6">
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="title" className="block text-xs md:text-sm font-medium text-gray-300">
                    Ticket Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`mt-1 block w-full py-1.5 shadow-sm text-xs md:text-sm rounded-md bg-gray-800 border-gray-700 text-white ${errors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                    placeholder="Enter ticket title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-xs md:text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="type" className="block text-xs md:text-sm font-medium text-gray-300">
                    Ticket Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-1.5 text-xs md:text-sm bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 rounded-md"
                  >
                    <option value="VIP">VIP</option>
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <label htmlFor="section" className="block text-xs md:text-sm font-medium text-gray-300">
                    Section <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="section"
                    id="section"
                    value={formData.section}
                    onChange={handleChange}
                    className={`mt-1 block w-full py-1.5 shadow-sm text-xs md:text-sm rounded-md bg-gray-800 border-gray-700 text-white ${errors.section ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                    placeholder="A, B, C..."
                  />
                  {errors.section && (
                    <p className="mt-1 text-xs md:text-sm text-red-500">{errors.section}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="row" className="block text-xs md:text-sm font-medium text-gray-300">
                    Row <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="row"
                    id="row"
                    value={formData.row}
                    onChange={handleChange}
                    className={`mt-1 block w-full py-1.5 shadow-sm text-xs md:text-sm rounded-md bg-gray-800 border-gray-700 text-white ${errors.row ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                    placeholder="1, 2, 3..."
                  />
                  {errors.row && (
                    <p className="mt-1 text-xs md:text-sm text-red-500">{errors.row}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="seat" className="block text-xs md:text-sm font-medium text-gray-300">
                    Seat <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="seat"
                    id="seat"
                    value={formData.seat}
                    onChange={handleChange}
                    className={`mt-1 block w-full py-1.5 shadow-sm text-xs md:text-sm rounded-md bg-gray-800 border-gray-700 text-white ${errors.seat ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                    placeholder="101, 102..."
                  />
                  {errors.seat && (
                    <p className="mt-1 text-xs md:text-sm text-red-500">{errors.seat}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="price" className="block text-xs md:text-sm font-medium text-gray-300">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDollarSign className="text-gray-500 text-xs md:text-sm" />
                    </div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`mt-1 block w-full pl-10 py-1.5 shadow-sm text-xs md:text-sm rounded-md bg-gray-800 border-gray-700 text-white ${errors.price ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                      placeholder="199.99"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-xs md:text-sm text-red-500">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="eventDate" className="block text-xs md:text-sm font-medium text-gray-300">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-500 text-xs md:text-sm" />
                    </div>
                    <input
                      type="date"
                      name="eventDate"
                      id="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className={`mt-1 block w-full pl-10 py-1.5 shadow-sm text-xs md:text-sm rounded-md bg-gray-800 border-gray-700 text-white ${errors.eventDate ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                    />
                  </div>
                  {errors.eventDate && (
                    <p className="mt-1 text-xs md:text-sm text-red-500">{errors.eventDate}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="venue" className="block text-xs md:text-sm font-medium text-gray-300">
                    Venue <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-500 text-xs md:text-sm" />
                    </div>
                    <input
                      type="text"
                      name="venue"
                      id="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      className={`mt-1 block w-full pl-10 py-1.5 shadow-sm text-xs md:text-sm rounded-md bg-gray-800 border-gray-700 text-white ${errors.venue ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                      placeholder="Madison Square Garden"
                    />
                  </div>
                  {errors.venue && (
                    <p className="mt-1 text-xs md:text-sm text-red-500">{errors.venue}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="artist" className="block text-xs md:text-sm font-medium text-gray-300">
                    Artist/Event <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="artist"
                    id="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    className={`mt-1 block w-full py-1.5 shadow-sm text-xs md:text-sm rounded-md bg-gray-800 border-gray-700 text-white ${errors.artist ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                    placeholder="Artist or event name"
                  />
                  {errors.artist && (
                    <p className="mt-1 text-xs md:text-sm text-red-500">{errors.artist}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-xs md:text-sm font-medium text-gray-300">
                  Additional Notes
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm text-xs md:text-sm rounded-md bg-gray-800 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                  placeholder="Any special requests or notes"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <Link
                href="/tickets"
                className="inline-flex justify-center py-1.5 md:py-2 px-3 md:px-4 border border-gray-700 shadow-sm text-xs md:text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-1.5 md:py-2 px-3 md:px-4 border border-transparent shadow-sm text-xs md:text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 md:h-4 md:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Purchasing...
                  </>
                ) : 'Purchase Ticket'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}