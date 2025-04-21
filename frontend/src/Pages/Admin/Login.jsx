import axios from "../../axios";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessge } from "../../Utils/Helper";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/reducers/authSlice";
function Login() {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function togglePasswordVisibility() {
    setVisibility(!visibility);
  }
  async function handleSubmit() {
    try {
      setIsLoading(true);
      if (!email || !password) {
        toast.error("Please fill in all fields");
        setIsLoading(false);
        return;
      }
      const res = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log("Token?: ", res.data);
      dispatch(getUser());
      toast.success(res.data.message);
      setEmail("");
      setPassword("");
      setVisibility(false);
      setIsLoading(false);
      navigate("/admin");
    } catch (err) {
      const errorMsg = getErrorMessge(err);
      toast.error(errorMsg);
      setIsLoading(false);
    }
  }
  return (
    <div className="h-screen bg-gradient-to-tr from-black via-gray-900 to-gray-800 flex items-center justify-center">
      <div className="form bg-gray-800 text-white">
        <div className="mb-4 border-b pb-4 border-purple-200 text-center">
          <h1 className="text-2xl font-semibold font-serif">
            Log In to your account
          </h1>
        </div>
        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
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
                id="password"
                placeholder="Enter your password"
                className="w-full text-white px-3 py-2 border rounded-md bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 cursor-pointer"
                onClick={() => togglePasswordVisibility()}
              >
                {visibility ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-purple-500 hover:underline text-sm">
              Forgot password?
            </a>
          </div>
          <div className="mb-6">
            <input
              type="checkbox"
              id="mycheckbox"
              name="checkbox"
              className="mr-2"
            />
            <label htmlFor="mycheckbox" className="text-white">
              Remember Me
            </label>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="submitBtn w-full"
              disabled={isLoading}
              onClick={() => {
                handleSubmit();
              }}
            >
              {isLoading ? "Loading...." : "Login"}
            </button>
          </div>
        </form>
        <p className="text-gray-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-purple-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
