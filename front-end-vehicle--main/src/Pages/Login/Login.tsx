import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import { Link } from 'react-router-dom';
import {  toast } from 'sonner';
import { login as loginAction } from './Slice'; // Import the login action from your slice
import { loginAPI } from './LoginAPI';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = loginAPI.useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const response: any = await login(user).unwrap();
      console.log('login successful');
      console.log(response);
    
      // Store the response in localStorage
      localStorage.setItem('response', JSON.stringify(response));

      // JWT token
      const token = response.token;
      localStorage.setItem('authToken', token);
      const decodedToken: any = jwtDecode(token); // Decode the token

      // Get user details from the response
      const userDetails = response.user;
      localStorage.setItem('userId', userDetails.user_id.toString());
      // Dispatch user details to Redux store
      dispatch(loginAction({
     user_id: userDetails.user_id,
        full_name: userDetails.full_name,
        email: userDetails.email,
        contact_phone: userDetails.contact_phone,
        address: userDetails.address,
        role: userDetails.role,
      }));

      // Check the decoded token for roles and navigate accordingly
      if (decodedToken.role === 'admin') {
        navigate('/Admin');
        toast.success('Login Successful');
      } else if (decodedToken.role === 'user') {
        navigate('/Userprofile');
        toast.success('Login Successful');
      }
    } catch (error) {
      toast.error('Login failed');
      console.error('Failed to log in:', error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Login
            </button>
            <Link to="/register">
              <button type="button" className="w-full p-2 mt-2 bg-blue-400 text-white rounded hover:bg-blue-500">
                Register
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
