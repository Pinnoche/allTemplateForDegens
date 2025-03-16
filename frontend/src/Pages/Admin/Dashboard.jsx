// import { useSelector } from "react-redux";
import { useState } from "react";
import './Style.css';

const Dashboard = () => {
  const [activeSlide, setActiveSlide] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("Dashboard");
  const [scaling, setScaling] = useState(false);
  const [formData, setFormData] = useState({
    x_username: "",
    discord: "",
    telegram: "",
    tokenName: "",
    ticker: "",
    contract_address: "",
    token_description: "",
    primaryImage: null,
    secondaryImage1: null,
    secondaryImage2: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleNext = () => setActiveSlide((prev) => prev + 1);
  const handleBack = () => {setActiveSlide((prev) => (prev > 1 ? prev - 1 : 1));};
  const handleSkip = () => {setActiveSlide((prev) => (prev < 3 ? prev + 1 : 3));};
  const handleSubmit = () => console.log("Form Data Submitted:", formData);

  const progressPercentage = activeSlide !== 0 ? ((activeSlide / 3) * 100) : 0;

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
      

      <div className="w-[20%] bg-gray-800 p-6 mt-20 flex flex-col space-y-4 h-screen fixed">
        <h2 className="text-2xl font-bold text-purple-400 text-center mb-2">{sectionTitle}</h2>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale"
          onClick={() => { setActiveSlide(null); setSectionTitle("Dashboard"); }}>
          Dashboard
        </button>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale"
          onClick={() => { setActiveSlide(1); setSectionTitle("Create/Edit Website"); }}>
          Create/Edit Your Website
        </button>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale">Demo Button 1</button>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale">Demo Button 2</button>
      </div>

  
      <div className="flex-1 pt-16 ml-[20%] px-10">
        {activeSlide === null ? (
          
          // Dashboard
          <div>
            <div className="flex flex-col justify-start px-10">
              <p className="text-start mt-4 text-white text-xl">Hello, Kumundo</p>
              <h1 className="text-white font-bold text-2xl">Welcome to the Admin Dashboard</h1>
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
        ) : (

          // Create/Edit Website
          <div className="bg-gradient-to-tr from-black via-gray-800 to-black my-4 p-6 mx-10 space-y-5 rounded-md relative">
    
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {activeSlide > 1 && (
              <button
                className="absolute top-4 right-4 px-4 py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale"
                onClick={handleBack}
              >
                Back
              </button>
            )}


            {activeSlide === 1 && (
              <>
                <h2 className="text-3xl font-bold text-purple-400 text-center mb-2">Social Links</h2>
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="X"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    <i className='bx bxl-twitter'></i>
                     X
                  </label>
                  <input 
                    type="text" 
                    name="x" 
                    placeholder="https://x.com/username" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.x_username} onChange={handleChange} 
                  />
                </div>
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="discord"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    <i className='bx bxl-discord-alt' ></i>
                      Discord
                  </label>
                  <input 
                    type="text" 
                    name="discord" 
                    placeholder="https://discord.gg/username" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.discord} onChange={handleChange} 
                  />
                </div>
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="telegram"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    <i className='bx bxl-telegram' ></i>
                      Telegram
                  </label>
                  <input 
                    type="text" 
                    name="telegram" 
                    placeholder="https://t.me/username" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.telegram} onChange={handleChange} 
                  />
                </div>
                <div className="flex justify-between">
                  <button className="text-gray-400 hover:text-white" onClick={handleSkip}>Skip</button>
                  <button className="bg-purple-800 px-4 py-2 rounded hover:bg-purple-600 scale" onClick={handleNext}>Next</button>
                </div>
              </>
            )}
            {activeSlide === 2 && (
              <>
                <h2 className="text-3xl font-bold text-purple-400 text-center mb-2">Token Details</h2>
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="tokenName"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Token Name
                  </label>
                  <input 
                    type="text" 
                    name="tokenName" 
                    placeholder="Solana" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.tokenName} onChange={handleChange} 
                  />
                </div>
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="tokenAbbreviation"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Token Abbreviation
                  </label>
                  <input 
                    type="text" 
                    name="tokenAbbreviation" 
                    placeholder="SOL" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.ticker} onChange={handleChange} 
                  />
                </div>
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="contractAddress"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Contract Address
                  </label>
                  <input 
                    type="text" 
                    name="contractAddress" 
                    placeholder="0x123......xxx" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.contract_address} onChange={handleChange} 
                  />
                </div>
                
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="tokenDescription"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Token Description
                  </label>
                  <textarea 
                    type="text"
                    name="tokenDescription" 
                    placeholder="Token Description" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.token_description} onChange={handleChange} 
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <button className="text-gray-400 hover:text-white" onClick={handleSkip}>Skip</button>
                  <button className="bg-purple-800 px-4 py-2 rounded hover:bg-purple-600 scale" onClick={handleNext}>Next</button>
                </div>
              </>
            )}
            {activeSlide === 3 && (
              <>
                <h2 className="text-3xl font-bold text-purple-400 text-center mb-2">Upload Images</h2>
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="primaryImage"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Primary Image
                  </label>
                  <input 
                    type="file" 
                    name="primaryImage" 
                    placeholder="Primary Image" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={ (e) => handleImageUpload(e, "primaryImage")} 
                  />
                </div>
             
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="secondaryImage1"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Secondary Image 1
                  </label>
                  <input 
                    type="file" 
                    name="secondaryImage1" 
                    placeholder="Secondary Image 1" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={ (e) => handleImageUpload(e, "secondaryImage1")} 
                  />
                </div>
                <div className="relative py-4 mb-6 text-white">
                  <label htmlFor="secondaryImage2"
                   className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Secondary Image 2
                  </label>
                  <input 
                    type="file" 
                    name="secondaryImage2" 
                    placeholder="Secondary Image 2" 
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={ (e) => handleImageUpload(e, "secondaryImage2")} 
                  />
                </div>
                <button className="bg-purple-800 px-4 py-2 rounded hover:bg-purple-600 items-end scale" onClick={handleSubmit}>Submit</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
