'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { getTicketById, Ticket } from '@/app/data/tickets';

export default function TicketDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isUsed, setIsUsed] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Fetch ticket data
  useEffect(() => {
    setTimeout(() => {
      // In a real app, this would be an API call
      const ticketId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
      const foundTicket = getTicketById(ticketId);
      
      if (foundTicket) {
        setTicket(foundTicket);
        setIsUsed(foundTicket.isUsed);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  const toggleTicketUsage = () => {
    setIsUsed(!isUsed);
    // In a real app, this would update the ticket usage status via API
    if (ticket) {
      setTicket({
        ...ticket,
        isUsed: !isUsed
      });
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNote.trim() || !ticket) return;
    
    // In a real app, this would add a note via API
    const newNoteObj = {
      id: (ticket.notes?.length || 0) + 1,
      author: 'You',
      content: newNote,
      createdAt: new Date().toLocaleDateString()
    };
    
    setTicket({
      ...ticket,
      notes: [...(ticket.notes || []), newNoteObj]
    });
    
    setNewNote('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 md:pt-28 py-6 md:py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 shadow sm:rounded-lg p-6 text-center border border-gray-800">
            <h1 className="text-xl font-semibold text-red-500 mb-2">Ticket Not Found</h1>
            <p className="text-gray-300 mb-4">The ticket you are looking for does not exist or has been removed.</p>
            <Link 
              href="/tickets" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Back to Tickets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-28 py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link 
            href="/tickets" 
            className="text-red-500 hover:text-red-400 flex items-center group transition-colors"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to Tickets
          </Link>
        </div>

        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden mb-6 shadow-lg shadow-red-900/20">
          <div className="relative">
            {/* Ticket Type Badge */}
            <div className="absolute top-4 right-4">
              <div className={`px-3 py-1 rounded text-xs md:text-sm font-bold ${ticket.type === 'VIP' ? 'bg-red-500 text-white' : ticket.type === 'Premium' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'}`}>
                {ticket.type}
              </div>
            </div>
            
            {/* Ticket Header */}
            <div className="px-4 py-6 md:px-6 md:py-8">
              <div className="flex items-center mb-2">
                <FaTicketAlt className="text-red-500 mr-2 flex-shrink-0" />
                <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Impact, fantasy', letterSpacing: '0.5px' }}>
                  {ticket.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                Ticket #{ticket.id} • Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {/* Ticket Details */}
          <div className="border-t border-gray-800 px-4 py-4 md:px-6 md:py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                    <h4 className="text-sm font-semibold text-gray-300">Venue</h4>
                  </div>
                  <p className="text-white">{ticket.venue}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <FaCalendarAlt className="text-red-500 mr-2" />
                    <h4 className="text-sm font-semibold text-gray-300">Event Date</h4>
                  </div>
                  <p className="text-white">{ticket.eventDate}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-1">Artist</h4>
                  <p className="text-white">{ticket.artist}</p>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-1">Seating</h4>
                  <p className="text-white">Section {ticket.section}, Row {ticket.row}, Seat {ticket.seat}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-1">Price</h4>
                  <p className="text-white font-bold">${ticket.price.toFixed(2)}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-1">Ticket Status</h4>
                  <div className="flex items-center">
                    <button 
                      onClick={toggleTicketUsage}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isUsed ? 'bg-green-500' : 'bg-gray-700'}`}
                      role="switch"
                      aria-checked={isUsed}
                      aria-label="Toggle ticket usage status"
                    >
                      <span 
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isUsed ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                    <span className="ml-2 text-sm">
                      {isUsed ? 'Used' : 'Unused'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ticket Description */}
          <div className="border-t border-gray-800 px-4 py-4 md:px-6 md:py-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Description</h4>
            <p className="text-white">{ticket.description}</p>
            
            {/* Features */}
            {ticket.features && ticket.features.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {ticket.features.map((feature: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden mb-6 shadow-lg">
          <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-800">
            <h3 className="text-lg font-bold text-white">
              Ticket Notes
            </h3>
          </div>
          <div className="px-4 py-4 md:px-6 md:py-6">
            {ticket.notes && ticket.notes.length > 0 ? (
              <ul className="space-y-4">
                {ticket.notes.map((note: any) => (
                  <li key={note.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-white">{note.author}</span>
                      <span className="text-xs text-gray-400">{note.createdAt}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-300">{note.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">
                No notes yet.
              </p>
            )}

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="mt-6">
              <div>
                <label htmlFor="note" className="sr-only">Add a note</label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  className="shadow-sm block w-full focus:ring-red-500 focus:border-red-500 sm:text-sm border border-gray-700 rounded-md bg-gray-800 text-white"
                  placeholder="Add a note about this ticket..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* QR Code Placeholder */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden mb-6 p-4 md:p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-4">Ticket QR Code</h3>
          <div className="bg-white w-32 h-32 md:w-48 md:h-48 mx-auto flex items-center justify-center">
            <div className="text-black text-xs md:text-sm">QR Code Placeholder</div>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Present this QR code at the venue entrance for quick access.
          </p>
        </div>
      </div>
    </div>
  );
}