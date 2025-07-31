'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data for tickets (same as in tickets/page.tsx)
const MOCK_TICKETS = [
  {
    id: '1',
    title: 'Website not loading properly',
    status: 'Open',
    priority: 'High',
    createdAt: '2023-06-15',
    description: 'The main website is not loading images and some CSS seems broken.',
    comments: [
      { id: '1', author: 'John Doe', content: 'I\'ve checked the server logs and found some errors.', createdAt: '2023-06-15 14:30' },
      { id: '2', author: 'Jane Smith', content: 'Could be related to the recent CDN changes.', createdAt: '2023-06-15 15:45' },
    ],
  },
  {
    id: '2',
    title: 'Cannot reset password',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: '2023-06-14',
    description: 'Users report they are not receiving password reset emails.',
    comments: [
      { id: '1', author: 'Tech Support', content: 'We\'re investigating the email service.', createdAt: '2023-06-14 10:15' },
    ],
  },
  {
    id: '3',
    title: 'Feature request: Dark mode',
    status: 'Open',
    priority: 'Low',
    createdAt: '2023-06-10',
    description: 'Multiple users have requested a dark mode option for the application.',
    comments: [],
  },
  {
    id: '4',
    title: 'Payment processing error',
    status: 'Closed',
    priority: 'High',
    createdAt: '2023-06-05',
    description: 'Some users experienced payment processing errors during checkout.',
    comments: [
      { id: '1', author: 'Payment Team', content: 'Issue was with the payment gateway. Now fixed.', createdAt: '2023-06-06 09:30' },
      { id: '2', author: 'QA Team', content: 'Confirmed the fix is working.', createdAt: '2023-06-07 11:20' },
    ],
  },
];

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Simulate API call to get ticket details
    const fetchTicket = () => {
      setLoading(true);
      // Find ticket in mock data
      const foundTicket = MOCK_TICKETS.find(t => t.id === params.id);
      
      if (foundTicket) {
        setTicket(foundTicket);
        setNewStatus(foundTicket.status);
      }
      
      setLoading(false);
    };

    fetchTicket();
  }, [params.id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // In a real app, this would be an API call
    const newCommentObj = {
      id: Date.now().toString(),
      author: 'Current User',
      content: newComment,
      createdAt: new Date().toLocaleString(),
    };
    
    setTicket({
      ...ticket,
      comments: [...ticket.comments, newCommentObj],
    });
    
    setNewComment('');
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value);
    
    // In a real app, this would be an API call
    setTicket({
      ...ticket,
      status: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6 text-center">
            <h1 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Ticket Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">The ticket you are looking for does not exist or has been removed.</p>
            <Link 
              href="/tickets" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Tickets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <Link 
            href="/tickets" 
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tickets
          </Link>
        </div>

        {/* Ticket Header */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {ticket.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Ticket #{ticket.id} • Created on {ticket.createdAt}
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  <select 
                    value={newStatus} 
                    onChange={handleStatusChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${ticket.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' : 
                      ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' : 
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'}`}
                  >
                    {ticket.priority}
                  </span>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {ticket.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Comments
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {ticket.comments.length > 0 ? (
              <ul className="space-y-4">
                {ticket.comments.map((comment: any) => (
                  <li key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.author}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{comment.createdAt}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{comment.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No comments yet.
              </p>
            )}

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="mt-6">
              <div>
                <label htmlFor="comment" className="sr-only">Add a comment</label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}