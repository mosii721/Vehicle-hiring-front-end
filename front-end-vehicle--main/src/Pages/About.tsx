


function About () {
  return (
    <>
    <div className="p-5 text-center font-sans bg-white">
      <h1 className="text-4xl text-gray-800 mb-4">About Mobility Car Enterprise</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to Mobility Car Enterprise! We are dedicated to providing top-notch mobility solutions
        with a wide range of vehicles to meet all your transportation needs. Our fleet includes the latest
        models, ensuring comfort, safety, and reliability.
      </p>
      <div className="flex justify-center mb-6">
        <img
          className="w-72 h-auto m-2 rounded-lg"
          src="https://i.pinimg.com/474x/50/87/18/5087187351abad2938a4fc5b9a4a1b57.jpg"
          alt="Car 1"
        />
        <img
          className="w-72 h-auto m-2 rounded-lg"
          src="https://i.pinimg.com/474x/70/55/ba/7055bac186fe5a49324f41537608ee70.jpg"
          alt="Car 2"
        />
        <img
          className="w-72 h-auto m-2 rounded-lg"
          src="https://i.pinimg.com/474x/fe/39/dc/fe39dc471b25dc6ac4fc7296e1b31232.jpg"
          alt="Car 3"
        />
      </div>
      <p className="text-lg text-gray-700">
        Our mission is to enhance your mobility experience with exceptional customer service and a variety
        of vehicles to choose from. Whether you need a car for daily commute, business trips, or leisure,
        Mobility Car Enterprise is here to help.
      </p>
    </div>
    
    </>
  );
};

export default About;
