import { useState } from "react";
function Welcome() {
  const [scaling, setScaling] = useState(false);
  return (
    <div className="relative bg-gradient-to-tr from-black via-gray-900 to-gray-800 min-h-screen w-full text-white">
      <nav className="fixed top-0 z-20 backdrop-blur-sm bg-transparent w-full px-10 py-4">
        <div className="flex justify-between items-center text-white">
          <div className="font-bold text-2xl animate-pulse">Degen Web App</div>
          <div className="flex gap-4">
            <a href="#" className="">
              Moderator
            </a>
            <a href="#" className="">
              Admins
            </a>
          </div>
          <div className="flex gap-4">
            <a href="/register" className="">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero section of the welcome page */}
      <div className="w-full pt-16">
        <div className="w-full relative pt-4 px-10">
          <div
            onMouseEnter={() => setScaling(true)}
            onMouseLeave={() => setScaling(false)}
            className={`w-full mb-4 bg-gradient-to-tr from-black via-gray-800 to-black rounded-md flex flex-col items-center p-4 space-y-8 transition duration-700 ease-in-out transform ${
              scaling ? "scale-105" : undefined
            }`}
          >
            <h1 className="p-4 font-bold break-words w-[60%] text-6xl text-center text-white">
              Your Degen Web App at Your Fingertips
            </h1>
            <p className="w-[50%] break-words text-gray-400 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              convallis libero et felis elementum, et fermentum odio euismod.
              Nullam auctor, odio ac scelerisque.
            </p>
            <div className="flex justify-center">
              <button className="px-6 py-3 bg-purple-800 rounded-md hover:bg-purple-600 transform hover:scale-110 transition duration-500 ease-in-out">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The Moderator and Super Admin Access Section */}
      <div>
        <div className="w-full bg-transparent px-5 py-10 flex items-center border-t border-b border-[rgba(255,255,255,0.1)]">
          <div className="w-full border-r border-[rgba(255,255,255,0.1)] py-20 flex flex-col flex-start gap-5 text-white">
            <h1 className="text-6xl font-bold">100+</h1>
            <h3 className="font-semibold text-lg">Total Partners</h3>
          </div>
        </div>
      </div>

      {/* About Users */}
      <div className="w-full bg-transparent px-5 gap-5 flex items-center border-t border-b border-[rgba(255,255,255,0.1)]">
        <div className="w-full border-r border-[rgba(255,255,255,0.1)] py-20 flex flex-col flex-start gap-5 text-white">
          <h1 className="text-6xl font-bold">100+</h1>
          <h3 className="font-semibold text-lg">Total Partners</h3>
        </div>
        <div className="w-full border-r border-[rgba(255,255,255,0.1)] py-20 flex flex-col flex-start gap-5 text-white">
          <h1 className="text-6xl font-bold">100+</h1>
          <h3 className="font-semibold text-lg">Active Partners</h3>
        </div>
        <div className="w-full py-20 flex flex-col flex-start gap-5 text-white">
          <h1 className="text-6xl font-bold">100+</h1>
          <h3 className="font-semibold text-lg">Total Users</h3>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
