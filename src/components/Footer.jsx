const Footer = () => {
  return (
    <footer className="fixed bottom-0 py-8 px-2 bg-black w-full h-32 text-white">
      <div className="flex items-center justify-between border-t-2 border-gray-300">
        <p className="px-2 pt-8">© 2025 DEGEN • All Rights Reserved</p>

        {/* Your Socials */}
        <div className="flex items-center justify-between px-2 pt-8 space-x-4">
          {/* Twitter  */}
          <p className="text-lg font-bold uppercase hover:scale-125 transform transition duration-700 ease-in-out">
            <a href="#" target="_blank">
              <img
                src="./assets/twitter.png"
                alt="X"
                width={50}
                className="inline-block bg-center rounded-full"
              />
            </a>
          </p>
          {/* Telegram  */}
          <p className="text-lg font-bold uppercase hover:scale-125 transform transition duration-700 ease-in-out">
            <a href="#" target="_blank">
              <img
                src="./assets/telegram.png"
                alt="X"
                width={50}
                className="inline-block bg-center rounded-full"
              />
            </a>
          </p>
        </div>
        {/* Your Socials */}

        <p className="text-lg font-bold uppercase px-2 pt-8">
          <a
            href="https://x.com/dee74wise"
            target="_blank"
            className="hover:text-blue-500"
          >
            <span>Designed by</span>{" "}
            <img
              src="./assets/pinnoche.jpg"
              alt="pinnoche"
              width={20}
              height={50}
              className="inline-block bg-center rounded-full"
            />{" "}
            <span>Pinnoche</span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
