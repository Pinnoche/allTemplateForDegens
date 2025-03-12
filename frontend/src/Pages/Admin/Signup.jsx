import React from 'react'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Signup = () => {

    const [visibility, setVisibility] = useState(false);
    // const [email, setEmail] = useState("");

    function togglePasswordVisibility() {
        setVisibility(!visibility);
      }

  return (
    <div className="h-screen bg-gradient-to-tr from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="form bg-gray-800 text-white">
            {/* {res.data && (
                <span className="text-green-500 text-center block mt-4">
                Login Successful
                </span>
            )} */}
            <div className="mb-4 border-b pb-4 border-purple-200 text-center">
                <h1 className="text-2xl font-semibold font-serif">
                Sign Up a new account
                </h1>
            </div>
            <form className="mt-6" 
            // onSubmit={(e) => e.preventDefault()}
            > 
                <div className="relative py-4 mb-6 text-white">
                    <label
                        htmlFor="email"
                        className="absolute top-0 left-4 px-1 bg-gray-800"
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full text-white px-3 py-2 border rounded-md bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        // onChange={(e) => setEmail(e.target.value)}
                        // value={email}
                    />
                    {/* {error && (
                        <span className="text-red-500 text-center block mt-4">
                        {error[0]}
                        </span>
                    )} */}
                </div>
                <div className="relative py-4 mb-6 text-white">
                    <label
                        htmlFor="DegenName"
                        className="absolute top-0 left-4 px-1 bg-gray-800"
                    >
                        Degen Name
                    </label>

                    <input
                        type="text"
                        id="DegenName"
                        placeholder="Enter your Degen Name"
                        className="w-full text-white px-3 py-2 border rounded-md bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        // onChange={(e) => setEmail(e.target.value)}
                        // value={email}
                    />
                    {/* {error && (
                        <span className="text-red-500 text-center block mt-4">
                        {error[0]}
                        </span>
                    )} */}
                </div>
                <div className="relative py-4">
                    <label
                        htmlFor="password"
                        className="absolute top-0 left-4 px-1 bg-gray-800 z-20"
                    >
                        Password
                    </label>
                    <div className="relative w-full">
                        <input
                        type={`${visibility ? "text" : "password"}`}
                        // id="password"
                        placeholder="Enter new password"
                        className="w-full text-white px-3 py-2 border rounded-md bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        // onChange={(e) => setPassword(e.target.value)}
                        // value={password}
                        />

                        <button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 cursor-pointer"
                        onClick={() => togglePasswordVisibility()}
                        >
                        {visibility ? <FiEyeOff /> : <FiEye />}
                        </button>
                        
                        {/* {error && (
                        <span className="text-red-500 text-center block mt-4">
                            {error[2]}
                        </span>
                        )} */}
                    </div>
                    <div className="relative w-full mt-2">
                        <input
                        type={`${visibility ? "text" : "password"}`}
                        // id="password"
                        placeholder="Confirm password"
                        className="w-full text-white px-3 py-2 border rounded-md bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        // onChange={(e) => setPassword(e.target.value)}
                        // value={password}
                        />

                        <button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 cursor-pointer"
                        onClick={() => togglePasswordVisibility()}
                        >
                        {visibility ? <FiEyeOff /> : <FiEye />}
                        </button>
                        
                        {/* {error && (
                        <span className="text-red-500 text-center block mt-4">
                            {error[2]}
                        </span>
                        )} */}
                    </div>
                </div>
                {/* <div className="text-right mb-4">
                <a href="#" className="text-purple-500 hover:underline text-sm">
                    Forgot password?
                </a>
                </div> */}
                {/* <div className="mb-6">
                <input
                    type="checkbox"
                    id="mycheckbox"
                    name="checkbox"
                    className="mr-2"
                />
                <label htmlFor="mycheckbox" className="text-white">
                    Remember Me
                </label>
                </div> */}
                <div className="w-full flex justify-center">
                    <button
                        type="submit"
                        className="submitBtn w-full"
                        // onClick={() => {
                        // handleSubmit();
                        // }}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            <p className="text-gray-400 text-center mt-6">
                Already a user?{" "}
                <a href="#" className="text-purple-500 hover:underline">
                    Login
                </a>
            </p>
        </div>
    </div>
  )
}

export default Signup
