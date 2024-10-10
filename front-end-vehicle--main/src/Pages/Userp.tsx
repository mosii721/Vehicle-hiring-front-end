import  { useState } from 'react';
import Navbar from '../Components/Navbar';

import SideNav from '../Components/SideNav';
import Footer from '../Components/Footer';
import VehicleData from './Vehicles';
import BookingHistory from './History/History';
import Me from './Me';
import Tickets from './Tickets/Tickets';


// Define an interface for the car object
interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  image: string;
}

// Sample car data
const cars: Car[] = [
  { id: 1, name: 'Tesla Model S', model: 'Model S', year: 2020, image: 'https://i.pinimg.com/736x/3c/85/22/3c8522ea0b6977356018b66e73724b51.jpg' },
  { id: 2, name: 'BMW 3 Series', model: '3 Series', year: 2019, image: 'https://i.pinimg.com/474x/80/c1/8f/80c18f788977ca0bb906eaa3bde3237b.jpg' },
  { id: 3, name: 'Audi A4', model: 'A4', year: 2018, image: 'https://i.pinimg.com/564x/ff/6c/ec/ff6cec201ad3da406bc6699f55bf52c5.jpg' },
  { id: 4, name: 'BMW 3 Series', model: '3 Series', year: 2019, image: 'https://i.pinimg.com/474x/80/c1/8f/80c18f788977ca0bb906eaa3bde3237b.jpg' },
];

function UserCarPage () {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);
  const [selectedContent, setSelectedContent] = useState('dashboard'); // State to keep track of selected content

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'dashboard':
        return (
          <div className="font-sans p-6 text-center transition-all duration-300">
            <h1 className="text-3xl mb-8"></h1>
            <div className="flex flex-wrap justify-around">
              {cars.map((car) => (
                <div key={car.id} className="border border-gray-300 rounded-lg p-4 m-4 w-52 shadow-md text-left">
                  <img src={car.image} alt={car.name} className="w-full rounded-t-lg" />
                  <h2 className="text-xl my-2">{car.name}</h2>
                  <p className="text-gray-600">{car.model} - {car.year}</p>
                </div>
              ))}
            </div>
          </div>
        );
        case 'Vehicles':
          return <VehicleData />;
          case 'Me':
            return <Me />;
            case 'Ticket':
            return <Tickets />;
      case 'history':
        return <BookingHistory/>;
       
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <button onClick={toggleSideNav} className="p-2 text-white top-0 left-0 m-4 z-10">
        {isSideNavVisible ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m11 17-5-5 5-5"/>
            <path d="m18 17-5-5 5-5"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 17 5-5-5-5"/>
            <path d="m13 17 5-5-5-5"/>
          </svg>
        )}
      </button>
      <div className="flex">
        {isSideNavVisible && <SideNav onSelect={setSelectedContent} />}
        <div className={`transition-all duration-300 ${isSideNavVisible ? 'ml-569' : 'ml-20'}`}>
          {renderContent()}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default UserCarPage;
