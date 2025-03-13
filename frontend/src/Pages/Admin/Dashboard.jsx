// import { useSelector } from "react-redux";
import React, { useState } from "react";
import './Style.css';

const Dashboard = () => {
  const [scaling, setScaling] = useState(false);

  // Fetch user and loading state from Redux store
  // const { user, loading } = useSelector((state) => state.auth);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p className="text-white">Loading...</p>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p className="text-white">No user data available. Please log in.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="h-full flex bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <div className="w-[20%] bg-gray-800 p-6 mt-20 flex flex-col space-y-4 h-screen fixed">
        <h2 className="text-2xl font-bold text-purple-400 text-center mb-2">Dashboard</h2>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale">
          Dashboard
        </button>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale">
          Create/Edit Your Website
        </button>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale">
          Demo Button 1
        </button>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale">
          Demo Button 2
        </button>
      </div>

      

      {/* Main Content */}
      <div className="flex-1 pt-16 ml-[20%]">
        <div className="flex flex-col justify-start px-10">
          <p className="text-start mt-4 text-white text-xl">
            Hello, Kumundo
            {/* {user.name || user.email}! */}
          </p>
          <h1 className="text-white font-bold text-2xl">
            Welcome to the Admin Dashboard
          </h1>
        </div>

        <div className="w-full relative pt-4 px-10">
          <div
            onMouseEnter={() => setScaling(true)}
            onMouseLeave={() => setScaling(false)}
            className={`w-full mb-4 bg-gradient-to-tr from-black via-gray-800 to-black rounded-md flex flex-col items-center p-4 space-y-8 transition duration-700 ease-in-out transform ${
              scaling ? "scale-105" : ""
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
              <button className="px-6 py-3 bg-purple-800 rounded-md hover:bg-purple-600 scale">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

