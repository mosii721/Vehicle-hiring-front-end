// import  { useEffect, useState } from 'react';
// import axios from 'axios';
// import { prodUrl } from '../utils/utils';

// interface Booking {
//   booking_id: number;
//   user_id: number;
//   vehicle_id: number;
//   location_id: number;
//   booking_date: string;
//   return_date: string;
//   total_amount: number;
//   booking_status: string;
//   created_at: string;
//   updated_at: string;
// }

// function BookingHistory () {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBookingHistory = async () => {
//       const userId = localStorage.getItem('userId');
//       if (!userId) {
//         setError('User ID not found in local storage.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(`${prodUrl}/bookings`);
//         if (Array.isArray(response.data)) {
//           const filteredBookings = response.data.filter((booking: Booking) => booking.user_id === parseInt(userId, 10));
//           setBookings(filteredBookings);
//         } else {
//           setError('Failed check user_id');
//         }
//       } catch (error) {
//         setError('Failed to fetch booking history.');
//         console.error('Error fetching booking history:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingHistory();
//   }, []);

//   if (loading) return <div className="text-center">Loading...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-bold mb-4">Booking History</h1>
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Booking ID</th>
//             <th className="py-2 px-4 border-b">Vehicle ID</th>
//             <th className="py-2 px-4 border-b">Location ID</th>
//             <th className="py-2 px-4 border-b">Booking Date</th>
//             <th className="py-2 px-4 border-b">Return Date</th>
//             <th className="py-2 px-4 border-b">Total Amount</th>
//             <th className="py-2 px-4 border-b">Booking Status</th>
//             <th className="py-2 px-4 border-b">Created At</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking) => (
//             <tr key={booking.booking_id}>
//               <td className="py-2 px-4 border-b">{booking.booking_id}</td>
//               <td className="py-2 px-4 border-b">{booking.vehicle_id}</td>
//               <td className="py-2 px-4 border-b">{booking.location_id}</td>
//               <td className="py-2 px-4 border-b">{new Date(booking.booking_date).toLocaleDateString()}</td>
//               <td className="py-2 px-4 border-b">{new Date(booking.return_date).toLocaleDateString()}</td>
//               <td className="py-2 px-4 border-b">${booking.total_amount}</td>
//               <td className="py-2 px-4 border-b">{booking.booking_status}</td>
//               <td className="py-2 px-4 border-b">{new Date(booking.created_at).toLocaleString()}</td>
            
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookingHistory;
