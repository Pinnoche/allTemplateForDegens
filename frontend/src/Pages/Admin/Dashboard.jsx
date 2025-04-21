import { useEffect, useRef, useState } from "react";
import "./Style.css";
import axios from "../../axios";
import { toast } from "sonner";
import { getErrorMessge } from "../../Utils/Helper";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [dataId, setDataId] = useState(null);
  const [activeSlide, setActiveSlide] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("Dashboard");
  const [scaling, setScaling] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedIconName, setSelectedIconName] = useState(null);
  const [selectedBannerName, setSelectedBannerName] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isImageUploading, setIsImageUploading] = useState(false);
  // const [uploadProgress, setUploadProgress] = useState(0);
  // const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [formData, setFormData] = useState({
    x_username: "",
    discord: "",
    telegram: "",
    tokenName: "",
    ticker: "",
    contract_address: "",
    token_description: "",
    icon: "",
    banner: "",
  });

  const fetchData = async () => {
    const data = await axios.get(`/data/${user.id}`);
    if (data) {
      setFormData(data.data);
      setDataId(data.data._id);
      setSelectedIconName(
        data.data.icon.replace(
          "https://degen-app-images.s3.amazonaws.com/degen/",
          ""
        )
      );
      setSelectedBannerName(
        data.data.banner.replace(
          "https://degen-app-images.s3.amazonaws.com/degen/",
          ""
        )
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const iconRef = useRef(null);
  const bannerRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    if (type === "icon") {
      const image = await uploadImage(file, type);
      if (image) {
        setSelectedIcon(url);
        setSelectedIconName(file.name);
      }
    } else if (type === "banner") {
      const image = await uploadImage(file, type);
      if (image) {
        setSelectedBanner(url);
        setSelectedBannerName(file.name);
      }
    }
  };

  const uploadImage = async (file, type) => {
    // setIsImageUploading(true);
    // setUploadProgress(0);
    // setIsImageUploaded(false);
    try {
      const formData = new FormData();
      formData.append("files", file);

      const response = await axios.post("/data/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // onUploadProgress: (ProgressEvent) => {
        //   const { loaded, total } = ProgressEvent;
        //   const percent = Math.floor((loaded * 100) / total);
        //   setUploadProgress(percent);
        // },
      });
      // setIsImageUploading(false);
      // setIsImageUploaded(true);
      const fileUrl = response.data[0];
      setFormData((prev) => ({
        ...prev,
        [type]: fileUrl,
      }));
      return fileUrl;
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const resetFileInput = async (type) => {
    if (type === "icon") {
      await removeImage(selectedIconName);
      setSelectedIcon(null);
      setSelectedIconName(null);
      if (iconRef.current) {
        iconRef.current.value = "";
      }

      setFormData((prev) => ({ ...prev, [type]: "" }));
    } else if (type === "banner") {
      await removeImage(selectedBannerName);
      setSelectedBanner(null);
      setSelectedBannerName(null);
      if (bannerRef.current) {
        bannerRef.current.value = "";
      }
      setFormData((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const removeImage = async (files) => {
    try {
      const response = await axios.delete(`/data/image/delete/${files}`);
      console.log("Deleted Files: ", response.data);
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const handleNext = () => setActiveSlide((prev) => prev + 1);

  const handleBack = () => {
    setActiveSlide((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handleSkip = () => {
    setActiveSlide((prev) => (prev < 3 ? prev + 1 : 3));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (formData.userId) {
        const newData = { ...formData };
        delete newData.userId;
        await axios.patch(`/data/${dataId}`, newData);
      } else {
        await axios.post("/data", formData);
      }
      toast.success("Data Uploaded Successfully");
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      const mssg = getErrorMessge(error);
      toast.error(mssg);
      setIsSubmitting(false);
    }
  };

  const progressPercentage = activeSlide !== 0 ? (activeSlide / 3) * 100 : 0;

  return (
    <div className="h-full flex bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-white">
      <div className="w-[20%] bg-gray-800 p-6 mt-20 flex flex-col space-y-4 h-screen fixed">
        <h2 className="text-2xl font-bold text-purple-400 text-center mb-2">
          {sectionTitle}
        </h2>
        <button
          className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale"
          onClick={() => {
            setActiveSlide(null);
            setSectionTitle("Dashboard");
          }}
        >
          Dashboard
        </button>
        <button
          className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale"
          onClick={() => {
            setActiveSlide(1);
            setSectionTitle("Create/Edit Website");
          }}
        >
          Create/Edit Your Website
        </button>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale">
          Demo Button 1
        </button>
        <button className="w-full py-2 bg-gray-700 rounded-md hover:bg-purple-600 scale">
          Demo Button 2
        </button>
      </div>

      <div className="flex-1 pt-16 ml-[20%] px-10">
        {activeSlide === null ? (
          <div>
            <div className="flex flex-col justify-start px-10">
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
                  convallis libero et felis elementum, et fermentum odio
                  euismod. Nullam auctor, odio ac scelerisque.
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
                <h2 className="text-3xl font-bold text-purple-400 text-center mb-2">
                  Social Links
                </h2>
                <div className="relative py-4 mb-6 text-white">
                  <label
                    htmlFor="X"
                    className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    <i className="bx bxl-twitter"></i>X
                  </label>
                  <input
                    type="text"
                    name="x_username"
                    placeholder="johndoe"
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.x_username}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative py-4 mb-6 text-white">
                  <label
                    htmlFor="discord"
                    className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    <i className="bx bxl-discord-alt"></i>
                    Discord
                  </label>
                  <input
                    type="text"
                    name="discord"
                    placeholder="johndoe or johndoe#1234"
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.discord}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative py-4 mb-6 text-white">
                  <label
                    htmlFor="telegram"
                    className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    <i className="bx bxl-telegram"></i>
                    Telegram
                  </label>
                  <input
                    type="text"
                    name="telegram"
                    placeholder="johndoe"
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.telegram}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={handleSkip}
                  >
                    Skip
                  </button>
                  <button
                    className="bg-purple-800 px-4 py-2 rounded hover:bg-purple-600 scale"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {activeSlide === 2 && (
              <>
                <h2 className="text-3xl font-bold text-purple-400 text-center mb-2">
                  Token Details
                </h2>
                <div className="relative py-4 mb-6 text-white">
                  <label
                    htmlFor="tokenName"
                    className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Token Name
                  </label>
                  <input
                    type="text"
                    name="tokenName"
                    placeholder="Solana"
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.tokenName}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative py-4 mb-6 text-white">
                  <label
                    htmlFor="ticker"
                    className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Token Abbreviation
                  </label>
                  <input
                    type="text"
                    name="ticker"
                    placeholder="SOL"
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.ticker}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative py-4 mb-6 text-white">
                  <label
                    htmlFor="contract_address"
                    className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Contract Address
                  </label>
                  <input
                    type="text"
                    name="contract_address"
                    placeholder="0x123......xxx"
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.contract_address}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative py-4 mb-6 text-white">
                  <label
                    htmlFor="token_description"
                    className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Token Description
                  </label>
                  <textarea
                    type="text"
                    name="token_description"
                    placeholder="Token Description"
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.token_description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={handleSkip}
                  >
                    Skip
                  </button>
                  <button
                    className="bg-purple-800 px-4 py-2 rounded hover:bg-purple-600 scale"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {activeSlide === 3 && (
              <>
                <h2 className="text-3xl font-bold text-purple-400 text-center mb-2">
                  Upload Images
                </h2>

                <div className="relative py-4 mb-6 text-white border border-gray-600 rounded-lg px-4">
                  <label
                    htmlFor="icon-upload"
                    className="absolute -top-3 left-4 px-2 bg-gray-800 text-sm"
                  >
                    Icon
                  </label>
                  <div>
                    {formData?.icon || selectedIcon ? (
                      <div className="flex items-center justify-between">
                        <img
                          src={formData?.icon ?? selectedIcon}
                          alt="icon"
                          className="h-12 w-12 object-cover rounded-full border border-gray-600 p-2 "
                        />
                        <span>{selectedIconName}</span>
                        <button
                          type="button"
                          onClick={() => {
                            resetFileInput("icon");
                          }}
                          className="text-red-400 hover:text-red-300 text-sm cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          id="icon-upload"
                          type="file"
                          name="icon"
                          accept="image/*"
                          ref={iconRef}
                          className="w-full mt-2 bg-transparent file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0 file:text-white
                                    file:bg-purple-600 hover:file:bg-purple-700
                                    file:cursor-pointer focus:outline-none cursor-pointer"
                          onChange={(e) => handleImageUpload(e, "icon")}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="relative py-4 mb-6 text-white border border-gray-600 rounded-lg px-4">
                  <label
                    htmlFor="banner-upload"
                    className="absolute -top-3 left-4 px-2 text-sm bg-gray-800"
                  >
                    Banner
                  </label>
                  {formData.banner || selectedBanner ? (
                    <div className="flex items-center justify-between">
                      <img
                        src={formData.banner ?? selectedBanner}
                        alt="icon"
                        className="h-12 w-12 object-cover rounded-md border border-gray-600 p-2 "
                      />
                      <span>{selectedBannerName}</span>
                      <button
                        type="button"
                        onClick={() => {
                          resetFileInput("banner");
                        }}
                        className="text-red-400 hover:text-red-300 text-sm cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        id="banner-upload"
                        type="file"
                        name="icon"
                        accept="image/*"
                        ref={bannerRef}
                        className="w-full mt-2 bg-transparent file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0 file:text-white
                                    file:bg-purple-600 hover:file:bg-purple-700
                                    file:cursor-pointer focus:outline-none cursor-pointer"
                        onChange={(e) => handleImageUpload(e, "banner")}
                      />
                    </div>
                  )}
                </div>
                {/* <div className="relative py-4 mb-6 text-white">
                  <label
                    htmlFor="secondaryImage2"
                    className="absolute top-0 left-4 px-1 bg-gray-800"
                  >
                    Secondary Image 2
                  </label>
                  <input
                    type="file"
                    name="secondaryImage2"
                    placeholder="Secondary Image 2"
                    className="input focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => handleImageUpload(e, "secondaryImage2")}
                  />
                </div> */}
                <button
                  className={`bg-purple-800 px-4 py-2 rounded hover:bg-purple-600 items-end scale ${
                    isSubmitting && "bg-purple-300"
                  }`}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
