module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        neon: "0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff00ff",
      },
      boxShadow: {
        neon: "0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff",
      },
      keyframes: {
        glitch: {
          "0%": { textShadow: "2px 2px #ff00ff, -2px -2px #00ffff" },
          "50%": { textShadow: "-2px 2px #ff00ff, 2px -2px #00ffff" },
          "100%": { textShadow: "2px -2px #ff00ff, -2px 2px #00ffff" },
        },
      },
      animation: {
        glitch: "glitch 4.5s 10",
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow"), 
  ],
};
