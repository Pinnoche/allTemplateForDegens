import { useState } from "react";
function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  return (
    <nav className="w-full">
      <div className="w-full bg-transparent text-base sm:text-lg sm:font-bold text-white py-6 px-8 flex items-center justify-between">
        <h1>LOGO</h1>

        <div className="hidden lg:flex flex-row w-1/2 md:w-1/3 items-center justify-between">
          <p className="hoverEffect">Home</p>
          <p className="hoverEffect">Contact</p>
          <button className="bg-blue-500 px-3 py-1 md:px-8 md:py-2 rounded-md hover:text-black hover:bg-white">
            Buy Now
          </button>
        </div>

        <button
          className="text-white cursor-pointer text-xl leading-none py-1 rounded bg-transparent block lg:hidden"
          type="button"
          onClick={() => setOpenNav((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
      </div>
    {/* Mobile Nav */}
      {openNav && <div className="w-full text-white bg-gray-800 flex flex-col items-center lg:hidden py-4 px-8">
        <p className="w-full hover:bg-gray-700 px-4 py-2 rounded cursor-pointer text-center">
          Home
        </p>
        <p className="w-full hover:bg-gray-700 px-4 py-2 rounded cursor-pointer text-center">
          Contact
        </p>
        <button className="bg-blue-500 px-4 py-2 rounded-md hover:text-black hover:bg-white my-1">
          Buy Now
        </button>
      </div>}
    </nav>
  );
}

export default Navbar;
