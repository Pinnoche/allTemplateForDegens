import axios from "../../axios";
import { useState } from "react";
function Login() {
  const [visibility, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function togglePasswordVisibility() {
    setVisibility(!visibility);
  }
  async function handleSubmit() {
    try {
      await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className="form bg-white" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-4 border-b pb-4 border-gray-300 text-center">
        <h1 className="text-4xl font-semibold font-serif">Login</h1>
      </div>
      <div className="mt-6 space-y-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm text-gray-700 font-bold mb-2"
          >
            Email:
          </label>

          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password:
          </label>
          <div className="relative w-full">
            <input
              type={`${visibility ? "text" : "password"}`}
              id="password"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!visibility && (
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 cursor-pointer"
                onClick={() => togglePasswordVisibility()}
              >
                <img src="../assets/visibility_off.svg" alt="visiblity_off" />
              </button>
            )}
            {visibility && (
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 cursor-pointer"
                onClick={() => togglePasswordVisibility()}
              >
                <img src="../assets/visibility_onn.svg" alt="visiblity_on" />
              </button>
            )}
          </div>
        </div>
        <div className="mb-6">
          <input
            type="checkbox"
            id="mycheckbox"
            name="checkbox"
            className="mr-2"
          />
          <label htmlFor="mycheckbox" className="text-gray-600">
            Remember Me
          </label>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="submitBtn mx-auto"
            onClick={() => {
              handleSubmit();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
