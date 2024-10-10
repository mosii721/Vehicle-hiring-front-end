
import { useSelector } from 'react-redux';
import { RootState } from './Login/Store';

function Profile () {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-80">
      <div className="text-center mb-4">
        <img src={`https://i.pinimg.com/474x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg`} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
       
      </div>
      <div className="text-left">
      <p className="text-gray-600 mb-2"><span className="font-semibold">ID:</span> {user.user_id}</p>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Full Name:</span> {user.full_name}</p>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Phone:</span> {user.contact_phone}</p>
        <p className="text-gray-600"><span className="font-semibold">Address:</span> {user.address}</p>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Role:</span> {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;
