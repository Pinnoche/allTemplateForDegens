import { useState } from "react";

function PublicNav() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <header className="w-full">
      <nav className="w-full bg-gradient-to-b from-black via-gray-900 to-black text-lg font-bold text-white py-6 px-8 flex items-center justify-between shadow-lg">
        <h1 className="text-4xl text-shadow-neon tracking-wide">DEGEN</h1>

        <div className="hidden lg:flex flex-row w-1/2 md:w-1/3 items-center justify-between space-x-6">
          <p className="hover:text-purple-500 cursor-pointer transition-all duration-300">
            Home
          </p>
          <p className="hover:text-purple-500 cursor-pointer transition-all duration-300">
            Contact
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-md hover:from-purple-800 hover:to-pink-700 transition-transform transform duration-200 hover:scale-105">
            Buy Now
          </button>
        </div>

        <button
          className="text-white cursor-pointer text-2xl leading-none py-1 rounded bg-transparent block lg:hidden"
          type="button"
          onClick={() => setOpenNav((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>

      {/* Mobile Nav */}
      {openNav && (
        <div className="w-full text-white bg-gray-900 flex flex-col items-center lg:hidden py-6 px-8 neon-border-top shadow-lg">
          <p className="w-full hover:bg-gray-800 px-4 py-3 rounded cursor-pointer text-center neon-hover">
            Home
          </p>
          <p className="w-full hover:bg-gray-800 px-4 py-3 rounded cursor-pointer text-center neon-hover">
            Contact
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-md hover:from-purple-800 hover:to-pink-700 mt-4 transition-transform transform hover:scale-105">
            Mint Now
          </button>
        </div>
      )}
    </header>
  );
}

export default PublicNav;
