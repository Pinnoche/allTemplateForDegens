const Section1 = () => {
  return (
    <div className="bg-black text-white grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-16">
      <div className="w-full flex flex-col items-center lg:items-start pt-6 md:pt-16 text-center lg:text-left">
        <h1 className="text-2xl sm:text-2xl md:text-5xl font-extrabold uppercase tracking-normal sm:tracking-wide">
          Welcome to
        </h1>
        <h1 className="text-4xl sm:text-3xl lg:text-7xl font-black text-purple-500 uppercase tracking-normal sm:tracking-wide animate-pulse mt-2">
          KUMUNDO
        </h1>
        <p className="mt-6 mb-6 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-lg">
          Claim your space in the metaverse. Experience the revolution of
          decentralized living.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md hover:from-purple-700 hover:to-blue-600 text-lg sm:text-xl shadow-md transform hover:scale-105 transition-transform">
            Buy Now
          </button>
          <button className="bg-gray-900 text-white py-3 px-6 text-lg sm:text-xl rounded-md hover:bg-gray-800 shadow-md transform hover:scale-105 transition-transform">
            Chart
          </button>
          <p>
            
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img
          src="./assets/cat1.jpeg"
          alt="Banner"
          className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Section1;
