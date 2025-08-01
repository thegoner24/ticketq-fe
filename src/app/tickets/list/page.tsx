'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaToggleOn, FaToggleOff, FaTicketAlt } from 'react-icons/fa';
import { tickets as initialTickets, Ticket } from '@/app/data/tickets';
import { useAuth } from '@/app/context/AuthContext';

export default function TicketListPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [filterUsage, setFilterUsage] = useState('All');
  const [stats, setStats] = useState({
    totalTickets: 0,
    usedTickets: 0,
    unusedTickets: 0,
  });
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const usedTickets = tickets.filter(ticket => ticket.isUsed).length;
    const unusedTickets = tickets.filter(ticket => !ticket.isUsed).length;
    
    setStats({
      totalTickets: tickets.length,
      usedTickets,
      unusedTickets,
    });
  }, [tickets]);

  const filteredTickets = filterUsage === 'All' 
    ? tickets 
    : filterUsage === 'Used'
      ? tickets.filter(ticket => ticket.isUsed)
      : tickets.filter(ticket => !ticket.isUsed);

  const toggleTicketUsage = (id: number) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === id ? { ...ticket, isUsed: !ticket.isUsed } : ticket
      )
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-28 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-white">My Tickets</h1>
          <Link 
            href="/tickets/create" 
            className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 border border-transparent text-xs md:text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Purchase New Ticket
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-3 py-4 sm:p-6">
              <dt className="text-xs md:text-sm font-medium text-gray-400 truncate">Total Tickets</dt>
              <dd className="mt-1 text-2xl md:text-3xl font-semibold text-white">{stats.totalTickets}</dd>
            </div>
          </div>
          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-3 py-4 sm:p-6">
              <dt className="text-xs md:text-sm font-medium text-gray-400 truncate">Used Tickets</dt>
              <dd className="mt-1 text-2xl md:text-3xl font-semibold text-green-500">{stats.usedTickets}</dd>
            </div>
          </div>
          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-3 py-4 sm:p-6">
              <dt className="text-xs md:text-sm font-medium text-gray-400 truncate">Unused Tickets</dt>
              <dd className="mt-1 text-2xl md:text-3xl font-semibold text-blue-500">{stats.unusedTickets}</dd>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg mb-6 p-3 md:p-4 border border-gray-800">
          <div className="flex flex-wrap gap-2 md:space-x-4">
            <button 
              onClick={() => setFilterUsage('All')} 
              className={`px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm font-medium rounded-md ${filterUsage === 'All' ? 'bg-red-600 text-white' : 'text-gray-300 border border-gray-700'}`}
            >
              All Tickets
            </button>
            <button 
              onClick={() => setFilterUsage('Used')} 
              className={`px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm font-medium rounded-md ${filterUsage === 'Used' ? 'bg-red-600 text-white' : 'text-gray-300 border border-gray-700'}`}
            >
              Used Tickets
            </button>
            <button 
              onClick={() => setFilterUsage('Unused')} 
              className={`px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm font-medium rounded-md ${filterUsage === 'Unused' ? 'bg-red-600 text-white' : 'text-gray-300 border border-gray-700'}`}
            >
              Unused Tickets
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300"
              >
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <FaTicketAlt className="text-red-500 mr-2 flex-shrink-0" />
                      <h3 className="text-base md:text-lg font-bold text-white truncate">{ticket.title}</h3>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-bold ${ticket.type === 'VIP' ? 'bg-red-500 text-white' : ticket.type === 'Premium' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'}`}>
                      {ticket.type}
                    </div>
                  </div>
                  
                  <p className="text-xs md:text-sm text-gray-400 mt-2">
                    Section {ticket.section}, Row {ticket.row}, Seat {ticket.seat}
                  </p>
                  
                  <div className="mt-3 md:mt-4 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white">${ticket.price.toFixed(2)}</span>
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      {new Date(ticket.eventDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-800">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <button 
                          onClick={() => toggleTicketUsage(ticket.id)}
                          className="text-xl md:text-2xl focus:outline-none mr-2"
                          aria-label={ticket.isUsed ? "Mark as unused" : "Mark as used"}
                        >
                          {ticket.isUsed ? (
                            <FaToggleOn className="text-green-500" />
                          ) : (
                            <FaToggleOff className="text-gray-500" />
                          )}
                        </button>
                        <span className="text-xs md:text-sm text-gray-400">
                          {ticket.isUsed ? 'Used' : 'Available'}
                        </span>
                      </div>
                      <Link 
                        href={`/tickets/${ticket.id}`}
                        className="text-xs md:text-sm font-medium text-red-500 hover:text-red-400"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-4 md:p-6 text-center text-gray-400 bg-gray-900 rounded-lg shadow border border-gray-800">
              No tickets found matching the current filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
