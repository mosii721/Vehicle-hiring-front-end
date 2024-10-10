
import { Link } from 'react-router-dom';


const Topnav = () => {
  return (
    <nav className="bg-gray-900 p-4 flex items-center justify-between">
      <div className="flex items-center">
      <div className="ml-4">
          <img
            src="https://i.pinimg.com/474x/79/61/c1/7961c11230f94395b3e36308250e4964.jpg"
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>
     
      <div className="flex items-center">
        <div className="flex space-x-4">
            <Link to="/about" className="text-white">About</Link>

         
          <Link to="/contact" className="text-white">Contact</Link>
          <Link to="/vehicles" className="text-white">Vehicles</Link>
            
        
         
        </div>
        <div className="ml-4">
          <button className="text-gray-400 hover:text-white">
          
          </button>
        </div>
        <div className="ml-4">
          <img
            src="https://i.pinimg.com/474x/79/61/c1/7961c11230f94395b3e36308250e4964.jpg"
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
