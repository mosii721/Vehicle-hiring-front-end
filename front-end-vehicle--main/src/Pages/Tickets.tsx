import { useState, useEffect } from 'react';
import axios from 'axios';

interface Ticket {
  id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await axios.get<Ticket[]>(`http://localhost:3000/customer-support`);
        if (Array.isArray(response.data)) {
          const filteredTickets = response.data.filter((ticket: Ticket) => ticket.user_id === parseInt(userId, 10));
          setTickets(filteredTickets);
          console.log(filteredTickets);
        } else {
          console.error('Failed check user_id');
        }
        console.log(response);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  const handleCreateTicket = async () => {
    if (!subject || !description || !status || !createdAt || !updatedAt) {
      alert('Please fill in all fields');
      return;
    }

    try {
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }
      const newTicket: Omit<Ticket, 'id'> = {
        user_id: parseInt(userId, 10),
        subject,
        description,
        status,
        created_at: createdAt,
        updated_at: updatedAt,
      };
      const response = await axios.post<Ticket>('http://localhost:3000/customer-support', newTicket);
      setTickets([...tickets, response.data]);
      setSubject('');
      setDescription('');
      setStatus('Active');
      setCreatedAt('');
      setUpdatedAt('');
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Customer Support Tickets</h1>

      <h2 className="text-xl font-semibold mb-3">Your Tickets</h2>
      <div className="space-y-4">
        {tickets.map((ticket: Ticket) => (
          <div key={ticket.id} className="p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-semibold">{ticket.subject}</h3>
            <p className="text-gray-700">{ticket.description}</p>
            <div className="text-sm text-gray-500">
              <p>Status: {ticket.status}</p>
              <p>Created At: {new Date(ticket.created_at).toLocaleString()}</p>
              <p>Updated At: {new Date(ticket.updated_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Create a New Support Ticket</h2>
        <div className="mb-3">
          <label className="block mb-1">Subject</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Status</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Created At</label>
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-300 rounded"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Updated At</label>
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-300 rounded"
            value={updatedAt}
            onChange={(e) => setUpdatedAt(e.target.value)}
          />
        </div>
        <button
          onClick={handleCreateTicket}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Ticket
        </button>
      </div>

     
     
    </div>
  );
}

export default Tickets;
