// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { prodUrl } from '../utils/utils';

// interface Fleet {
//   fleet_id: number;
//   vehicle_id: number;
//   acquisition_date: string;
//   depreciation_rate: string;
//   current_value: string;
//   maintenance_cost: string;
//   status: string;
//   created_at: string;
//   updated_at: string;
// }

// function Fleet() {
//   const [fleets, setFleets] = useState<Fleet[]>([]);
//   const [formData, setFormData] = useState({
//     vehicle_id: 0,
//     acquisition_date: '',
//     depreciation_rate: 0,
//     current_value: 0,
//     maintenance_cost: 0,
//     status: ''
//   });

//   useEffect(() => {
//     fetchFleets();
//   }, []);

//   const fetchFleets = async () => {
//     try {
//       const response = await axios.get(`${prodUrl}/fleet`);
//       setFleets(response.data);
//       console.log(response);
//     } catch (error) {
//       console.error('Error fetching fleet data:', error);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ 
//       ...formData,
//       [name]: name === 'vehicle_id' || name === 'depreciation_rate' || name === 'current_value' || name === 'maintenance_cost'
//         ? parseInt(value)
//         : value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       console.log('Submitting form data:', formData);
//       const response = await axios.post('http://localhost:3000/fleet', formData);
//       console.log('Response:', response);
//       fetchFleets(); // Refresh the fleet list after creating a new fleet
//     } catch (error: any) {
//       console.error('Error creating fleet:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 gap-4">
//         {fleets.map((fleet) => (
//           <div key={fleet.fleet_id} className="border border-gray-400 rounded-lg p-4 m-4 w-64 shadow-md text-left">
//             <h2 className="text-xl font-bold">Fleet ID: {fleet.fleet_id}</h2>
//             <p>Vehicle ID: {fleet.vehicle_id}</p>
//             <p>Acquisition Date: {new Date(fleet.acquisition_date).toLocaleDateString()}</p>
//             <p>Depreciation Rate: {fleet.depreciation_rate}%</p>
//             <p>Current Value: ${fleet.current_value}</p>
//             <p>Maintenance Cost: ${fleet.maintenance_cost}</p>
//             <p>Status: {fleet.status}</p>
//             <p>Created At: {new Date(fleet.created_at).toLocaleString()}</p>
//             <p>Updated At: {new Date(fleet.updated_at).toLocaleString()}</p>
//           </div>
//         ))}
//       </div>

//       <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>

//       <form onSubmit={handleSubmit} className="mb-6">
//         <div className="grid grid-cols-1 gap-4">
//           <input
//             type="number"
//             name="vehicle_id"
//             value={formData.vehicle_id}
//             onChange={handleInputChange}
//             placeholder="Vehicle ID"
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="date"
//             name="acquisition_date"
//             value={formData.acquisition_date}
//             onChange={handleInputChange}
//             placeholder="Acquisition Date"
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             name="depreciation_rate"
//             value={formData.depreciation_rate}
//             onChange={handleInputChange}
//             placeholder="Depreciation Rate"
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             name="current_value"
//             value={formData.current_value}
//             onChange={handleInputChange}
//             placeholder="Current Value"
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             name="maintenance_cost"
//             value={formData.maintenance_cost}
//             onChange={handleInputChange}
//             placeholder="Maintenance Cost"
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             name="status"
//             value={formData.status}
//             onChange={handleInputChange}
//             placeholder="Status"
//             className="p-2 border rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
//           Create Fleet
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Fleet;
