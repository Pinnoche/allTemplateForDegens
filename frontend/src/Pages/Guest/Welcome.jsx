import { useState } from "react";
function Welcome() {
  const [scaling, setScaling] = useState(false);
  const projects = [
    {
      name: "Project 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et felis elementum, et fermentum odio euismod. Nullam auctor, odio ac scelerisque.",
    },
    {
      name: "Project 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et felis elementum, et fermentum odio euismod. Nullam auctor, odio ac scelerisque.",
    },
    {
      name: "Project 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et felis elementum, et fermentum odio euismod. Nullam auctor, odio ac scelerisque.",
    },
    {
      name: "Project 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et felis elementum, et fermentum odio euismod. Nullam auctor, odio ac scelerisque.",
    },
    {
      name: "Project 5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et felis elementum, et fermentum odio euismod. Nullam auctor, odio ac scelerisque.",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
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

      {/* Projects Section */}
      <div className="w-full flex flex-col gap-8 p-1 border-t border-[rgba(255,255,255,0.1)]">
        <h2 className="font-semibold text-gray-400 text-2xl">Projects</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-full bg-gradient-to-tr from-black via-gray-800 to-black rounded-md flex flex-col items-center p-4 space-y-8"
            >
              <h1 className="p-4 font-bold break-words w-[60%] text-2xl text-center text-white">
                {project.name}
              </h1>
              <p className="w-[50%] break-words text-gray-400 text-center">
                {project.description}
              </p>
              <div className="flex justify-center">
                <button className="px-6 py-3 bg-purple-800 rounded-md hover:bg-purple-600 transform hover:scale-110 transition duration-500 ease-in-out">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Users */}
      <div className="w-full mb-8 bg-transparent px-5 gap-5 flex items-center border-t border-b border-[rgba(255,255,255,0.1)]">
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
