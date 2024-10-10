
import { useFetchBookingsQuery,Booking } from './HistoryAPI';

function BookingHistory() {
  const userId = localStorage.getItem('userId');
  const { data: bookings, error, isLoading } = useFetchBookingsQuery();
  console.log(userId)

  const filteredBookings = bookings?.filter((booking:Booking) => booking.user_id === parseInt(userId || '0', 10));

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error.toString()}</div>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Booking History</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Booking ID</th>
            <th className="py-2 px-4 border-b">Vehicle ID</th>
            <th className="py-2 px-4 border-b">Location ID</th>
            <th className="py-2 px-4 border-b">Booking Date</th>
            <th className="py-2 px-4 border-b">Return Date</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Booking Status</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings?.map((booking:Booking) => (
            <tr key={booking.booking_id}>
              <td className="py-2 px-4 border-b">{booking.booking_id}</td>
              <td className="py-2 px-4 border-b">{booking.vehicle_id}</td>
              <td className="py-2 px-4 border-b">{booking.location_id}</td>
              <td className="py-2 px-4 border-b">{new Date(booking.booking_date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(booking.return_date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">${booking.total_amount}</td>
              <td className="py-2 px-4 border-b">{booking.booking_status}</td>
              <td className="py-2 px-4 border-b">{new Date(booking.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingHistory;
