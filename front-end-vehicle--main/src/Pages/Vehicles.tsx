import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { prodUrl } from '../utils/utils';

function VehicleData ()  {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${prodUrl}/vehicles`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setVehicles(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Vehicle Data</h1>
        <div className="flex flex-wrap justify-around">
          {vehicles.map(vehicle => (
            <div key={vehicle.vehicle_id} className="border border-gray-300 rounded-lg p-4 m-4 w-64 shadow-md text-left">
              <div className="w-full h-32 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center overflow-hidden">
                <img src='https://i.pinimg.com/564x/01/b5/a8/01b5a8180fb86c0a59669707020c691b.jpg' className="w-full h-full object-cover" alt="Vehicle" />
              </div>
              <div className="text-lg font-semibold mb-2">Vehicle Spec ID: {vehicle.vehicleSpec_id}</div>
              <p className="text-white-700">Vehicle ID: {vehicle.vehicle_id}</p>
              <p className="text-white-700">Rental Rate: {vehicle.rental_rate}/day</p>
              <p className={vehicle.availability === 'Active' ? 'text-green-700' : 'text-red-700'}>Availability: {vehicle.availability}</p>
              <p className="text-white-700">Created At: {new Date(vehicle.created_at).toLocaleDateString()}</p>
              <p className="text-white-700">Updated At: {new Date(vehicle.updated_at).toLocaleDateString()}</p>
            
<Link to={`/Booking/${vehicle.vehicle_id}`}>
  <button className="px-12 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
    Book
  </button>
</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VehicleData;
