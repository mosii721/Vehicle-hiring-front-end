import { useState } from 'react';
import {
  useFetchFleetsQuery,
  useCreateFleetMutation,
  useUpdateFleetMutation,
  useDeleteFleetMutation,
} from './FleetAPI';
import { toast } from 'sonner';

interface Fleet {
  fleet_id: number;
  vehicle_id: number;
  acquisition_date: string;
  depreciation_rate: number;
  current_value: number;
  maintenance_cost: number;
  status: string;
  created_at: string;
  updated_at: string;
}

function Fleet() {
  const { data: fleets = [], error, isLoading } = useFetchFleetsQuery();
  const [createFleet, { isLoading: isCreatingFleet }] = useCreateFleetMutation();
  const [updateFleet] = useUpdateFleetMutation();
  const [deleteFleet] = useDeleteFleetMutation();

  const [formData, setFormData] = useState({
    fleet_id: 0,
    vehicle_id: 0,
    acquisition_date: '',
    depreciation_rate: 0,
    current_value: 0,
    maintenance_cost: 0,
    status: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'vehicle_id' || name === 'depreciation_rate' || name === 'current_value' || name === 'maintenance_cost'
        ? parseInt(value)
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateFleet(formData).unwrap();
        toast.success('Fleet updated successfully!');
      } else {
        await createFleet(formData).unwrap();
        toast.success('Fleet created successfully!');
      }
      setFormData({
        fleet_id: 0,
        vehicle_id: 0,
        acquisition_date: '',
        depreciation_rate: 0,
        current_value: 0,
        maintenance_cost: 0,
        status: '',
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting form data:', error);
      toast.error('Error submitting form data.');
    }
  };

  const handleEdit = (fleet: Fleet) => {
    setFormData(fleet);
    setIsEditing(true);
  };

  const handleDelete = async (fleet_id: number) => {
    try {
      await deleteFleet(fleet_id).unwrap();
      toast.success('Fleet deleted successfully!');
    } catch (error) {
      console.error('Error deleting fleet:', error);
      toast.error('Error deleting fleet.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching fleet data</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {fleets.map((fleet: Fleet) => (
            <div key={fleet.fleet_id} className="border border-gray-400 rounded-lg p-4 m-4 w-64 shadow-md text-left">
              <h2 className="text-xl font-bold">Fleet ID: {fleet.fleet_id}</h2>
              <p>Vehicle ID: {fleet.vehicle_id}</p>
              <p>Acquisition Date: {new Date(fleet.acquisition_date).toLocaleDateString()}</p>
              <p>Depreciation Rate: {fleet.depreciation_rate}%</p>
              <p>Current Value: ${fleet.current_value}</p>
              <p>Maintenance Cost: ${fleet.maintenance_cost}</p>
              <p>Status: {fleet.status}</p>
              <p>Created At: {new Date(fleet.created_at).toLocaleString()}</p>
              <p>Updated At: {new Date(fleet.updated_at).toLocaleString()}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(fleet)}
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(fleet.fleet_id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="number"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleInputChange}
            placeholder="Vehicle ID"
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="acquisition_date"
            value={formData.acquisition_date}
            onChange={handleInputChange}
            placeholder="Acquisition Date"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="depreciation_rate"
            value={formData.depreciation_rate}
            onChange={handleInputChange}
            placeholder="Depreciation Rate"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="current_value"
            value={formData.current_value}
            onChange={handleInputChange}
            placeholder="Current Value"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="maintenance_cost"
            value={formData.maintenance_cost}
            onChange={handleInputChange}
            placeholder="Maintenance Cost"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            placeholder="Status"
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded" disabled={isCreatingFleet}>
          {isCreatingFleet ? 'Creating...' : isEditing ? 'Update Fleet' : 'Create Fleet'}
        </button>
      </form>
    </div>
  );
}

export default Fleet;
