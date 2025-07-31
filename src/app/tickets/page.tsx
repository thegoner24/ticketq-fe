'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TicketStats from '../components/TicketStats';

// Mock data for tickets
const MOCK_TICKETS = [
  {
    id: '1',
    title: 'Website not loading properly',
    status: 'Open',
    priority: 'High',
    createdAt: '2023-06-15',
    description: 'The main website is not loading images and some CSS seems broken.',
  },
  {
    id: '2',
    title: 'Cannot reset password',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: '2023-06-14',
    description: 'Users report they are not receiving password reset emails.',
  },
  {
    id: '3',
    title: 'Feature request: Dark mode',
    status: 'Open',
    priority: 'Low',
    createdAt: '2023-06-10',
    description: 'Multiple users have requested a dark mode option for the application.',
  },
  {
    id: '4',
    title: 'Payment processing error',
    status: 'Closed',
    priority: 'High',
    createdAt: '2023-06-05',
    description: 'Some users experienced payment processing errors during checkout.',
  },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [filterStatus, setFilterStatus] = useState('All');
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    closedTickets: 0,
  });

  // Calculate ticket statistics
  useEffect(() => {
    const openTickets = tickets.filter(ticket => ticket.status === 'Open').length;
    const inProgressTickets = tickets.filter(ticket => ticket.status === 'In Progress').length;
    const closedTickets = tickets.filter(ticket => ticket.status === 'Closed').length;
    
    setStats({
      totalTickets: tickets.length,
      openTickets,
      inProgressTickets,
      closedTickets,
    });
  }, [tickets]);

  // Filter tickets based on status
  const filteredTickets = filterStatus === 'All' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Support Tickets</h1>
          <Link 
            href="/tickets/create" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Ticket
          </Link>
        </div>

        {/* Ticket Statistics */}
        <TicketStats 
          totalTickets={stats.totalTickets}
          openTickets={stats.openTickets}
          inProgressTickets={stats.inProgressTickets}
          closedTickets={stats.closedTickets}
        />

        {/* Filter Controls */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6 p-4">
          <div className="flex space-x-4">
            <button 
              onClick={() => setFilterStatus('All')} 
              className={`px-3 py-2 text-sm font-medium rounded-md ${filterStatus === 'All' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterStatus('Open')} 
              className={`px-3 py-2 text-sm font-medium rounded-md ${filterStatus === 'Open' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Open
            </button>
            <button 
              onClick={() => setFilterStatus('In Progress')} 
              className={`px-3 py-2 text-sm font-medium rounded-md ${filterStatus === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'}`}
            >
              In Progress
            </button>
            <button 
              onClick={() => setFilterStatus('Closed')} 
              className={`px-3 py-2 text-sm font-medium rounded-md ${filterStatus === 'Closed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Closed
            </button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <li key={ticket.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Link href={`/tickets/${ticket.id}`} className="block">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-600 truncate">{ticket.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{ticket.description}</p>
                        <div className="mt-2 flex">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2
                            ${ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' : 
                             ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 
                             'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'}
                          `}>
                            {ticket.status}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${ticket.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' : 
                             ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' : 
                             'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'}
                          `}>
                            {ticket.priority} Priority
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{ticket.createdAt}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500 dark:text-gray-400">
                No tickets found matching the current filter.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}