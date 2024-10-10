

function NotFoundPage () {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div 
        className="relative w-full h-full"
        style={{
          backgroundImage: 'url("https://i.pinimg.com/474x/a4/3e/e6/a43ee6d3e310564af22b71bdfb1a52e7.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
          <p className="text-2xl md:text-3xl mb-4">Page not found</p>
          <p className="text-lg md:text-xl mb-6">Sorry, we couldn't find the page you're looking for.</p>
          <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
          <a href="/" className="text-white-800 underline hover:text-red-600">Back to home</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
