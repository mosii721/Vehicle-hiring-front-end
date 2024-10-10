import  { useEffect, useState } from 'react';
import axios from 'axios';
import { prodUrl } from '../utils/utils';



interface User {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  role: string;
}

function User ()  {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${prodUrl}/users`);
      setIsLoading(false);
      setUsers(response.data);
     
    } catch (error:any) {
      setError(error.message);
      setIsLoading(false);
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (user_id: number) => {
    try {
      await axios.delete(`${prodUrl}/users/${user_id}`);
      setUsers(users.filter(user => user.user_id !== user_id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2">ID</th>
            <th className="w-1/6 py-2">Full Name</th>
            <th className="w-2/6 py-2">Email</th>
            <th className="w-1/6 py-2">Contact Phone</th>
            <th className="w-1/6 py-2">Address</th>
            <th className="w-1/6 py-2">Role</th>
            <th className="w-1/6 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id} className="bg-gray-100 border-b">
              <td className="py-2 px-4">{user.user_id}</td>
              <td className="py-2 px-4">{user.full_name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.contact_phone}</td>
              <td className="py-2 px-4">{user.address}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => deleteUser(user.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    </>
  );
};

export default User;
