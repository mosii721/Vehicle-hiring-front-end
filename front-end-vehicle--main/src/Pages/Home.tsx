
import { Link } from 'react-router-dom';

import About from './About';


function HomePage () {
  return (
    <>
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Mobility Enterprise 
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Your ultimate destination for seamless mobility solutions
      </p>
      <div className="flex space-x-4 mb-8">
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
            Register
          </button>
        </Link>
        {/* <Link to="/about">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
            About Us
          </button>
        </Link> */}
      </div>
      
      <About/>
      
    </div>
   
    </>
  );
};

export default HomePage;
