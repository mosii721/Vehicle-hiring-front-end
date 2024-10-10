
import { useEffect, useState } from 'react';

function Success() {
    const [loading, setLoading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  }, []);
  return (
  <>
   <div className="flex items-center justify-center h-screen bg-gray-100">
      {loading < 100 ? (
        <div className="text-center">
          <div className="relative w-64 h-64">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 left-0 w-6 h-6 bg-green-500 rounded-full animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${1 + Math.random() * 1}s`,
                }}
              >
                💸
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-4">
            <div
              className="bg-green-500 h-full"
              style={{ width: `${loading}%`, transition: 'width 0.5s' }}
            />
          </div>
          <div className="mt-2 text-gray-700">{loading}%</div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-4xl text-green-600">Booking Confirmed!</div>
        </div>
      )}
    </div>
  </>
  )
}

export default Success