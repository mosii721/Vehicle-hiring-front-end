import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { prodUrl } from '../utils/utils';


const stripePromise = loadStripe('pk_test_51Pbj74Rwjm0d4hM8NTcTqVTxs5IJ3iwew5hcpgjVnsCTDlRggALgUV8Ub8MEom29gDWvMA0xGYZxEfTTd9m3ZfgU00oN6vNj7q');

interface BookingData {
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: 'Pending' | 'Confirmed' | 'Cancelled';
}

function CarBookingForm() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [formData, setFormData] = useState<BookingData>({
    user_id: 0,
    vehicle_id: parseInt(vehicleId || '0'),
    location_id: 0,
    booking_date: '',
    return_date: '',
    total_amount: 0,
    booking_status: 'Pending',
  });
  const [rentalRate, setRentalRate] = useState<number>(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setFormData(prevData => ({
      ...prevData,
      user_id: userId ? parseInt(userId) : 0,
      vehicle_id: parseInt(vehicleId || '0'),
    }));

    // Fetch the rental rate for the vehicle
    const fetchRentalRate = async () => {
      try {
        const response = await axios.get(`${prodUrl}/vehicles/${vehicleId}`);
        setRentalRate(response.data.rental_rate);
        
      } catch (error) {
        console.error('Error fetching rental rate:', error);
      }
    };

    fetchRentalRate();
  }, [vehicleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'total_amount' || name === 'user_id' || name === 'vehicle_id' || name === 'location_id'
        ? parseInt(value)
        : value,
    });

    if (name === 'booking_date' || name === 'return_date') {
      const bookingDate = name === 'booking_date' ? value : formData.booking_date;
      const returnDate = name === 'return_date' ? value : formData.return_date;
      if (bookingDate && returnDate) {
        const days = calculateDays(bookingDate, returnDate);
        const totalAmount = days * rentalRate;
        console.log(rentalRate)
        setFormData(prevData => ({
          ...prevData,
          total_amount: totalAmount,
        }));
      }
    }
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      validateFormData(formData);
      console.log('Booking data is valid:', formData);

      // After creating the booking
      const bookingResponse = await axios.post(`${prodUrl}/bookings`, formData);
      console.log('Booking response:', bookingResponse.data);
     
      // Fetch the latest booking for this user and vehicle
      const booking = bookingResponse.data;
      if (!booking || !booking.booking_id) {  // Change here
        console.error('Full booking response:', bookingResponse);
        throw new Error('Booking details not returned from server. Full response logged above.');
      }
      
      console.log('Booking created with ID:', booking.booking_id); // Change here
      
      // Create payment intent using the booking ID
      const paymentResponse = await axios.post(`${prodUrl}/payments`, {
        booking_id: booking.booking_id, // Change here
        amount: formData.total_amount,
        payment_method: 'stripe',
      });
  
      const clientSecret = paymentResponse.data.client_secret;
      if (clientSecret && stripe && elements) {
        const cardElement = elements.getElement(CardElement);
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement!,
            billing_details: {},
          },
        });

        if (paymentResult.error) {
          console.error('Stripe checkout error:', paymentResult.error.message);
          toast.error('Payment error: ' + paymentResult.error.message);
        } else if (paymentResult.paymentIntent?.status === 'succeeded') {
          console.log('Payment successful!');
          toast.success('Booking and payment successful');
        
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        toast.error(`Booking error: ${error.response?.data?.error || error.message}`);
      } else if (error instanceof Error) {
        console.error('An unexpected error occurred:', error.message);
        toast.error(error.message);
      } else {
        console.error('An unknown error occurred:', error);
        toast.error('An unknown error occurred during booking');
      }
    }
  };

  const validateFormData = (data: BookingData) => {
    const errors: string[] = [];

    if (!data.user_id) errors.push('User ID is required.');
    if (!data.vehicle_id) errors.push('Vehicle ID is required.');
    if (!data.location_id) errors.push('Location ID is required.');
    if (!data.booking_date) errors.push('Booking Date is required.');
    if (!data.return_date) errors.push('Return Date is required.');
    if (isNaN(data.total_amount) || data.total_amount <= 0) errors.push('Total Amount must be a positive number.');
    if (!['Pending', 'Confirmed', 'Cancelled'].includes(data.booking_status)) {
      errors.push('Booking Status is invalid.');
    }

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  };

  return (
    <div className="bg-gray-100 max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl mb-6">Car Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          User ID:
          <input 
            type="number" 
            name="user_id" 
            value={formData.user_id} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            readOnly
          />
        </label>
        <label className="block">
          Vehicle ID:
          <input 
            type="number" 
            name="vehicle_id" 
            value={formData.vehicle_id} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            readOnly
          />
        </label>
        <label className="block">
         Location ID:
          <input 
            type="number" 
            name="location_id" 
            value={formData.location_id} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          Booking Date:
          <input 
            type="date" 
            name="booking_date" 
            value={formData.booking_date} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          Return Date:
          <input 
            type="date" 
            name="return_date" 
            value={formData.return_date} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          Total Amount:
          <input 
            type="number" 
            name="total_amount" 
            value={formData.total_amount} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            readOnly
          />
        </label>
        <label className="block">
          Booking Status:
          <select 
            name="booking_status" 
            value={formData.booking_status} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
        <div className="block">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

const CarBooking: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CarBookingForm />
  </Elements>
);

export default CarBooking;
