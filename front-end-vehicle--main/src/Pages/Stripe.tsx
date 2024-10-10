import React, { useState } from 'react';

function PaymentForm () {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      cardNumber,
      expiryDate,
      cvc,
    
      zip,
    });
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Card information</label>
        <input
          type="text"
          placeholder="4242 4242 4242 4242"
          className="w-full mt-1 p-2 border rounded-md"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="MM / YY"
          className="w-1/2 mr-2 p-2 border rounded-md"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVC"
          className="w-1/2 ml-2 p-2 border rounded-md"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>
    
      <div className="mb-4">
        <label className="block text-gray-700">ZIP</label>
        <input
          type="text"
          placeholder="12345"
          className="w-full mt-1 p-2 border rounded-md"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
