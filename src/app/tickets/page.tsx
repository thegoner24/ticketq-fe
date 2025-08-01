'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { tickets } from '@/app/data/tickets';

export default function TicketsPage() {
  const [filterType, setFilterType] = useState('All');

  // Filter tickets by type
  const filteredTickets = filterType === 'All' 
    ? tickets 
    : tickets.filter(ticket => ticket.type === filterType);

  // Count tickets by type
  const vipCount = tickets.filter(ticket => ticket.type === 'VIP').length;
  const premiumCount = tickets.filter(ticket => ticket.type === 'Premium').length;
  const standardCount = tickets.filter(ticket => ticket.type === 'Standard').length;

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-28 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4" style={{ fontFamily: 'Impact, fantasy', letterSpacing: '1px' }}>
            GET YOUR <span className="text-red-500">TICKETS</span> NOW
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Don't miss the biggest concert event of the year. Secure your spot today and witness
            the most electrifying performances live at Wembley Stadium.
          </p>
        </div>

        {/* Ticket Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-3 py-4 sm:p-6">
              <dt className="text-xs md:text-sm font-medium text-gray-400 truncate">Available Tickets</dt>
              <dd className="mt-1 text-2xl md:text-3xl font-semibold text-white">{tickets.length}</dd>
            </div>
          </div>
          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-3 py-4 sm:p-6">
              <dt className="text-xs md:text-sm font-medium text-gray-400 truncate">VIP Passes</dt>
              <dd className="mt-1 text-2xl md:text-3xl font-semibold text-red-500">{vipCount}</dd>
            </div>
          </div>
          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-3 py-4 sm:p-6">
              <dt className="text-xs md:text-sm font-medium text-gray-400 truncate">Premium Tickets</dt>
              <dd className="mt-1 text-2xl md:text-3xl font-semibold text-yellow-500">{premiumCount}</dd>
            </div>
          </div>
          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-3 py-4 sm:p-6">
              <dt className="text-xs md:text-sm font-medium text-gray-400 truncate">Standard Tickets</dt>
              <dd className="mt-1 text-2xl md:text-3xl font-semibold text-blue-400">{standardCount}</dd>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg mb-6 md:mb-8 p-3 md:p-4 border border-gray-800">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilterType('All')} 
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-md ${filterType === 'All' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              All Tickets
            </button>
            <button 
              onClick={() => setFilterType('VIP')} 
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-md ${filterType === 'VIP' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              VIP
            </button>
            <button 
              onClick={() => setFilterType('Premium')} 
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-md ${filterType === 'Premium' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Premium
            </button>
            <button 
              onClick={() => setFilterType('Standard')} 
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-md ${filterType === 'Standard' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Standard
            </button>
            <Link 
              href="/tickets/list" 
              className="ml-auto px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              View My Tickets
            </Link>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {filteredTickets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredTickets.map((ticket) => (
                <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
                  <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-red-900/20 transition-all hover:-translate-y-1 cursor-pointer">
                    <div className="relative">
                      {/* Ticket Type Badge */}
                      <div className="absolute top-3 right-3 md:top-4 md:right-4">
                        <div className={`px-2 py-1 md:px-3 rounded text-xs md:text-sm font-bold ${ticket.type === 'VIP' ? 'bg-red-500 text-white' : ticket.type === 'Premium' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'}`}>
                          {ticket.type}
                        </div>
                      </div>
                      
                      {/* Ticket Content */}
                      <div className="p-4 md:p-6">
                        <div className="flex items-center mb-2">
                          <FaTicketAlt className="text-red-500 mr-2 flex-shrink-0" />
                          <h3 className="text-lg md:text-xl font-bold text-white truncate">{ticket.title}</h3>
                        </div>
                        <div className="flex justify-between items-center mt-3 md:mt-4">
                          <span className="text-gray-400 text-xs md:text-sm">
                            Ticket #{ticket.id}
                          </span>
                          <span className="text-white font-bold">
                            ${ticket.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-800 flex justify-between items-center">
                          <span className={`text-xs md:text-sm ${ticket.isUsed ? 'text-red-500' : 'text-green-500'}`}>
                            {ticket.isUsed ? 'Used' : 'Available'}
                          </span>
                          <span className="text-gray-400 text-xs md:text-sm">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="col-span-full p-4 md:p-6 text-center text-gray-400 bg-gray-900 rounded-lg border border-gray-800">
              No tickets found matching the current filter.
            </div>
          )}
        </div>
        
        {/* Event Info */}
        <div className="mt-10 md:mt-16 bg-gray-900 rounded-lg border border-gray-800 p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6 lg:pr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{ fontFamily: 'Impact, fantasy', letterSpacing: '1px' }}>
                DECEMBER 19, 2025<br />
                <span className="text-red-500">WEMBLEY STADIUM</span>
              </h2>
              <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                Experience the biggest rap concert on earth with legendary artists performing live.
                Don't miss this once-in-a-lifetime event featuring Eminem, Snoop Dogg, Travis Scott and more!
              </p>
              <div className="flex items-center space-x-2 text-gray-400 text-xs md:text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Wembley Stadium, London, UK</span>
              </div>
            </div>
            <div className="md:w-1/2 relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-black opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl md:text-4xl font-bold text-white text-center" style={{ fontFamily: 'Impact, fantasy', letterSpacing: '1px' }}>
                  THE BIGGEST<br />CONCERT ON EARTH
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}