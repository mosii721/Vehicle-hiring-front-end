import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { useFetchRentalRateQuery, useCreateBookingMutation, useCreatePaymentIntentMutation } from './BookingAPI';

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

  // Fetch rental rate and convert it to a number
  const { data: rentalRateData, isLoading: isLoadingRate } = useFetchRentalRateQuery(parseInt(vehicleId || '0'));
  const rentalRate = rentalRateData ? parseFloat(rentalRateData.rental_rate) : 0; // Convert to number

  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();
  const [createPaymentIntent, { isLoading: isCreatingPaymentIntent }] = useCreatePaymentIntentMutation();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setFormData((prevData) => ({
      ...prevData,
      user_id: userId ? parseInt(userId) : 0,
      vehicle_id: parseInt(vehicleId || '0'),
    }));
  }, [vehicleId]);

  useEffect(() => {
    if (formData.booking_date && formData.return_date && !isNaN(rentalRate)) { // Check rentalRate validity
      const days = calculateDays(formData.booking_date, formData.return_date);
      const totalAmount = days * rentalRate;
      setFormData((prevData) => ({
        ...prevData,
        total_amount: totalAmount,
      }));
    }
  }, [formData.booking_date, formData.return_date, rentalRate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['total_amount', 'user_id', 'vehicle_id', 'location_id'].includes(name)
        ? parseInt(value) || 0 // Handle NaN and default to 0
        : value,
    });
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      validateFormData(formData);

      const bookingResponse = await createBooking(formData).unwrap();
      const booking = bookingResponse;

      if (!booking || !booking.booking_id) {
        console.error('Full booking response:', bookingResponse);
        throw new Error('Booking details not returned from server. Full response logged above.');
      }

      const paymentResponse = await createPaymentIntent({
        booking_id: booking.booking_id,
        amount: formData.total_amount,
        payment_method: 'stripe',
      }).unwrap();

      const clientSecret = paymentResponse.client_secret;

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
          toast.success('Booking and payment successful');
        
        }
      }
    } catch (error: any) {
      console.error('Error during booking and payment process:', error);
      toast.error(`Error: ${error.message}`);
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
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
          disabled={isLoadingRate || isCreatingBooking || isCreatingPaymentIntent} // Disable if any process is loading
        >
          {isCreatingBooking || isCreatingPaymentIntent ? (
            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">looo
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="none" stroke="currentColor" strokeWidth="4" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
            </svg>
            
          ) : (
            'SUBMIT'
          )}
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
