import  { useState } from 'react';
import { useFetchTicketsQuery, useCreateTicketMutation } from './TicketsAPI';
import { toast } from 'sonner';


interface Ticket {
  id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
 
}

function Tickets() {
  const userId = localStorage.getItem('userId');
  const { data: tickets = [], isLoading, isError } = useFetchTicketsQuery();
 
  const [createTicket, { isLoading: isCreating }] = useCreateTicketMutation();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  
  const handleCreateTicket = async () => {
    if (!subject || !description || !status ) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const newTicket = {
        user_id: Number(userId),
        subject,
        description,
        status,
      
      };
      await createTicket(newTicket).unwrap();
      
      setSubject('');
      setDescription('');
      setStatus('Active');
     
      toast.success('Ticket created successfully');
    } catch (error) {
      console.error('Error creating fleet:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
    
  }

  if (isError) {
    return <div className="text-center mt-10">Error fetching tickets</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Customer Support Tickets</h1>

      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Your Tickets</h2>
      <div className="space-y-4">
        {tickets.length > 0 ? (
          tickets.map((ticket:Ticket) => (
            <div key={ticket.id} className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700">{ticket.subject}</h3>
              <p className="text-gray-800">{ticket.description}</p>
              <div className="text-sm text-gray-600 mt-2">
                <p><strong>Status:</strong> {ticket.status}</p>
                
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No tickets found</div>
        )}
      </div>

      <div className="mt-10 bg-white p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-blue-500">Create a New Support Ticket</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Status</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
       
        <button
          onClick={handleCreateTicket}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : 'Create Ticket'}
        </button>
      </div>
    </div>
  );
}

export default Tickets;
