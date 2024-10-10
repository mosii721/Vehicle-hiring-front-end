
import { useFetchTicketsQuery, useDeleteTicketMutation } from './SupportAPI';
import { toast } from 'sonner';

interface Ticket {
    ticket_id: number;
    user_id: number;
    subject: string;
    description: string;
    status: string;
    created_at: string;
  }

function Support() {
  const { data: tickets = [], error, isLoading } = useFetchTicketsQuery();
  const [deleteTicket, { isLoading: isDeleting }] = useDeleteTicketMutation();

  const handleRespond = (ticketId: number) => {
    console.log(`Respond to ticket ${ticketId}`);
    // Add your respond logic here
  };

  const handleDelete = async (ticketId: number) => {
    try {
      await deleteTicket(ticketId).unwrap();
      
      toast.success('Ticket deleted successfully');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.error('Error deleting ticket');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Support Tickets</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching tickets</p>
      ) : (
        tickets.map((ticket:Ticket) => (
          <div key={ticket.ticket_id} className="bg-white shadow-md rounded p-4 mb-4">
            <p><strong>Ticket ID:</strong> {ticket.ticket_id}</p>
            <p><strong>User ID:</strong> {ticket.user_id}</p>
            <p><strong>Subject:</strong> {ticket.subject}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleRespond(ticket.ticket_id)}
              >
                Respond
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(ticket.ticket_id)}
                disabled={isDeleting}
              >
                {isDeleting? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Support;
