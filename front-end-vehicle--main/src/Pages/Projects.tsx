
function Projects() {
  return (
    <>
     <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
        <h1 className="text-xl font-bold text-blue-500">My projects</h1>
       
        <div className="flex items-center space-x-4">
          <span className="text-gray-600"></span>
          <img src="https://i.pinimg.com/474x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
        </div>
      </header>

      <main className="mt-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-sm font-medium text-gray-500">Hospita system</h2>
            <p className="text-2xl font-bold text-gray-900">78%</p>
            <p className="text-sm text-gray-500">complete</p>
            <p className="mt-2 text-sm text-red-500"></p>
            <p className="mt-2 text-sm text-green-500">high</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-sm font-medium text-gray-500">Vehicles system</h2>
            <p className="text-2xl font-bold text-gray-900">98%</p>
            <p className="text-sm text-gray-500">Complete</p>
            <p className="mt-2 text-sm text-green-500">High</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-sm font-medium text-gray-500">Banking system</h2>
            <p className="text-2xl font-bold text-gray-900">84%</p>
            <p className="text-sm text-gray-500">Complete</p>
            
            <p className="mt-2 text-sm text-green-500">High</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-sm font-medium text-gray-500">Restraunt system</h2>
            <p className="text-2xl font-bold text-gray-900">40%</p>
            <p className="text-sm text-gray-500">Complete</p>
            <p className="mt-2 text-sm text-red-500">Low</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-sm font-medium text-gray-500">Steps</h2>
            <p className="text-2xl font-bold text-gray-900">52</p>
            <p className="text-sm text-gray-500"></p>
            <p className="mt-2 text-sm text-orange-500">Yesterday: 50</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-sm font-medium text-gray-500">Progress</h2>
            <p className="text-2xl font-bold text-gray-900">90</p>
            
            <p className="mt-2 text-sm text-green-500">Excellent</p>
          </div>
        </div>

       

        <div className="mt-6 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-sm font-medium text-gray-500">Sheet</h2>
          <div className="mt-4">

            <img src="https://i.pinimg.com/474x/e8/22/d3/e822d3a56e91ba588ccce395ed515bea.jpg"  className="w-full h-64 object-cover" />
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default Projects